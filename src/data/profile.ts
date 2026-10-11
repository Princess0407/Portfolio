export const site = {
  name: 'Priyanka Tiwari',
  navName: 'priyanka',
  github: 'Princess0407',
  location: 'Bangalore, India',
  role: 'Curious · Systems Builder',
  lede: 'I love building things where hardware gets opinionated about software.',
  focus: 'ML inference & Security Tooling',
  about:
    "I am a poet who was once lost in engineering but now loves it. That beauty that I find in this domain is insane. In the inital days, I learnt many things, you can see that in my polar opposite projects that I've built till now. Right now I've chose working in ML inference & Security Tooling and have started building projects which are under wraps for now!! Outisde this you can find my reading research papers during my classes (during slow moving lecs) or penning poetries.",
  connect:
    "let's talk about tech or poetries or drop in your tips on how to survive as a long distacne day scholar!!",
};

export const skills = [
  'C',
  'C++',
  'Python',
  'Verilog',
  'JavaScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Linux',
  'AST / Parsing',
  'Embedded Systems',
  'Machine Learning',
  'KiCad',
  'Low Level Design',
  'AI on Edge',
  'LLM Security',
  'System Design',
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Princess0407' },
  { label: 'X', href: 'https://x.com/PriyankaBard' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyanka-tiwari-2b0992263/' },
  { label: 'Mail', href: 'mailto:priyankatiwari140419@gmail.com' },
];

export const resumeHref = '/Resume-3.pdf';

/** Work named on the resume and in writing. Used when pinned repos cannot be loaded. */
export const documentedProjects = [
  {
    name: 'GXU-1',
    description:
      'Custom GPU co-processor on an ESP32-S3: 8-opcode ISA, Bresenham rasterizer, and VGA at 320×240 for under ₹700.',
    url: 'https://github.com/Princess0407/GXU-1',
    language: 'C',
    color: null as string | null,
    stars: null as number | null,
  },
  {
    name: 'ICELang',
    description:
      'A domain-specific language for hardware description, parsed into an AST and exported to KiCad schematics.',
    url: 'https://github.com/Princess0407/ICELang',
    language: 'Python',
    color: null as string | null,
    stars: null as number | null,
  },
];

export const experience = [
  {
    title: 'FOSSEE Summer Intern',
    place: 'IIT Bombay (FOSSEE)',
    when: 'May 2026 – Present · Remote',
    detail:
      'Designed ICELang, a hardware-description DSL with a custom lexer and parser, and a KiCad schematic export pipeline.',
  },
  {
    title: 'BE, Electronics and Communications',
    place: 'Acharya Institute of Technology',
    when: 'Aug 2023 – May 2027 · Bangalore',
    detail: '',
  },
];
