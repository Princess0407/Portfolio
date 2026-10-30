# how I built a GPU from resistors...

This started as a question I could not stop wondering about. Most of the modern IoT devices collect data and report it....they don't compute and they definitely don't render graphics. And if you want a display output on an embedded system, you are basically forced to buy a dedicated display controller IC, an HDMI driver and what nots that shows you exactly nothing interesting at exactly nothing interesting resolution.

I was like lemme take a microcontroller, threw in some resistors, and build something that can be called a GPU?? No it is not just some display module or a framebuffer wrapper.A real programmable graphics processor with a defined instruction set, a rasterizer, and a network addressable command bus.

(drumroll)!!

Sooo, I made GXU stands for Graphical Execution Unit which drives a standard VGA monitor at 320x240 at 60Hz, executes a custom 8-opcode binary ISA sent over WiFi, and ykw it costs under 700 rupees in components(after borrowing that VGA monitor from college lab...man had to convince them a lot!!).

Before anything else let's look at the architecture comparison that drove the whole project

## GXU 1 vs RTX 4090

## The problematic hardware

VGA is an ages old analog standard from 1987.So, basically your monitor expects three analog voltage signals (red, green, blue) between 0V and 0.7V, plus two digital sync pulses that tells it when each line ends and when each frame ends.And, the problem is that a mircrocontroller only outputs digital signals either at 0V or 3.3V :|

So, the standard solution to that would be to use a DAC however, we are using a resistor ladder...

Well, first of all, because I wasn't really willing to spend more money on a dedicated DAC when I already had a pile of resistors lying around. Secondly, this project was kinda built around the idea of seeing how far could a microcontroller pushed with the most questionable hardware choices possible. And, in case you dont have resistors lying around, it'll cost you around 35 rupees that is roughly 0.3 dollars.

For GXU-1, each color channel gets 2 bits. Which means red gets 4 possible intensity levels, green gets 4, and blue gets 4. Combine all the three together and we end up with 64 possible colors on screen. Not exactly ray tracing territory from your traditional GPUs, but definitely enough to draw shapes, text, and make the monitor look like something.......is happening.

When the ESP32 outputs a binary value, the resistor ladder turns that pattern of 1s and 0s into a proportional analog voltage....Sooo, instead of the monitor only seeing "fully on" or "fully off", it sees different voltage levels corresponding to different color intensities.

For example...a value of 00 produces essentially 0V, 01 gives a low voltage level, 10 gives a higher one, and 11 pushes it close to the maximum VGA color voltage. The monitor just doesn't care that a bunch of resistors are doing all the heavy work behind the scenes. It just sees valid analog color signals and happily displays them!!

## R2R DAC output voltages per 2-bit value

The ESP32-S3 was chosen 'cause it has a hardware LCD parallel interface which lets the DMA controller drive all 8 GPIO pins simultaneously in sync with VGA timing at 25.175 MHz, without any CPU involvement anytime.This became the only reason 60Hz is was achievable.

## The instruction set

You also might have been thinking what makes this an actual GPU and not your fancy display driver. The answer is pretty much simple. A display controller would want you to do all the hard work and hand them final pixels.

GXU 1 doesn't.......you command it what you want drawn, and it figures out which pixels need to change....this particualr conversion from shapes and commands into actual pixels is called rasterization, and for that to happen we need to talk to the hardware that is where....ISA enters the scene.

GXU 1 totally has 8 opcodes. Every packet starts with a 1 byte opcode, followed by arguments encoded as 16 bit "big endian unsigned" integers...which just means bigger numbers use two bytes and the larger half gets sent first. Also, since I'm not planning on drawing rectangles at negative coordinates, all the bits can be used for positive values. Color gets a single byte with 2 bits each for red, green and blue.

| opcode | mnemonic | arguments | what it does |
| --- | --- | --- | --- |
| 0x01 | GXU_CLEAR | color (1B) | fill entire 320x240 VRAM |
| 0x02 | GXU_PIXEL | x, y (2B each), color | set one pixel |
| 0x03 | GXU_LINE | x0, y0, x1, y1 (2B each), color | Bresenham line |
| 0x04 | GXU_RECT_FILL | x, y, w, h (2B each), color | filled rectangle |
| 0x05 | GXU_RECT_OUTLINE | x, y, w, h (2B each), color | hollow rectangle |
| 0x06 | GXU_BLIT | sx, sy, dx, dy, w, h (2B each) | copy VRAM region |
| 0x07 | GXU_TEXT | x, y, color, N, chars | render ASCII string |
| 0xFF | GXU_SWAP | none | flip double buffer |

The choice of binary encoding over something like JSON isn't just for aesthetics...it was the performance I wanted. Here is the actual comparison for a single line command in case, you are wondering:

## packet size: binary ISA vs JSON encoding (same command)

A JSON encoded line command costs about 58 bytes and takes several hundred microseconds to parse.....and, thiss becomes crucial when you wanna process hundreds or even thousands of drawing commands every sec.

If you come to think about it....every rectangle, every line, every piece of text eventually becomes a command that GXU 1 has to understand before it can draw anything..which is a huge deal when GXU has to read an array of curly braces, quoatation marks and so on EVERY SINGLE TIME. The ESP32 would have had to spend more time in understanding what I meant rather than drawing it on screen.

And honestly, this is one of those moments where human readability has to take a step down...sure, JSON is easier for us to look at, but GXU 1 isn't really built for us. It's built for moving commands from point A to point B as quickly as possible. At the framerate I was targeting, those extra bytes and microseconds add up surprisingly fast than someone would expect it to.

The difference between the two is not just some benchmark number I can throw into a graph and boast off it. It's quite literally the difference between spending your time drawing pixels and spending your time reading text about drawing pixels.

## The dual core architecture

To prevent microcontroller from smoking.....GXU 1 splits responsibilities hard across the two cores of the ESP32 S3. Core 0 and Core 1 where they never touch each other's domain. The only thing connecting them is a FreeRTOS queue that acts as the internal command bus. Check out the arch below:

The architecture flows from a browser, Python script, or any WiFi device over WebSocket to Core 0 (Command Processor), which handles the WiFi stack, WebSocket server, ISA packet decoder (`isa_decode`), FreeRTOS queue writer, and telemetry JSON sender (200ms interval). Commands pass through `xQueueSend(gxu_queue, &cmd)` to Core 1 (GX Core / Rasterizer), which handles the FreeRTOS queue reader, Bresenham line, rectangle fill and blit algorithms, VRAM writes (76800 byte framebuffer), and tile heatmap counters (16x12 grid). DMA then streams data to the 8 GPIO pins on the LCD parallel bus, through the R-2R resistor DAC (270 ohm + 560 ohm resistor ladder, 0V to 0.7V analog per channel), and finally to the VGA monitor at 320x240 at 60Hz with analog RGB, H-Sync and V-Sync.

The DMA hardware streams VRAM to GPIO pins continuously, completely independent of both cores. This means a burst of incoming WiFi packets on Core 0 never causes display flicker, and a heavy rendering operation on Core 1 never delays network responses. The queue absorbs any burst with 64-command depth.

## End-to-end latency

From clicking a button in the browser dashboard to a pixel appearing on the VGA monitor,here is how time passes through each stage.

| Stage | Time |
| --- | --- |
| browser click to WiFi | 5ms |
| Core 0 decode + queue | less than 1ms |
| Core 1 rasterize line | 3ms |
| DMA to display | next frame, max 16ms |

## end-to-end latency breakdown (ms)

Total perceived latency is somewhere between 10ms and 25ms....the point being the human eye usually can't percieve delays below about 100ms for display feedback, so this is comfortably imperceptible.

## The VRAM heatmap

Every time Core 1 writes a pixel, it increments a counter for the tile that pixel falls in. The 320x240 screen is divided into 192 tiles (16 columns by 12 rows, each tile is 20x20 pixels). Core 0 reads these counters every 200ms and includes them in the telemetry JSON it sends back to the browser.

The dashboard renders them as a color grid...cold tiles are dark blue, warm tiles shift through green, hot tiles go amber and red. AMD's Radeon GPU Profiler shows the exact same visualization for production GPU workloads. GXU 1 runs the same concept on an inexpensive chip!!

## pixel throughput at different operations (pixels per second)

## BOM

Everything here is available in India. Robu.in and Probots stock the ESP32-S3. Resistors come from any local electronics market.

| component | specification | cost (INR) |
| --- | --- | --- |
| ESP32-S3-DevKitC-1-N8 | 8MB Flash, 512KB SRAM, built-in WiFi, LCD peripheral | 450-500 |
| Resistors 270 ohm x18 | 1/4W carbon film | 20 |
| Resistors 560 ohm x9 | 1/4W carbon film | 10 |
| Resistors 100 ohm x2 | sync signal protection | 5 |
| VGA DB-15 connector | DE-15 breakout or cut VGA cable | 30-50 |
| Breadboard + jumper wires | 400-tie half breadboard | 100 |
| total | | 615-685 |

## BOM cost breakdown by component

## here's what I actually learned and also mistakes I made...

The resistor ladder is the part that surprised me most...I did knew the theory I learnt in my classes but building it and then measuring the voltage with a multimeter and seeing exactly 0.35V where the math said 0.35V was a satisfying moment.

The DMA timing took the longesttttt to get it right.....the VGA standard has very specific timing requirements around the horizontal and vertical porch periods, the sync pulse widths, the pixel clock...getting the LCD peripheral configured with the correct values took a lot of trial and error. If the display shows white noise, the porch values are wrong. If colors are shifted, the GPIO assignment is wrong. If the image tears, the sync is off.....each symptom pointed at exactly one thing.

The FreeRTOS queue architecture taught me more about real time systems than I understood from any lecture or video ever...the decision to put wifi and rendering on separate cores with a defined communication channel is the same decision that CPU GPU interface designers make, just at a larger scale.

Designing the ISA was the most interesting part but also, made me cry sometimes......many decisons were taken which compounds; binary vs text, big vs little endian, 2-bit vs 4-bit color channels, packet size vs expressiveness...its just real GPU ISA designers play the same game at higher stakes.

As for mistakes uhmm...there were plenty...uhh the biggest one was underestimating how much planning graphics systems actually need. I kinda like went in with "I'll get VGA running first and figure everything else out later" which turned out to be a bad one(awkward laugh) its just that every bad decision affects your next ten decisons sooo, you gotta be careful.A lot of redesigns could have been easily avoided if I had spent more time with a notebook or brainstorming really before touching any code.

Another mistake was assuming debugging would be straightforward. Software usually gives you logs, stack traces and error messages. VGA gives you a screen full of nonsense and expects you to become a detective. More than once I spent hours staring at rendering code only to discover that the real problem was a timing configuration or a GPIO assignment somewhere else.

And perhaps the most important lesson was that building something from scratch forces you to understand where every abstraction comes from. Before GXU-1, a framebuffer was just a term I had read in documentation. DMA was just another peripheral in the ESP32 datasheet. Rasterization was just something GPUs magically did. After building this, every one of those concepts feels a lot more real.

## Try the software emulator

If you do not have the hardware, the complete GXU-1 ISA is implemented in a browser-based emulator using the Canvas API. It includes the VRAM heatmap, live telemetry, and a raw hex input where you can type ISA packets directly. To draw a red diagonal line from corner to corner, type:

```text
03 00 00 00 F0 01 3F 00 EF 0C
```

That is opcode 0x03 (GXU_LINE), x0=0, y0=240, x1=319, y1=239, color=0x0C (red). Hit execute and watch how it rasterizes.

[emulate it](https://princess0407.github.io/GXU-1/)

p.s...now if you are wondering what was that behind that scenes tab in the emulator..

packet anatomy - every time you run a command, the raw bytes appear color coded by field...opcode in amber, x coordinates in blue, y in green, color byte in red. Below that, the color byte gets fully broken down into bits 7-6 = blue channel, 5-4 = green, 3-2 = red, with the actual voltage each 2 bits of value produces on the R2R DAC (0V to 0.7V) and, a swatch showing you the actual color.

algorithm trace - runs automatically when you use GXU_LINE...it captures every single Bresenham step, shows the pseudocode with the currently executing line highlighted in amber, a live variable table (x, y, dx, dy, err, e2, sx, sy) that flashes when a value changes, and a zoomed mini canvas showing the 20x15 pixel region around where the current pixel is being placed...you get full playback controls: step forward, back, jump to start or end, or just hit play and watch it animate at 60ms per step.

pipeline - animates Core 0, Core 1, the FreeRTOS queue, and DMA in sequence every time a command runs, with a description of what each stage is actually doing at that particularmoment

the algorithm trace tab opens automatically when you run a LINE command...

p.s p.s I forgot to add the a list of hex packets on the emulator..so, I've added that in here

## Hex packet reference

If you're using the emulator's raw hex input, here's something that might have confused ya. The color picker on the left does absolutely nothing when you're typing packets manually.

In hex mode, the color is already encoded directly inside the packet. The last byte determines what color gets drawn.

For example:

```text
03 00 00 00 00 01 3F 00 EF 0C
```

The final byte is `0C`, which represents red. Change that byte and you'll get a different color without touching anything else in the packet.

GXU 1 uses 2 bits per color channel. The color byte is encoded as:

```text
[B1 B0 G1 G0 R1 R0 xx xx]
```

That gives four intensity levels for red, green and blue, producing a total of 64 possible colors.

| hex | binary | red | green | blue | result |
| --- | --- | --- | --- | --- | --- |
| 00 | 00000000 | 0 | 0 | 0 | black |
| 0C | 00001100 | 3 | 0 | 0 | red |
| 30 | 00110000 | 0 | 3 | 0 | green |
| C0 | 11000000 | 0 | 0 | 3 | blue |
| 3C | 00111100 | 3 | 3 | 0 | yellow |
| F0 | 11110000 | 0 | 3 | 3 | cyan |
| CC | 11001100 | 3 | 0 | 3 | magenta |
| FC | 11111100 | 3 | 3 | 3 | white |
| 08 | 00001000 | 2 | 0 | 0 | dark red |
| A8 | 10101000 | 2 | 2 | 2 | gray |

Every packet below can be pasted directly into the emulator's raw hex input box.

### GXU_CLEAR (0x01)

Clears the entire framebuffer to a single color.

```text
01 FC    clear screen to white
01 C0    clear screen to blue
01 00    clear screen to black
```

### GXU_PIXEL (0x02)

Draws a single pixel.

```text
02 [x hi] [x lo] [y hi] [y lo] [color]

02 00 64 00 78 30     pixel at (100,120) green
02 01 3F 00 EF FC     pixel at (319,239) white
02 00 00 00 00 0C     pixel at (0,0) red
```

### GXU_LINE (0x03)

Draws a Bresenham line between two points.

```text
03 [x0 hi] [x0 lo] [y0 hi] [y0 lo]
   [x1 hi] [x1 lo] [y1 hi] [y1 lo]
   [color]

03 00 00 00 00 01 3F 00 EF 0C
red diagonal from (0,0) to (319,239)

03 00 00 00 00 00 00 00 EF 30
green top edge

03 00 00 00 EF 01 3F 00 EF FC
white bottom edge

03 00 00 00 00 00 00 00 EF C0
blue left edge

03 01 3F 00 00 01 3F 00 EF F0
cyan right edge
```

### GXU_RECT_FILL (0x04)

Draws a filled rectangle.

```text
04 [x hi] [x lo] [y hi] [y lo]
   [w hi] [w lo] [h hi] [h lo]
   [color]

04 00 0A 00 0A 00 64 00 50 30
green rectangle at (10,10) size 100x80

04 00 00 00 00 01 40 00 F0 FC
full-screen white rectangle

04 00 28 00 28 00 96 00 78 CC
magenta rectangle at (40,40) size 150x120
```

### GXU_RECT_OUTLINE (0x05)

Same packet format as GXU_RECT_FILL, but only the border is drawn.

```text
05 00 05 00 05 01 36 00 E6 FC
white border 5 pixels from the edge

05 00 0A 00 0A 01 2C 00 DC F0
cyan outline at (10,10) size 300x220

05 00 32 00 1E 00 C8 00 96 3C
yellow outline at (50,30) size 200x150
```

### GXU_BLIT (0x06)

Copies an existing region of VRAM.

```text
06 [sx hi] [sx lo] [sy hi] [sy lo]
   [dx hi] [dx lo] [dy hi] [dy lo]
   [w hi] [w lo] [h hi] [h lo]

06 00 00 00 00 00 A0 00 78 00 50 00 3C

copies the top-left 80x60 region
to position (160,120)
```

Unlike the other commands, BLIT has no color byte because it simply copies pixels that already exist in VRAM.

### GXU_TEXT (0x07)

Renders ASCII text using the built in bitmap font.

```text
07 [x hi] [x lo] [y hi] [y lo]
   [color] [N] [characters...]

07 00 0A 00 0A 30 05 47 58 55 2D 31
renders "GXU-1" at (10,10)

07 00 0A 00 50 FC 07 47 52 41 50 48 49 43
renders "GRAPHIC" at (10,80)
```

Characters are standard ASCII bytes. For example: `G = 0x47`, `X = 0x58`, `U = 0x55`.

### GXU_SWAP (0xFF)

Swaps the front and back framebuffer, making the newly rendered frame visible.

```text
FF
```

If you're drawing an entire scene, the usual sequence is:

```text
GXU_CLEAR
GXU_LINE / GXU_RECT / GXU_TEXT
GXU_SWAP
```

That's effectively the GXU 1 rendering pipeline in its very simplest form:)

## Source and docs

Full firmware, dashboard source, wiring guide, ISA reference, and build instructions are on GitHub README.

[view on GitHub](https://github.com/Princess0407/GXU-1)
