---
layout: ../../layouts/BlogPost.astro
title: "I built a GPU from scratch on a microcontroller"
date: "2025"
topic: "Embedded Systems / Hardware"
description: "GXU-1 is a custom programmable graphics processor with a defined 8-opcode ISA, a Bresenham rasterizer, and a network-addressable command bus — driving a VGA monitor at 320×240 at 60Hz for under ₹700."
---

This started as a question I could not stop thinking about. Most modern IoT devices collect data and report it. They don't compute and they definitely don't render graphics. And if you want display output on an embedded system, you are basically forced to buy a dedicated display controller IC, an HDMI driver, and components that get you exactly nothing interesting at exactly nothing interesting resolution.

So I took a microcontroller, a pile of resistors, and built something that can reasonably be called a GPU. Not a display module. Not a framebuffer wrapper. A real programmable graphics processor with a defined instruction set, a rasterizer, and a network-addressable command bus.

**GXU-1** drives a standard VGA monitor at 320×240 at 60Hz, executes a custom 8-opcode binary ISA sent over WiFi, and costs under ₹700 in components — after borrowing the VGA monitor from the college lab, which required considerable convincing.

## The problematic hardware

VGA is an analog standard from 1987. Your monitor expects three analog voltage signals (red, green, blue) between 0V and 0.7V, plus two digital sync pulses telling it when each line ends and when each frame ends. A microcontroller only outputs digital signals — either 0V or 3.3V.

The standard solution is a DAC. I used a resistor ladder instead. Because I was not willing to spend more money on a dedicated DAC when I had resistors lying around, and because this project was built around the idea of seeing how far a microcontroller could be pushed with the most questionable hardware choices possible. The resistors cost roughly ₹35.

For GXU-1, each color channel gets 2 bits — four possible intensity levels per channel. Combine all three and you get 64 possible colors. Not ray tracing territory, but enough to draw shapes, text, and make the monitor look like something is happening.

When the ESP32 outputs a binary value, the resistor ladder turns that pattern of 1s and 0s into a proportional analog voltage. A value of `00` produces essentially 0V, `01` a low voltage, `10` a higher one, `11` pushes close to the maximum VGA color voltage. The monitor sees valid analog color signals and displays them without caring that resistors did all the work.

The **ESP32-S3** was chosen because its hardware LCD parallel interface lets the DMA controller drive all 8 GPIO pins simultaneously in sync with VGA timing at 25.175 MHz, without CPU involvement. This is the only reason 60Hz was achievable.

## The instruction set

What makes this an actual GPU and not a fancy display driver is simple. A display controller expects you to do all the hard work and hand it final pixels. GXU-1 does not — you command it what you want drawn, and it figures out which pixels need to change. That conversion from shapes and commands into actual pixels is rasterization, and for that to happen you need to talk to the hardware. That is where the ISA enters.

GXU-1 has 8 opcodes. Every packet starts with a 1-byte opcode, followed by arguments encoded as 16-bit big-endian unsigned integers. Color gets a single byte with 2 bits each for red, green, and blue.

| opcode | mnemonic | arguments | what it does |
|--------|----------|-----------|--------------|
| 0x01 | GXU_CLEAR | color (1B) | fill entire 320×240 VRAM |
| 0x02 | GXU_PIXEL | x, y (2B each), color | set one pixel |
| 0x03 | GXU_LINE | x0, y0, x1, y1 (2B each), color | Bresenham line |
| 0x04 | GXU_RECT_FILL | x, y, w, h (2B each), color | filled rectangle |
| 0x05 | GXU_RECT_OUTLINE | x, y, w, h (2B each), color | hollow rectangle |
| 0x06 | GXU_BLIT | sx, sy, dx, dy, w, h (2B each) | copy VRAM region |
| 0x07 | GXU_TEXT | x, y, color, N, chars | render ASCII string |
| 0xFF | GXU_SWAP | none | flip double buffer |

The choice of binary encoding over JSON is not aesthetic — it is performance. A JSON-encoded line command costs about 58 bytes and several hundred microseconds to parse. The binary equivalent is a fraction of that. When you are processing hundreds of drawing commands per second, the ESP32 should spend its time drawing pixels, not reading text about drawing pixels. Human readability takes a step down here; GXU-1 is not built for humans to read, it is built to move commands from A to B as fast as possible.

## The dual core architecture

To prevent the microcontroller from imploding, GXU-1 splits responsibilities hard across the two cores of the ESP32-S3. Core 0 and Core 1 never touch each other's domain. The only thing connecting them is a FreeRTOS queue acting as the internal command bus.

**Core 0 — Command Processor**
- WiFi stack and WebSocket server
- ISA packet decoder
- FreeRTOS queue writer
- Telemetry JSON sender at 200ms intervals

**Core 1 — GX Core (Rasterizer)**
- FreeRTOS queue reader
- Bresenham line, rect fill, and blit algorithms
- VRAM writes (76,800 byte framebuffer)
- Tile heatmap counters (16×12 grid)

DMA streams VRAM to GPIO pins continuously, completely independent of both cores. A burst of incoming WiFi packets on Core 0 never causes display flicker. A heavy rendering operation on Core 1 never delays network responses. The queue absorbs any burst up to 64 commands deep.

## End-to-end latency

From clicking a button in the browser dashboard to a pixel appearing on the VGA monitor:

| stage | latency |
|-------|---------|
| browser click to WiFi | ~5ms |
| Core 0 decode and queue | <1ms |
| Core 1 rasterize line | ~3ms |
| DMA to display | next frame, max 16ms |

Total perceived latency is between 10ms and 25ms. The human eye cannot perceive display feedback delays below about 100ms, so this is comfortably imperceptible.

## The VRAM heatmap

Every time Core 1 writes a pixel, it increments a counter for the tile that pixel falls in. The 320×240 screen is divided into 192 tiles (16 columns × 12 rows, each 20×20 pixels). Core 0 reads these counters every 200ms and includes them in the telemetry JSON sent back to the browser.

The dashboard renders them as a color grid — cold tiles are dark, warm tiles shift through mid tones, hot tiles reach full saturation. AMD's Radeon GPU Profiler shows the exact same visualization for production GPU workloads. GXU-1 runs the same concept on a ₹500 chip.

## Bill of materials

Everything here is available in India. Robu.in and Probots stock the ESP32-S3.

| component | specification | cost (INR) |
|-----------|---------------|------------|
| ESP32-S3-DevKitC-1-N8 | 8MB Flash, 512KB SRAM, built-in WiFi | 450–500 |
| Resistors 270Ω ×18 | 1/4W carbon film | 20 |
| Resistors 560Ω ×9 | 1/4W carbon film | 10 |
| Resistors 100Ω ×2 | sync signal protection | 5 |
| VGA DB-15 connector | DE-15 breakout or cut VGA cable | 30–50 |
| Breadboard and jumper wires | 400-tie half breadboard | 100 |
| **total** | | **615–685** |

## What I actually learned, and the mistakes

The resistor ladder surprised me most. I knew the theory but building it, measuring the voltage with a multimeter, and seeing exactly 0.35V where the math said 0.35V would be — that was a satisfying moment.

DMA timing took the longest. VGA has very specific timing requirements around horizontal and vertical porch periods, sync pulse widths, and pixel clock. Getting the LCD peripheral configured correctly took considerable trial and error. White noise means wrong porch values. Shifted colors mean wrong GPIO assignment. Tearing means sync is off. Each symptom pointed at exactly one thing.

The FreeRTOS queue architecture taught me more about real-time systems than any lecture ever did. Putting WiFi and rendering on separate cores with a defined communication channel is the same decision CPU-GPU interface designers make, just at a larger scale.

Designing the ISA was the most interesting part and also made me want to cry sometimes. Every decision compounds — binary vs text, big vs little endian, 2-bit vs 4-bit color, packet size vs expressiveness. Real GPU ISA designers play the same game at higher stakes.

The biggest mistake was underestimating how much planning graphics systems actually need. Going in with "get VGA running first and figure out everything else later" turned out badly. Every bad decision affects the next ten. A lot of redesigns could have been avoided with more time in a notebook before touching code.

Another mistake was assuming debugging would be straightforward. Software gives you logs, stack traces, and error messages. VGA gives you a screen full of nonsense and expects you to become a detective. More than once I spent hours on rendering code only to discover the real problem was a timing configuration or a GPIO assignment.

Building something from scratch forces you to understand where every abstraction comes from. Before GXU-1, a framebuffer was just a term in documentation. DMA was just another peripheral in the ESP32 datasheet. Rasterization was just something GPUs magically did. After this, every one of those concepts feels real.

## Try the software emulator

If you do not have the hardware, the complete GXU-1 ISA is implemented in a [browser-based emulator](https://princess0407.github.io/GXU-1/emulator.html) using the Canvas API. It includes the VRAM heatmap, live telemetry, and a raw hex input where you can type ISA packets directly.

To draw a red diagonal line from corner to corner:

```
03 00 00 00 F0 01 3F 00 EF 0C
```

That is opcode `0x03` (GXU_LINE), x0=0, y0=240, x1=319, y1=239, color=`0x0C` (red).

## Source

Full firmware, dashboard source, wiring guide, ISA reference, and build instructions on [GitHub](https://github.com/Princess0407/GXU-1).
