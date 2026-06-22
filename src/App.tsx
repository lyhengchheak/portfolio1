import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Printer,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  X,
  ZoomIn,
} from "lucide-react";

const profileImg = "https://i.postimg.cc/HLT4Z4T0/IMG-9213.jpg";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, shown };
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative mx-auto w-full max-w-6xl px-6 py-24 transition-all duration-700 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-14 text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
        <Sparkles className="h-3 w-3" /> {eyebrow}
      </div>
      <h2 className="gradient-text text-4xl font-bold sm:text-5xl">{title}</h2>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["About", "about"],
    ["Education", "education"],
    ["Experience", "experience"],
    ["Skills", "skills"],
    ["Services", "services"],
    ["Contact", "contact"],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#home" className="font-display text-lg font-bold tracking-tight">
          <span className="gradient-text">CL.</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary/20 hover:shadow-glow md:inline-flex"
        >
          Hire Me
        </a>
      </div>
    </header>
  );
}

function ImageLightbox({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, open]);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={profileImg}
            alt="Chheak Lyheng full view"
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function Hero() {
  const roles = [
    { num: "01", label: "POS Specialist" },
    { num: "02", label: "Backend Developer" },
    { num: "03", label: "IT Support" },
  ];

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-[1fr_1.1fr] md:items-center lg:gap-12">
        <div className="relative flex items-end justify-center md:justify-start">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span
              className="whitespace-nowrap font-display text-[4.5rem] font-black uppercase leading-none text-foreground/[0.04] sm:text-[6rem] md:text-[5rem] lg:text-[7rem] xl:text-[8.5rem]"
              style={{ WebkitTextStroke: "1px oklch(0.68 0.18 245 / 15%)" }}
            >
              CHHEAK LYHENG
            </span>
          </div>

          <div className="relative z-10 mt-10">
            <ImageLightbox>
              <button
                type="button"
                className="group relative mx-auto block w-72 cursor-zoom-in sm:w-80 md:w-full md:max-w-sm"
                aria-label="Open profile image"
              >
                <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-transparent blur-2xl transition group-hover:from-primary/50 group-hover:via-accent/40" />
                <div className="relative aspect-square overflow-hidden rounded-full border border-primary/20 shadow-card transition group-hover:border-primary/50">
                  <img
                    src={profileImg}
                    alt="Chheak Lyheng"
                    width={640}
                    height={640}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition group-hover:bg-black/20">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 transition group-hover:opacity-100" />
                  </div>
                </div>
              </button>
            </ImageLightbox>
          </div>
        </div>

        <div className="animate-fade-up pb-8 md:pb-0">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Available for
            opportunities
          </div>
          <p className="mb-2 text-sm font-medium italic text-primary/80">
            I&apos;m Chheak Lyheng!
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Delivering reliable IT solutions and seamless system support for business operations -
            POS deployment, backend development, and end-to-end troubleshooting.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#skills"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
            >
              View My Skills <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary/50 hover:text-primary"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-20 hidden md:block">
        <div className="space-y-2">
          {roles.map((role) => (
            <div key={role.num} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">({role.num})</span>
              <span className="font-display text-lg font-semibold italic text-foreground/90">
                {role.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const highlights = [
    "Problem-solving mindset for complex technical issues",
    "Customer-focused IT support approach",
    "Reduce system downtime, ensure business continuity",
  ];

  return (
    <Section id="about">
      <SectionTitle eyebrow="About Me" title="Adaptable IT Professional" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass rounded-2xl p-8">
          <p className="leading-relaxed text-muted-foreground">
            I&apos;m an adaptable IT graduate with strong hands-on experience in
            <span className="text-foreground"> POS system deployment and troubleshooting</span>,
            hardware integration, Windows OS installation and boot configuration, and remote
            technical support using UltraViewer. I also build backend systems with
            <span className="text-foreground"> Spring Boot</span> and
            <span className="text-foreground"> Laravel</span>.
          </p>
          <div className="mt-6 space-y-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_10px_oklch(0.68_0.18_245)]" />
                <span className="text-sm text-muted-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "POS Systems", v: "Deployment" },
            { k: "Backend", v: "Spring Boot / Laravel" },
            { k: "Remote Support", v: "UltraViewer" },
            { k: "Hardware", v: "Integration" },
          ].map((stat) => (
            <div
              key={stat.k}
              className="glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="text-xs uppercase tracking-widest text-primary">{stat.k}</div>
              <div className="mt-2 font-display text-lg font-semibold">{stat.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Education() {
  const items = [
    {
      icon: GraduationCap,
      title: "Bachelor of Information Technology",
      org: "RUPP University",
      date: "Completed: 02 April 2026",
    },
    {
      icon: Award,
      title: "Cisco Networking Academy Certification",
      org: "Cisco",
      date: "Completed: 23 September 2024",
    },
  ];

  return (
    <Section id="education">
      <SectionTitle eyebrow="Education" title="Academic Journey" />
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-2 left-6 top-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="relative mb-8 pl-16">
              <div className="absolute left-0 top-1 grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-card text-primary shadow-[0_0_20px_oklch(0.68_0.18_245/30%)] transition hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <div className="glass rounded-xl p-6 transition hover:border-primary/40">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-primary">{item.org}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Experience() {
  const responsibilities = [
    "POS system deployment and maintenance",
    "Troubleshooting hardware/software issues",
    "Supporting retail and e-commerce environments",
    "Remote support using UltraViewer",
    "Ensuring minimal downtime for business operations",
  ];

  return (
    <Section id="experience">
      <SectionTitle eyebrow="Experience" title="Professional Work" />
      <div className="glass group relative overflow-hidden rounded-2xl p-8 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold">IT Application Support</h3>
              <p className="text-primary">Tonaire Digital</p>
            </div>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            11 May 2026 - 11 Nov 2026
          </span>
        </div>
        <ul className="relative mt-6 grid gap-3 sm:grid-cols-2">
          {responsibilities.map((responsibility) => (
            <li
              key={responsibility}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {responsibility}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Skills() {
  const groups = [
    { title: "Programming Languages", icon: Code2, items: ["Java", "PHP", "Dart"] },
    {
      title: "IT Support & Hardware",
      icon: Wrench,
      items: ["POS Setup & Configuration", "Receipt Printer Integration", "Windows Boot & OS Install"],
    },
    { title: "Tools & Systems", icon: Terminal, items: ["UltraViewer", "CentOS", "Git", "Android Studio"] },
    { title: "Databases", icon: Database, items: ["MySQL"] },
  ];

  return (
    <Section id="skills">
      <SectionTitle eyebrow="Skills" title="Technical Toolkit" />
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => {
          const Icon = group.icon;

          return (
            <div
              key={group.title}
              className="glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary transition group-hover:shadow-[0_0_20px_oklch(0.68_0.18_245/50%)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/60 hover:bg-primary/15 hover:text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Services() {
  const services = [
    {
      icon: MonitorSmartphone,
      title: "IT Application Support & Troubleshooting",
      desc: "Fast, structured resolution of application and system issues.",
    },
    {
      icon: Server,
      title: "POS System Deployment & Maintenance",
      desc: "End-to-end POS rollout, configuration and ongoing care.",
    },
    {
      icon: Printer,
      title: "Hardware Integration",
      desc: "Receipt printers, POS terminals, and peripheral setup.",
    },
    {
      icon: Cpu,
      title: "Remote Technical Support",
      desc: "UltraViewer-powered remote assistance with minimal downtime.",
    },
    {
      icon: Code2,
      title: "Backend System Development",
      desc: "Spring Boot and Laravel APIs and business logic.",
    },
  ];

  return (
    <Section id="services">
      <SectionTitle eyebrow="Services" title="What I Deliver" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="glass group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
              <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="relative mt-5 font-display text-lg font-semibold">{service.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionTitle eyebrow="Portfolio" title="Projects Coming Soon" />
      <div className="glass relative overflow-hidden rounded-2xl p-12 text-center">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <div className="mx-auto mb-5 grid h-16 w-16 animate-float place-items-center rounded-2xl border border-primary/40 bg-primary/10 text-primary">
            <Code2 className="h-7 w-7" />
          </div>
          <h3 className="gradient-text font-display text-2xl font-semibold">Under Construction</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Case studies and project showcases are on the way. Check back soon for deep dives into
            POS deployments and backend builds.
          </p>
          <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-primary/10">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const contacts = [
    { icon: Mail, label: "Email", value: "Chheaklyheng@gmail.com", href: "mailto:Chheaklyheng@gmail.com" },
    { icon: Phone, label: "Phone", value: "067 560 650", href: "tel:+85567560650" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "chheak-lyheng",
      href: "https://www.linkedin.com/in/chheak-lyheng-19839a2ab",
    },
    { icon: MapPin, label: "Location", value: "Terk Thla, Phnom Penh", href: "#contact" },
  ];

  return (
    <Section id="contact">
      <SectionTitle eyebrow="Contact" title="Let's Build Something" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {contacts.map((contact) => {
            const Icon = contact.icon;

            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                className="glass group flex items-center gap-4 rounded-xl p-5 transition hover:-translate-y-0.5 hover:border-primary/50"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary transition group-hover:shadow-[0_0_20px_oklch(0.68_0.18_245/60%)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {contact.label}
                  </div>
                  <div className="truncate font-medium">{contact.value}</div>
                </div>
              </a>
            );
          })}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          className="glass space-y-4 rounded-2xl p-6"
        >
          {(["Name", "Email"] as const).map((field) => (
            <div key={field} className="group relative">
              <input
                type={field === "Email" ? "email" : "text"}
                required
                placeholder=" "
                className="peer w-full rounded-lg border border-border bg-background/40 px-4 pb-2 pt-5 text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.68_0.18_245/20%)]"
              />
              <label className="pointer-events-none absolute left-4 top-3.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary">
                {field}
              </label>
            </div>
          ))}
          <div className="group relative">
            <textarea
              required
              rows={4}
              placeholder=" "
              className="peer w-full resize-none rounded-lg border border-border bg-background/40 px-4 pb-2 pt-5 text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_oklch(0.68_0.18_245/20%)]"
            />
            <label className="pointer-events-none absolute left-4 top-3.5 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary">
              Message
            </label>
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
          >
            {sent ? "Message Sent" : "Send Message"}
            {!sent && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Chheak Lyheng. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Built with precision.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
