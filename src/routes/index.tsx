import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { Button } from "../components/button";
import heroArt from "../assets/antigravity-hero.jpg";

const resumeUrl = "https://drive.google.com/file/d/116YDGoRnTmOmBNxNkQECyY3Pphwn8QT5/view?usp=drivesdk";
const githubUrl = "https://github.com/Hari2006-h";
const linkedinUrl = "https://www.linkedin.com/in/harika-m-3296162bb?utm_source=share_via&utm_content=profile&utm_medium=member_android";
const navItems = [{ label: "About", href: "#about" }, { label: "Skills", href: "#skills" }, { label: "Projects", href: "#projects" }, { label: "Education", href: "#education" }, { label: "Contact", href: "#contact" }];
const skillGroups = [
  { number: "01", title: "Frontend", skills: ["HTML", "CSS", "JavaScript"] },
  { number: "02", title: "Development", skills: ["Java", "Node.js", "Data Structures", "DBMS"] },
  { number: "03", title: "Databases & tools", skills: ["MySQL", "SQL", "MongoDB", "Git", "GitHub", "VS Code", "Eclipse"] },
  { number: "04", title: "Creative AI", skills: ["ChatGPT", "Gemini", "Claude", "Canva AI", "Lovable AI"] },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Harika M — Software Developer" },
    { name: "description", content: "Harika M is a Computer Science Engineering student and software developer building practical web and AI-powered experiences." },
    { property: "og:title", content: "Harika M — Software Developer" },
    { property: "og:description", content: "Explore Harika M's projects, skills, and journey in software development." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Portfolio,
});

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { nodes.forEach(node => node.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useTyping() {
  const [role, setRole] = useState("Developer");
  useEffect(() => {
    const roles = ["Developer", "Designer", "Creator"];
    let index = 0;
    const interval = window.setInterval(() => { index = (index + 1) % roles.length; setRole(roles[index]); }, 2400);
    return () => window.clearInterval(interval);
  }, []);
  return role;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-primary"><span className="font-mono opacity-65">/{number}</span><span className="h-px w-8 bg-primary/60" />{children}</div>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const role = useTyping();
  useReveal();

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:harikam361@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return <div className="min-h-screen overflow-hidden bg-background text-foreground">
    <header className="absolute inset-x-0 top-0 z-30 border-b border-border/50">
      <div className="page-shell flex h-[76px] items-center justify-between gap-4">
        <a href="#top" aria-label="Back to top" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 text-primary transition-transform duration-300 group-hover:rotate-45"><span className="absolute h-4 w-4 rounded-full border border-current" /><span className="absolute h-1.5 w-1.5 rounded-full bg-current" /></span>
          <span className="font-display text-xs font-bold uppercase tracking-[.25em]">Portfolio<span className="text-primary">.</span></span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{navItems.map(item => <a key={item.href} href={item.href} className="text-xs text-muted-foreground transition-colors hover:text-primary">{item.label}</a>)}</nav>
        <div className="hidden items-center gap-3 sm:flex"><Button asChild variant="outline" size="small"><a href={resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume <ArrowUpRight size={14} /></a></Button></div>
        <Button variant="icon" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</Button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-6 py-5 lg:hidden"><div className="flex flex-col gap-4">{navItems.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm text-foreground">{item.label}</a>)}<a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary sm:hidden">Download Resume ↗</a></div></nav>}
    </header>

    <main>
      <section id="top" className="relative min-h-[720px] overflow-hidden border-b border-border pt-[76px] md:min-h-[760px] lg:min-h-[790px]">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-y-[76px] right-[-20%] w-[115%] opacity-70 md:right-[-10%] md:w-[75%] md:opacity-95 lg:right-[-5%] lg:w-[63%]">
          <img src={heroArt} alt="Floating glass and chrome forms around a vibrant green sphere" width={1200} height={1400} className="hero-art h-full w-full object-cover object-center md:object-[center_43%]" />
        </div>
        <div className="pointer-events-none absolute left-[62%] top-[18%] h-12 w-12 rounded-full border border-lilac/60 float-a md:h-20 md:w-20" />
        <div className="pointer-events-none absolute right-[8%] top-[30%] h-3 w-3 rounded-full bg-coral shadow-[0_0_28px_var(--coral)] float-b" />
        <div className="pointer-events-none absolute bottom-[18%] right-[36%] h-2 w-2 rounded-full bg-primary shadow-[0_0_25px_var(--primary)] float-c" />
        <div className="page-shell relative z-10 flex min-h-[644px] flex-col justify-between py-12 md:min-h-[684px] lg:min-h-[714px] lg:py-16">
          <div className="flex items-start justify-between gap-5">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-primary"><span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Open to opportunities</p>
            <p className="hidden text-right font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground md:block">Independent thinking<br/>Thoughtful building</p>
          </div>
          <div className="max-w-[740px] pb-14 md:pb-10">
            <div className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[.18em] text-muted-foreground uppercase"><span className="h-px w-8 bg-lilac" /> Hello, I'm Harika</div>
            <h1 className="font-display text-[clamp(4.2rem,10vw,9rem)] font-semibold leading-[.88] text-balance">Harika <span className="text-primary">M.</span></h1>
            <p className="mt-7 font-display text-[clamp(1.5rem,3vw,2.7rem)] font-medium leading-tight text-foreground">Software <span className="text-lilac">{role}</span><span className="ml-1 inline-block h-[1em] w-[2px] translate-y-1 animate-pulse bg-primary" /></p>
            <p className="mt-5 max-w-[450px] text-sm leading-7 text-muted-foreground md:text-base">Computer Science Engineering student building practical, people-first software and exploring what’s possible with AI.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="#projects">Explore my work <ArrowUpRight size={16} /></a></Button><Button asChild variant="outline"><a href="#contact">Get in touch <ArrowRight size={16} /></a></Button></div>
          </div>
          <div className="flex items-end justify-between gap-4 text-[10px] font-semibold uppercase tracking-[.18em] text-muted-foreground"><a href="#about" className="flex items-center gap-2 transition-colors hover:text-primary">Scroll to explore <ArrowDown size={13} /></a><span className="hidden md:block">01 / 06 &nbsp;—&nbsp; Portfolio 2026</span></div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-border bg-primary py-3 text-primary-foreground" aria-hidden="true"><div className="marquee-track flex w-max gap-8 whitespace-nowrap font-display text-xs font-bold uppercase tracking-[.25em]">{Array.from({length: 8}, (_, i) => <span key={i}>Design with intention <span className="mx-8">✳</span> Build with curiosity <span className="mx-8">✳</span></span>)}</div></div>

      <section id="about" className="page-shell scroll-mt-20 py-24 md:py-36">
        <div className="reveal grid gap-12 lg:grid-cols-[.38fr_.62fr] lg:gap-24"><div><SectionLabel number="01">About me</SectionLabel><div className="mt-10 flex h-32 w-32 items-center justify-center rounded-full border border-lilac/40 bg-lilac/5 font-display text-6xl text-lilac float-a">✳</div></div><div><h2 className="font-display text-4xl font-medium leading-[1.12] md:text-5xl lg:text-6xl">Curious mind.<br/><span className="text-muted-foreground">Builder at heart.</span></h2><p className="mt-9 max-w-2xl text-base leading-8 text-muted-foreground">I’m a Computer Science and Engineering student with a strong foundation in Java, data structures, databases, and software engineering. I enjoy turning complex ideas into efficient, practical solutions—from AI-powered tools to full-stack web experiences.</p><p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">I’m always learning, always experimenting, and looking for an entry-level software development role where I can contribute to meaningful projects and keep growing.</p><div className="mt-9 flex flex-wrap gap-6 border-t border-border pt-7"><div><span className="block font-display text-2xl font-semibold text-primary">9.12</span><span className="text-xs text-muted-foreground">Engineering CGPA</span></div><div><span className="block font-display text-2xl font-semibold text-lilac">2027</span><span className="text-xs text-muted-foreground">Expected graduation</span></div><div><span className="block font-display text-2xl font-semibold text-coral">Web + AI</span><span className="text-xs text-muted-foreground">Areas of interest</span></div></div></div></div>
      </section>

      <section id="skills" className="scroll-mt-20 border-y border-border bg-surface py-24 md:py-32"><div className="page-shell"><div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel number="02">My toolkit</SectionLabel><h2 className="mt-6 font-display text-4xl font-medium md:text-6xl">What I work with<span className="text-primary">.</span></h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">A growing mix of development fundamentals, creative tools, and curiosity.</p></div><div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">{skillGroups.map((group, i) => <div key={group.title} className="reveal min-h-[230px] bg-surface p-7 transition-colors hover:bg-card md:p-9" style={{transitionDelay: `${i * 80}ms`}}><div className="flex items-center justify-between"><span className="font-mono text-xs text-primary">/{group.number}</span><span className="text-xl text-muted-foreground">↗</span></div><h3 className="mt-7 font-display text-2xl font-medium">{group.title}</h3><div className="mt-5 flex flex-wrap gap-2">{group.skills.map(skill => <span key={skill} className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground">{skill}</span>)}</div></div>)}</div></div></section>

      <section id="projects" className="page-shell scroll-mt-20 py-24 md:py-36"><div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel number="03">Selected work</SectionLabel><h2 className="mt-6 font-display text-4xl font-medium md:text-6xl">Things I've built<span className="text-primary">.</span></h2></div><div className="flex gap-2" role="group" aria-label="Filter projects">{["All", "Web App"].map(option => <Button key={option} variant={filter === option ? "primary" : "outline"} size="small" onClick={() => setFilter(option)} aria-pressed={filter === option}>{option}</Button>)}</div></div><div className="reveal mt-12 grid overflow-hidden border border-border bg-card lg:grid-cols-[1fr_1fr]"><div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-secondary p-8 md:min-h-[440px]"><div className="absolute inset-0 hero-grid opacity-50"/><div className="orbit-outline float-a absolute h-64 w-64 rounded-full md:h-80 md:w-80"/><div className="orbit-outline float-b absolute h-48 w-80 rounded-full md:h-64 md:w-[430px]"/><div className="relative z-10 w-full max-w-[310px] border border-border bg-background/85 p-5 shadow-2xl backdrop-blur-md"><div className="flex items-center justify-between border-b border-border pb-4"><span className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Resume analysis</span><span className="h-2 w-2 rounded-full bg-primary"/></div><div className="mt-6 flex items-end justify-between"><span className="font-display text-5xl font-semibold text-primary">87<span className="text-lg">%</span></span><span className="text-xs text-muted-foreground">ATS score</span></div><div className="mt-6 space-y-3"><div className="h-1.5 w-full rounded-full bg-muted"><div className="h-full w-[87%] rounded-full bg-primary"/></div><div className="h-1.5 w-full rounded-full bg-muted"><div className="h-full w-[68%] rounded-full bg-lilac"/></div><div className="h-1.5 w-full rounded-full bg-muted"><div className="h-full w-[76%] rounded-full bg-coral"/></div></div><div className="mt-6 flex justify-between text-[10px] text-muted-foreground"><span>SKILLS MATCH</span><span>KEYWORD CHECK</span></div></div><span className="float-c absolute right-8 top-8 text-4xl text-lilac">✳</span></div><div className="flex flex-col justify-between p-8 md:p-12"><div><div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-primary"><span className="h-2 w-2 rounded-full bg-primary"/> Featured project <span className="ml-auto text-muted-foreground">2026</span></div><h3 className="mt-12 font-display text-3xl font-medium leading-tight md:text-4xl">AI ATS Resume<br/>Analyzer</h3><p className="mt-6 text-sm leading-7 text-muted-foreground">A full-stack tool that parses resumes, scores them for applicant tracking systems, compares them with job descriptions, and points out missing skills and keywords.</p><div className="mt-7 flex flex-wrap gap-2">{["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"].map(tech => <span key={tech} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">{tech}</span>)}</div></div><div className="mt-12 flex flex-wrap gap-4"><Button asChild><a href="https://ai-ats-resume-analyzer-4.onrender.com" target="_blank" rel="noopener noreferrer">Live project <ArrowUpRight size={16}/></a></Button><Button asChild variant="outline"><a href="https://github.com/Hari2006-h/AI-ATS-Resume-Analyzer" target="_blank" rel="noopener noreferrer">Source code <Github size={16}/></a></Button></div></div></div></section>

      <section id="education" className="scroll-mt-20 border-y border-border bg-surface py-24 md:py-32"><div className="page-shell"><div className="reveal"><SectionLabel number="04">The journey</SectionLabel><h2 className="mt-6 font-display text-4xl font-medium md:text-6xl">Always learning<span className="text-primary">.</span></h2></div><div className="mt-14 border-t border-border">{[{period: "2023 — 2027", degree: "Bachelor of Engineering", school: "S C Institute of Technology · Chikkaballapur", detail: "Computer Science & Engineering  ·  CGPA 9.12"}, {period: "Completed 2023", degree: "Pre-University", school: "SJ PU College · Bangalore", detail: "91.33%"}].map((item, i) => <div key={item.degree} className="reveal grid gap-5 border-b border-border py-8 md:grid-cols-[.27fr_.73fr] md:py-10"><span className="font-mono text-sm text-primary">{item.period}</span><div><h3 className="font-display text-2xl font-medium md:text-3xl">{item.degree}</h3><p className="mt-2 text-sm text-muted-foreground">{item.school}</p><p className="mt-4 text-xs uppercase tracking-[.14em] text-lilac">{item.detail}</p></div></div>)}</div><div className="reveal mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-[.27fr_.73fr]"><SectionLabel number="05">Certification</SectionLabel><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl font-medium">NPTEL Online Certification</h3><p className="mt-2 text-sm text-muted-foreground">January – April 2026</p></div><span className="text-2xl text-coral">✳</span></div></div></div></section>

      <section id="contact" className="page-shell scroll-mt-20 py-24 md:py-36"><div className="reveal grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><div><SectionLabel number="06">Get in touch</SectionLabel><h2 className="mt-7 font-display text-5xl font-medium leading-[1.05] md:text-7xl">Let's make<br/><span className="text-primary">something</span><br/>happen<span className="text-coral">.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground">Have an opportunity, an idea, or just want to say hello? I’d love to hear from you.</p><a href="mailto:harikam361@gmail.com" className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-2 text-sm text-primary transition-colors hover:text-lilac">harikam361@gmail.com <ArrowUpRight size={15}/></a><div className="mt-12 flex gap-3"><Button asChild variant="icon" size="icon"><a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17}/></a></Button><Button asChild variant="icon" size="icon"><a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a></Button><Button asChild variant="icon" size="icon"><a href="mailto:harikam361@gmail.com" aria-label="Email"><Mail size={17}/></a></Button></div></div><form onSubmit={sendMessage} className="space-y-6 border-t border-border pt-8"><div className="grid gap-6 sm:grid-cols-2"><label className="block text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">Your name<input required name="name" placeholder="Your name" className="mt-3 h-12 w-full rounded-none border-b border-border bg-transparent text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"/></label><label className="block text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">Email address<input required type="email" name="email" placeholder="you@example.com" className="mt-3 h-12 w-full rounded-none border-b border-border bg-transparent text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"/></label></div><label className="block text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">Your message<textarea required name="message" rows={5} placeholder="Tell me about your idea..." className="mt-3 w-full resize-y rounded-none border-b border-border bg-transparent py-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"/></label><div className="flex flex-wrap items-center gap-4"><Button type="submit">Send message <ArrowUpRight size={16}/></Button>{submitted && <span role="status" className="flex items-center gap-2 text-xs text-primary"><Check size={14}/> Your email app is opening</span>}</div></form></div></section>
    </main>
    <footer className="border-t border-border bg-surface"><div className="page-shell flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between"><div><a href="#top" className="font-display text-3xl font-semibold">Harika M<span className="text-primary">.</span></a><p className="mt-2 text-xs text-muted-foreground">Software Developer · Building with curiosity.</p></div><div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground"><a href="#top" className="flex items-center gap-1 hover:text-primary">Back to top <ArrowUpRight size={13}/></a><a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a><a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a><span>© 2026 Harika M</span></div></div><div className="noise-line h-1 w-full"/></footer>
  </div>;
}
