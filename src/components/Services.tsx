"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTechVacuum, cardTechMap } from "@/lib/TechVacuumContext";

const services = [
  { number: "01", title: "Languages", description: "Core programming languages I work with daily across the stack.", bgWord: "LANG" },
  { number: "02", title: "Frontend", description: "Crafting performant, responsive interfaces with modern frameworks.", bgWord: "UI" },
  { number: "03", title: "Backend", description: "Building scalable APIs, data pipelines, and robust architectures.", bgWord: "API" },
  { number: "04", title: "Other", description: "MLOps, containerization, CI/CD — everything that keeps systems running.", bgWord: "OPS" },
];

const stack = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Framer", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "SQL", svg: (<svg viewBox="0 0 128 128" className="h-3.5 w-3.5"><defs><radialGradient id="svc-grad" cx="9.36" cy="10.57" r="7.07" gradientTransform="matrix(73.03 0 0 37.19 29.8 56.54)"><stop offset="0" stopColor="#f2f2f2"/><stop offset=".58" stopColor="#eee"/><stop offset="1" stopColor="#e6e6e6"/></radialGradient><linearGradient id="svc-grad2" x1="2.59" y1="10.16" x2="15.41" y2="10.16" gradientTransform="scale(7.11)"><stop offset="0" stopColor="#005ba1"/><stop offset=".07" stopColor="#0060a9"/><stop offset=".36" stopColor="#0071c8"/><stop offset=".52" stopColor="#0078d4"/><stop offset=".64" stopColor="#0074cd"/><stop offset=".82" stopColor="#006abb"/><stop offset="1" stopColor="#005ba1"/></linearGradient></defs><path fill="url(#svc-grad2)" d="M64 36.55c-25.17 0-45.58-7.11-45.58-16.5v87.89c0 9.03 20.06 16.36 44.94 16.5H64c25.17 0 45.58-7.11 45.58-16.5v-87.89c0 9.17-20.41 16.5-45.58 16.5z"/><path fill="#e8e8e8" d="M109.58 20.06c0 9.17-20.41 16.5-45.58 16.5s-45.58-7.11-45.58-16.5c0-9.39 20.41-16.5 45.58-16.5s45.58 7.11 45.58 16.5"/><path fill="#50e6ff" d="M98.99 18.7c0 5.83-15.72 10.52-34.99 10.52s-34.99-4.69-34.99-10.52C29.01 12.87 44.73 8.25 64 8.25s34.99 4.69 34.99 10.45"/><path fill="#198ab3" d="M64 21.33a82.2 82.2 0 00-27.66 4.06A81.2 81.2 0 0064 29.23a79.3 79.3 0 0027.66-4.13A84.3 84.3 0 0064 21.33z"/><path fill="url(#svc-grad)" d="M91.73 81.07V56.89h-6.4v29.37h17.5v-5.19zM40.96 69.19a13.06 13.06 0 01-3.63-2.2 3.13 3.13 0 01-.85-2.28 2.42 2.42 0 011.07-2.13 4.85 4.85 0 012.99-.86 11.53 11.53 0 017.11 2.06v-6.11a18.24 18.24 0 00-7.11-1.14 11.67 11.67 0 00-7.75 2.41 7.68 7.68 0 00-2.99 6.33c0 3.63 2.27 6.47 7.11 8.6 1.57.67 3.05 1.53 4.41 2.56a2.98 2.98 0 011.07 2.28c0 .88-.43 1.7-1.14 2.2a5.79 5.79 0 01-3.2.79 11.8 11.8 0 01-7.75-2.99v6.61a15.41 15.41 0 007.61 1.71 13.13 13.13 0 008.39-2.35 7.68 7.68 0 002.35-6.47 7.46 7.46 0 00-1.78-4.98 17.23 17.23 0 00-5.9-4.05zm37.26 11.3a16.63 16.63 0 002.35-8.96A16.51 16.51 0 0078.22 64a12.87 12.87 0 00-4.98-5.33 14.23 14.23 0 00-7.11-1.85 15.02 15.02 0 00-7.68 1.92A13.22 13.22 0 0053.26 64a17.48 17.48 0 00-1.85 8.11 16.06 16.06 0 001.71 7.11 12.53 12.53 0 004.91 5.26 14.68 14.68 0 007.11 2.13l6.12 7.11h8.6l-8.75-7.82a12.74 12.74 0 007.12-5.41zm-7.12-1.78a6.67 6.67 0 01-5.4 2.49 6.54 6.54 0 01-5.41-2.56 10.84 10.84 0 01-2.06-7.11 10.9 10.9 0 012.06-7.11 7.1 7.1 0 015.55-2.63 6.18 6.18 0 015.34 2.63 11.53 11.53 0 011.92 7.11 10.35 10.35 0 01-2 7.18z"/></svg>) },
  { name: "LangChain", svg: (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5"><path d="M6.099 5.918C2.736 5.918 0 8.646 0 12s2.736 6.082 6.099 6.082h11.802C21.264 18.082 24 15.354 24 12s-2.736-6.082-6.099-6.082zM5.977 7.851c.493.012 1.02.25 1.273.623.367.459.478 1.067.895 1.493.56.612 1.199 1.15 1.716 1.802.489.595.838 1.294 1.143 1.998.125.233.126.52.31.72.091.12.535.448.439.564.055.12.47.286.326.403-.194.04-.413.048-.562-.107-.055.126-.183.06-.282.043l-.025.074c-.328.022-.575-.313-.732-.565-.311-.168-.664-.27-.982-.446-.018.29.045.649-.231.835-.014.557.844.066.922.48a.237.237 0 01-.177.038c-.224.217-.48-.164-.739-.007-.346.174-.38.316-.81.352a.1.1 0 01.006-.081c.12-.14.13-.305.336-.365-.212-.033-.39.084-.569.176-.232.095-.23-.214-.588.017a.15.15 0 00.002-.087c.09-.11.21-.127.345-.12-.663-.369-.975.45-1.281.043-.092.024-.127.107-.185.165-.05-.055-.012-.121-.01-.186-.06-.028-.135-.041-.118-.136-.117-.04-.199.03-.286.095-.079-.06.053-.149.078-.213.07-.121.23-.025.31-.112.231-.131.553.081.816.045.203.026.454-.182.353-.39-.217-.277-.179-.639-.184-.97-.027-.192-.491-.438-.625-.646a4.73 4.73 0 00-.424-.618C5.016 12.41 5.163 11.252 4.575 10.416c-.266.147-.613.077-.842-.119a.45.45 0 00-.139.416c-.297-.296-.26-.856-.022-1.185a1.4 1.4 0 01.342-.332c.03-.021.04-.042.039-.075.117-.526.576-.739 1.07-.726m12.407.46c.558 0 1.08.216 1.474.608s.61.915.61 1.47c0 .556-.217 1.078-.61 1.47v.001l-.902.9a2.08 2.08 0 01-.86.516l-.016.005-.006.016a2.05 2.05 0 01-.474.731l-.902.9c-.393.392-.917.608-1.474.608s-1.08-.216-1.474-.608c-.813-.811-.813-2.13 0-2.94l.902-.9a2.056 2.056 0 01.858-.514l.017-.005.006-.016a2.07 2.07 0 01.475-.734l.902-.9c.393-.392.917-.608 1.474-.608zm0 .897a1.18 1.18 0 00-.839.346l-.902.9a1.181 1.181 0 00-.342.925l.005.057c.032.265.149.504.337.692.13.13.274.211.447.269l.014.158a.884.884 0 01-.26.63l-.056.055c-.301-.103-.552-.253-.78-.479a2.06 2.06 0 01-.576-1.097l-.01-.058-.046.037a1.1 1.1 0 00-.087.08l-.903.9c-.462.46-.462 1.211 0 1.672.231.23.535.346.84.346.304 0 .607-.116.838-.346l.902-.9c.462-.46.462-1.211 0-1.673a1.17 1.17 0 00-.437-.275 1 1 0 01-.014-.16c0-.26.102-.506.29-.693.302.103.57.27.796.495.301.3.5.68.576 1.097l.01.058.046-.037a1.1 1.1 0 00.089-.08l.902-.9c.462-.46.463-1.212 0-1.673a1.18 1.18 0 00-.84-.346zM8.42 14.468l-.001.001c-.08.308-.105.832-.506.847-.033.178.123.245.265.187.141-.064.208.051.256.166.218.032.54-.072.552-.33-.325-.186-.425-.542-.566-.87" fill="#000"/></svg>) },
  { name: "ChromaDB", svg: (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5"><path fill="#ffde2d" d="M15.9166 19.52c4.3262 0 7.8333-3.3668 7.8333-7.52 0-4.1531-3.5071-7.52-7.8333-7.52s-7.8333 3.3668-7.8333 7.52c0 4.1532 3.507 7.52 7.8333 7.52z"/><path fill="#327eff" d="M8.0833 19.52c4.3263 0 7.8334-3.3668 7.8334-7.52 0-4.1531-3.5071-7.52-7.8333-7.52S.25 7.847 0.25 12c0 4.1532 3.5071 7.52 7.8333 7.52z"/><path fill="#ff6446" d="M15.9166 12c0 4.1532-3.5071 7.52-7.8333 7.52V12h7.8333zm-7.8333 0c0-4.1532 3.5071-7.52 7.8333-7.52V12H8.0833z"/></svg>) },
  { name: "MLflow", logo: "https://cdn.brandfetch.io/idS8GMP5c8/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1781708788955" },
  { name: "LangGraph", svg: (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5"><path fill="#fff" d="M6.099 5.88H17.9C21.264 5.88 24 8.625 24 12s-2.736 6.12-6.099 6.12H6.1C2.736 18.12 0 15.375 0 12s2.736-6.12 6.099-6.12Zm5.419 9.487c.148.156.367.148.561.108h.002c.09-.073-.038-.166-.16-.254-.074-.054-.145-.105-.166-.15.068-.083-.132-.27-.289-.417a1.539 1.539 0 0 1-.15-.151c-.11-.12-.155-.273-.2-.427a1.575 1.575 0 0 0-.11-.297c-.304-.708-.653-1.41-1.143-2.01-.315-.398-.674-.755-1.033-1.112-.232-.23-.463-.46-.683-.701-.226-.234-.362-.521-.499-.81-.114-.24-.228-.482-.396-.693-.507-.75-2.107-.955-2.342.105 0 .033-.01.054-.039.075-.13.095-.245.203-.342.334-.238.332-.274.895.022 1.193l.001-.02c.01-.15.02-.29.139-.399.228.198.576.268.841.12.32.46.422 1.015.525 1.572.085.464.17.93.382 1.341l.014.022c.124.208.25.419.41.6.059.09.178.187.297.284.157.128.314.256.329.366v.146c-.001.29-.002.59.184.83.103.208-.15.418-.352.392a.989.989 0 0 1-.354-.043c-.165-.04-.329-.08-.462-.003-.038.04-.091.042-.145.043-.064.002-.129.004-.167.07a.29.29 0 0 1-.045.066c-.042.051-.087.107-.033.149l.015-.011c.082-.063.16-.123.27-.085-.014.082.039.103.092.125l.027.012a.357.357 0 0 1-.008.057c-.009.046-.017.09.018.13a.605.605 0 0 0 .046-.056c.037-.046.073-.094.139-.11.144.192.289.112.471.012.206-.114.459-.253.81-.056-.135-.007-.255.01-.345.121-.023.025-.042.054-.002.087.207-.135.294-.086.375-.04.06.032.115.063.212.024l.07-.037c.155-.084.314-.17.499-.14-.139.04-.188.127-.242.223-.026.047-.054.097-.094.143-.021.021-.03.046-.007.082.29-.024.4-.098.548-.197.07-.047.15-.1.261-.157.124-.076.248-.028.368.02.13.05.255.1.371-.013.037-.035.083-.035.129-.036.016 0 .033 0 .05-.002-.037-.194-.24-.191-.448-.189-.24.003-.483.005-.475-.295.222-.152.224-.415.226-.665 0-.06 0-.119.005-.176.163.092.336.163.508.234.162.066.323.133.474.215.157.254.404.59.732.568.008-.026.016-.048.026-.074.019.003.039.008.059.014.086.021.178.045.223-.057zm6.429-2.886a1.014 1.014 0 0 0 1.729-.715 1.01 1.01 0 0 0-1.013-1.01c-.126 0-.25.023-.364.068l-.58-.848-.405.278.583.851a1.009 1.009 0 0 0 .05 1.376zm-1.818-2.744a1.014 1.014 0 0 0 1.42-.615 1.008 1.008 0 0 0-.845-1.293 1.015 1.015 0 0 0-1.095.712 1.008 1.008 0 0 0 .520 1.196zm0 5.867a1.015 1.015 0 0 0 1.42-.615 1.008 1.008 0 0 0-.845-1.293 1.015 1.015 0 0 0-1.095.712 1.008 1.008 0 0 0 .520 1.196zm.932-3.586v-.503h-1.55a1.003 1.003 0 0 0-.218-.412l.583-.864-.424-.28-.583.863a1.014 1.014 0 0 0-.333-.06c-.268 0-.525.106-.714.294a1.002 1.002 0 0 0 1.047 1.655l.583.864.42-.281-.579-.864c.104-.119.178-.26.217-.412z"/></svg>) },
  { name: "CI/CD", svg: (<svg viewBox="0 0 36 36" className="h-3.5 w-3.5"><path fill="#000" d="M23.53 19.81a7.45 7.45 0 01-1.65-.18 10.48 10.48 0 01.72 2.13c.3 0 .61 0 .93 0a9.52 9.52 0 003-.49l-.93-1.81a7.67 7.67 0 01-2.07.35z"/><path fill="#000" d="M18.36 17.87l-.36-.38a7.4 7.4 0 01-2.2-5.92 7.31 7.31 0 011.54-4L17.26 9A1 1 0 0018.17 10h.09a1 1 0 001-.91L19.6 5a1 1 0 00-.29-.79A1 1 0 0018.52 4l-4.09.35a1 1 0 00.17 2l1.29-.11a9.45 9.45 0 00-2.05 5.32 9.28 9.28 0 002.67 7.26l.31.37a7.33 7.33 0 012.06 4.91 7.39 7.39 0 01-.26 2.47l1.8.91a8.76 8.76 0 00.45-3.51A9.28 9.28 0 0018.36 17.87z"/><path fill="#000" d="M32.4 17.91L31.19 18A9.65 9.65 0 0023.53 2.45a9.33 9.33 0 00-3 .49l.91 1.8a7.67 7.67 0 019.76 7.39 7.58 7.58 0 01-1.65 4.72l.1-1.54a1 1 0 10-2-.13l-.28 4.08a1 1 0 00.31.78.94.94 0 00.69.28h.1l4.08-.42a1 1 0 00.9-1.1A1 1 0 0032.4 17.91z"/><path fill="#000" d="M4.07 20.44h.08l4.09-.35a1 1 0 10-.17-2l-1.39.12a7.63 7.63 0 014.52-1.49 7.9 7.9 0 011.63.18 10.23 10.23 0 01-.71-2.13c-.3 0 -.61 0 -.92 0a9.66 9.66 0 00-5.9 2l.12-1.31a1 1 0 00-.92-1.08 1 1 0 00-1.08.91l-.35 4.08a1 1 0 001 1.08z"/><path fill="#000" d="M18.42 28.23l-4.09.27a1 1 0 00.13 2L16 30.39a7.71 7.71 0 01-12.54-6 7.6 7.6 0 01.29-2L2 21.46a9.59 9.59 0 00-.47 2.95A9.7 9.7 0 0017.19 32l-.12 1.18a1 1 0 00.89 1.1h.11a1 1 0 001-.9l.42-4.06a1 1 0 00-1.06-1.1z"/></svg>) },
];

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Services() {
  const { activeCard, openCard, closeCard } = useTechVacuum();

  return (
    <section id="capabilities" className="bg-[#f7f7f5] pt-8 pb-16 md:pt-12 md:pb-20 scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="md:col-span-4"
          >
            <p className="mb-4 text-[11px] uppercase tracking-[.18em] text-black/45">Capabilities</p>
            <h2 className="max-w-sm font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.92] tracking-[-.06em]">Make the complex feel simple.</h2>
          </motion.div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map(({ number, title, description, bgWord }, index) => {
              const isOpen = activeCard === title;
              const techs = cardTechMap[title] || [];
              return (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.09, ease }}
                  layout
                  onClick={() => (isOpen ? closeCard() : openCard(title))}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl px-3 transition-all duration-[300ms] ease-[0.22,0.61,0.36,1] hover:translate-y-[-3px] hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] md:px-4"
                >
                  <div className={`${isOpen ? 'pb-0' : ''} relative z-10 border-t border-black/[0.06] transition-all duration-[220ms] ease-[0.22,0.61,0.36,1] group-hover:border-transparent`}>
                    <div className="grid grid-cols-[1fr_auto] gap-4 py-6 md:gap-6 md:py-7">
                      <div>
                        <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] leading-none tracking-[-.05em] text-[#111] transition-transform duration-[220ms] ease-[0.22,0.61,0.36,1] group-hover:translate-x-[6px]">{title}</h3>
                        <p className="mt-3 max-w-md text-[16px] leading-[1.7] text-[#666] transition-transform duration-[220ms] ease-[0.22,0.61,0.36,1] group-hover:translate-x-[8px]">{description}</p>
                      </div>
                      <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border transition-all duration-[300ms] ease-[0.22,0.61,0.36,1] ${isOpen ? 'bg-[#111] border-[#111] rotate-45 shadow-[0_8px_24px_rgba(0,0,0,0.15)] scale-110' : 'border-black/[0.10] bg-white'}`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-[300ms] ease-[0.22,0.61,0.36,1] ${isOpen ? 'text-white -rotate-45 scale-110' : 'text-[#111]'}`}>
                          {isOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                          ) : (
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                          )}
                        </svg>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="relative flex flex-wrap gap-2 pb-6 pt-2">
                            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[200px] font-bold leading-none text-black/[0.015]">
                              {bgWord}
                            </div>
                            {techs.map((techName, i) => {
                              const t = stack.find((s) => s.name === techName);
                              if (!t) return null;
                              return (
                                <motion.span
                                  key={techName}
                                  layoutId={techName}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
                                >
                                  <span className="inline-flex h-[36px] items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 text-[14px] font-medium text-[#111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:translate-y-[-2px] hover:border-black hover:bg-[#111] hover:text-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
                                    {t.svg ? (
                                      <span className={`flex h-3.5 w-3.5 items-center justify-center ${t.name === "LangGraph" ? "rounded-[3px] bg-[#1C3C3C]" : ""}`}>{t.svg}</span>
                                    ) : (
                                      <img src={t.logo!} alt={t.name} className="h-3.5 w-3.5" loading="lazy" />
                                    )}
                                    {t.name}
                                  </span>
                                </motion.span>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative mt-5 inline-flex items-center"
            >
              <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-black/40 transition-all duration-200 hover:border-black/15 hover:text-black/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]/60" />
                Learning
              </span>
              <div className="absolute left-0 top-full pt-2 opacity-0 transition-all duration-[250ms] ease-[0.22,0.61,0.36,1] group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                <div className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] whitespace-nowrap">
                  {["Kubernetes", "MLflow", "LangGraph"].map((name) => (
                    <span key={name} className="text-[13px] font-medium text-black/50 transition-colors hover:text-black/70">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
