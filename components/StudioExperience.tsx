"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ForgeScene = dynamic(() => import("./ForgeScene"), { ssr: false });
const ScrollArtifacts = dynamic(() => import("./ScrollArtifacts"), { ssr: false });

const services = [
  ["01", "Custom Website Design", "No page-builder fingerprints. Every screen is composed around your brand, your customer, and the action that matters."],
  ["02", "Mobile-First Build", "Most first impressions happen in one hand. We make buying, booking, browsing, calling, and contacting you feel immediate."],
  ["03", "Built for Your Business", "Stores, product catalogues, service pages, menus, memberships, lead funnels, and custom ideas—structured around how your business actually works."],
  ["04", "Search & Discovery", "A clean technical foundation helps search engines understand what you offer, where you operate, and who should find you."],
  ["05", "Commerce & Conversion Flows", "Purchases, quote requests, bookings, subscriptions, calls, and custom inquiries: every important next step is made obvious."],
  ["06", "Ongoing Support", "Your business keeps moving. Monthly care keeps the site fast, current, and useful without asking you to touch code."],
];

const websitePlans = [
  { name: "Starter Website", price: "$299", note: "For a clear, professional first presence.", items: ["Single-page website", "Mobile-responsive design", "Contact section", "Basic branding & layout", "Calls and directions", "Fast-loading structure"] },
  { name: "Business Website", price: "$599", note: "The complete foundation for a growing business.", featured: true, items: ["Multi-page custom website", "Store, service, or content pages", "Premium animations", "Mobile-first optimization", "Commerce, booking, or lead integrations", "Modern brand direction", "Enhanced user experience", "SEO-ready structure"] },
  { name: "Premium Experience", price: "Custom", note: "For brands ready to own the room.", items: ["Fully custom direction", "Advanced interactions", "Premium visual storytelling", "Campaign landing pages", "Advanced commerce or business systems", "Ongoing optimization", "High-end digital experience"] },
];

const supportPlans = [
  { name: "Basic Care", price: "$49", items: ["Small text & image updates", "Website monitoring", "Mobile checks", "Form testing", "Minor fixes", "48-hour response"] },
  { name: "Plus Management", price: "$79", featured: true, items: ["Everything in Basic", "Homepage refreshes", "Seasonal promotions", "Design adjustments", "Featured section updates", "Faster response", "Priority scheduling"] },
  { name: "Premium Partnership", price: "$149", items: ["Everything in Plus", "Unlimited reasonable updates", "Priority support", "Ongoing improvements", "Landing page additions", "Performance optimization", "Growth assistance"] },
];

const process = [
  ["01", "Discover", "We clarify the business, audience, visual direction, and the one action visitors should take first."],
  ["02", "Design", "Your site takes shape as a responsive, atmospheric system—with every page and transition earning its place."],
  ["03", "Launch", "We test, polish, connect the practical contact paths, and put the finished experience to work."],
];

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

function StudioLogo({ priority = false }: { priority?: boolean }) {
  return <span className="studio-logo"><Image src="/images/northforge-logo.png" alt="" width={1000} height={1000} priority={priority} /></span>;
}

export function StudioExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktop3D, setDesktop3D] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 760px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktop3D(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { gsap.set(".loader", { display: "none" }); return; }
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.to(".loader-mark", { scale: 1, opacity: 1, duration: .65 })
        .to(".loader-line", { scaleX: 1, duration: .8 }, "<.1")
        .to(".loader", { yPercent: -102, duration: .9, ease: "power4.inOut", delay: .15 })
        .set(".loader", { display: "none" })
        .from(".hero-kicker, .hero-title .word, .hero-copy, .hero-actions", { y: 40, opacity: 0, duration: .85, stagger: .09 }, "-=.35")
        .from(".hero-orbit", { scale: .75, opacity: 0, duration: 1.1 }, "<.2");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 54, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        gsap.from(wrap.children, { y: 44, opacity: 0, duration: .8, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: wrap, start: "top 82%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, { yPercent: -10, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
      gsap.to(".case-phone", { yPercent: -13, rotate: 1.5, ease: "none", scrollTrigger: { trigger: ".case-featured", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".process-glyph", { rotate: 180, stagger: .12, ease: "none", scrollTrigger: { trigger: ".process-steps", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.from(".service-list article h3", { x: -24, opacity: .15, stagger: .08, ease: "power2.out", scrollTrigger: { trigger: ".service-list", start: "top 82%", end: "bottom 65%", scrub: 1 } });
      gsap.from(".contact-form label", { y: 24, opacity: 0, stagger: .08, ease: "power2.out", scrollTrigger: { trigger: ".contact-form", start: "top 84%", once: true } });
      gsap.to(".ambient-orb", { xPercent: 90, yPercent: 310, rotate: 240, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.3 } });
      gsap.utils.toArray<HTMLElement>(".copy-focus").forEach((el) => {
        gsap.from(el, { y: 18, opacity: .2, filter: "blur(5px)", duration: .9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: .2 } });
    }, root);
    return () => ctx.revert();
  }, []);

  const magnetic = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = event.currentTarget; const r = el.getBoundingClientRect();
    gsap.to(el, { x: (event.clientX - r.left - r.width / 2) * .16, y: (event.clientY - r.top - r.height / 2) * .16, duration: .25 });
  };
  const resetMagnetic = (event: MouseEvent<HTMLAnchorElement>) => gsap.to(event.currentTarget, { x: 0, y: 0, duration: .55, ease: "elastic.out(1,.35)" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = new URLSearchParams();

    payload.set("form-name", "northforge-booking");
    formData.forEach((value, key) => {
      if (key !== "form-name" && typeof value === "string") payload.append(key, value);
    });

    setFormStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!response.ok) throw new Error(`Form submission failed with ${response.status}`);

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div ref={root}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="loader" aria-hidden="true"><div className="loader-mark"><span>N</span><i /></div><div className="loader-copy">Forging the first impression</div><div className="loader-track"><span className="loader-line" /></div></div>
      <div className="progress" aria-hidden="true" />
      <div className="ambient-orb" aria-hidden="true"><i /><i /></div>
      {desktop3D && <ScrollArtifacts />}

      <header className="site-header">
        <a className="brand logo-link" href="#top" aria-label="NorthForge Studio home"><StudioLogo priority /></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#services" onClick={() => setMenuOpen(false)}>Expertise</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Investment</a><a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
        </nav>
        <a className="header-cta" href="#contact">Begin a project <Arrow /></a>
        <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-copy-block">
            <p className="eyebrow hero-kicker"><span /> Independent web studio · Ontario, Canada</p>
            <h1 className="hero-title" aria-label="Make your first impression impossible to forget."><span className="word">Make your first</span><span className="word serif">impression</span><span className="word">impossible to forget.</span></h1>
            <p className="hero-copy">NorthForge builds atmospheric, fast websites for businesses of every shape—from e-commerce and restaurants to local services, professional firms, creators, and ideas that do not fit a category.</p>
            <div className="hero-actions"><a className="button primary magnetic" href="#contact" onMouseMove={magnetic} onMouseLeave={resetMagnetic}>Start a project <Arrow /></a><a className="text-link" href="#work">Explore selected work <span>↓</span></a></div>
          </div>
          <div className="hero-orbit" aria-hidden="true">{desktop3D ? <ForgeScene /> : <div className="artifact-fallback"><i /><i /><i /></div>}<span className="orbit-label orbit-a">Design with intent</span><span className="orbit-label orbit-b">Built to perform</span></div>
          <div className="hero-foot"><span>Strategy</span><span>Design</span><span>Development</span><i /><span>Scroll to enter</span></div>
        </section>

        <section className="manifesto section-pad">
          <p className="section-index">00 / Point of view</p>
          <div data-reveal><p className="manifesto-lead">A forgettable website is an expensive way to be invisible.</p><h2>We build digital places with <em>gravity</em>—the kind people stop in, understand, and remember.</h2></div>
          <aside className="copy-focus" data-reveal><p>Not decoration for decoration’s sake. Visual tension earns attention. Clear structure turns it into action. Clean code makes both feel effortless.</p><span>NorthForge principle № 01</span></aside>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading" data-reveal><div><p className="section-index">01 / Selected work</p><h2>Proof, not promises.</h2></div><p className="copy-focus">Selected work shows the craft. The same strategy scales to products, services, commerce, platforms, and ideas still taking shape.</p></div>
          <article className="case case-featured" data-reveal>
            <div className="case-visual lemon-visual"><Image src="/images/lemon-mint-event.webp" alt="Lemon Mint MTL styled catering event table" fill sizes="(max-width: 900px) 100vw, 62vw" /><div className="case-browser"><span /><span /><span /><b>lemonmintmtl.netlify.app</b></div><div className="case-phone"><Image src="/images/lemon-mint-menu.webp" alt="Lemon Mint MTL mobile menu presentation" fill sizes="220px" /></div></div>
            <div className="case-info"><div><span className="pill live">Live client work</span><span className="case-no">01</span></div><p className="case-type">Catering · Hospitality · Montreal</p><h3>Lemon Mint <em>MTL</em></h3><p>A bilingual, image-led digital home for premium halal catering and alcohol-free event experiences—built around fast inquiry paths and real portfolio work.</p><ul><li>Bilingual structure</li><li>Service architecture</li><li>Quote conversion flow</li></ul><a className="button dark" href="https://lemonmintmtl.netlify.app/en" target="_blank" rel="noreferrer">Visit live website <Arrow /></a></div>
          </article>
          <div className="concept-grid" data-stagger>
            <article className="case concept-card"><div className="concept-image"><Image data-parallax src="/images/lamasso-concept.png" alt="Lamasso Restaurant concept interior" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="concept-copy"><div><span className="pill">Concept project</span><span className="case-no">02</span></div><p className="case-type">Restaurant · Digital direction</p><h3>Lamasso Restaurant</h3><p>A cinematic restaurant direction shaped around atmosphere, menu discovery, and a reservation path that never interrupts the mood.</p><span className="palette olive" aria-label="Palette: deep olive, smoke, brass" /></div></article>
            <article className="case concept-card"><div className="concept-image"><Image data-parallax src="/images/back-road-concept.png" alt="Back Road Cafe concept interior" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="concept-copy"><div><span className="pill">Concept project</span><span className="case-no">03</span></div><p className="case-type">Cafe · Local hospitality</p><h3>Back Road Cafe</h3><p>A warm, practical cafe concept where story, directions, and everyday browsing feel considered without becoming precious.</p><span className="palette copper" aria-label="Palette: charcoal, cream, soft copper" /></div></article>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-heading light" data-reveal><div><p className="section-index">02 / Expertise</p><h2>Craft, with a job to do.</h2></div><p className="copy-focus">We take the whole path—from first impression to final click—seriously.</p></div>
          <div className="service-list" data-stagger>{services.map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p><i>↗</i></article>)}</div>
        </section>

        <section className="pricing section-pad" id="pricing">
          <div className="section-heading" data-reveal><div><p className="section-index">03 / Investment</p><h2>Clear starting points.</h2></div><p className="copy-focus">One-time website investment, typically delivered in 2–4 weeks. Scope is confirmed before work begins.</p></div>
          <div className="price-label"><span>Website packages</span><i /></div>
          <div className="pricing-grid" data-stagger>{websitePlans.map((plan) => <article className={plan.featured ? "price-card featured" : "price-card"} key={plan.name}>{plan.featured && <div className="plan-aura" aria-hidden="true"><i /><i /><i /></div>}{plan.featured && <span className="recommend">Most popular</span>}<div><p>Starting at</p><strong>{plan.price}</strong></div><h3>{plan.name}</h3><p>{plan.note}</p><ul>{plan.items.map(item => <li key={item}>{item}</li>)}</ul><a href="#contact">Choose {plan.name.replace(" Website", "")} <Arrow /></a></article>)}</div>
          <div className="price-label support-label"><span>Monthly support</span><i /></div>
          <p className="support-intro" data-reveal>Keep the site cared for after launch. <em>Plus Management is the smart default</em> for active updates without a high-touch partnership.</p>
          <div className="pricing-grid support-grid" data-stagger>{supportPlans.map((plan) => <article className={plan.featured ? "price-card featured" : "price-card"} key={plan.name}>{plan.featured && <div className="plan-aura" aria-hidden="true"><i /><i /><i /></div>}{plan.featured && <span className="recommend">Recommended</span>}<div><p>Monthly</p><strong>{plan.price}<small>/mo</small></strong></div><h3>{plan.name}</h3><ul>{plan.items.map(item => <li key={item}>{item}</li>)}</ul><a href="#contact">Select plan <Arrow /></a></article>)}</div>
        </section>

        <section className="process section-pad" id="process">
          <div className="process-title" data-reveal><p className="section-index">04 / Process</p><h2>Three acts.<br /><em>Zero mystery.</em></h2><p className="copy-focus">A focused process keeps momentum high and feedback useful. You always know what is happening and why.</p></div>
          <div className="process-steps" data-stagger>{process.map(([n, title, copy]) => <article key={n}><span>{n}</span><div className="process-glyph" aria-hidden="true"><i /><i /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="belief section-pad"><p className="section-index">05 / Why NorthForge</p><div data-reveal><span className="huge-quote">“</span><h2>Your website works the night shift. It should be your best employee, not your quietest expense.</h2></div><div className="belief-points" data-stagger><p><span>01</span>Hand-built direction, not a rearranged template.</p><p><span>02</span>Business instincts, backed by conversion clarity.</p><p><span>03</span>Direct communication with the person building it.</p><p><span>04</span>Premium restraint—no fake metrics, claims, or theatre.</p></div></section>

        <section className="contact section-pad" id="contact">
          <div className="contact-intro" data-reveal><p className="section-index">06 / Begin</p><h2>Tell us what the business should <em>feel like</em> online.</h2><p className="copy-focus">Book a free 20-minute conversation. We’ll talk through what you need, what it costs, and whether NorthForge is the right fit.</p><div className="contact-direct"><a href="mailto:northforge.design@gmail.com">northforge.design@gmail.com</a><a href="tel:+15199810659">519-981-0659</a><a href="https://www.instagram.com/northforge.web" target="_blank" rel="noreferrer">@northforge.web</a></div></div>
          <form className="contact-form" name="northforge-booking" method="POST" action="/" onSubmit={handleSubmit} data-reveal>
            <input type="hidden" name="form-name" value="northforge-booking" />
            <label><span>01 — Name</span><input name="name" required placeholder="Your name" autoComplete="name" /></label>
            <label><span>02 — Business name</span><input name="businessName" required placeholder="Your business" autoComplete="organization" /></label>
            <div className="form-row"><label><span>03 — Email</span><input type="email" name="email" required placeholder="you@business.com" autoComplete="email" /></label><label><span>04 — Phone</span><input type="tel" name="phone" placeholder="(519) 000-0000" autoComplete="tel" /></label></div>
            <div className="form-row"><label><span>05 — Business type</span><select name="businessType" required defaultValue=""><option value="" disabled>Select one</option><option>E-commerce / Online store</option><option>Restaurant / Hospitality</option><option>Local service</option><option>Professional service</option><option>Retail</option><option>Creator / Personal brand</option><option>Startup / SaaS</option><option>Nonprofit / Community</option><option>Something else</option></select></label><label><span>06 — Project type</span><select name="projectType" required defaultValue=""><option value="" disabled>Select one</option><option>E-commerce build</option><option>Business Website</option><option>Website redesign</option><option>Premium Custom Experience</option><option>Monthly Support</option><option>Not sure yet</option></select></label></div>
            <div className="form-row"><label><span>07 — Budget</span><select name="budget" required defaultValue=""><option value="" disabled>Choose range</option><option>$299–$599</option><option>$600–$1,499</option><option>$1,500–$3,000</option><option>$3,000+</option><option>Not sure yet</option></select></label><label><span>08 — Preferred meeting time</span><input name="preferredTime" placeholder="Tuesday afternoon" /></label></div>
            <label><span>09 — Message</span><textarea name="message" required placeholder="What are you building—and what needs to change?" rows={4} /></label>
            <button className="button submit" type="submit" disabled={formStatus === "submitting"} aria-busy={formStatus === "submitting"}>{formStatus === "submitting" ? "Sending brief" : formStatus === "success" ? "Message received" : "Send project brief"} <Arrow /></button>
            <div className={`form-status ${formStatus}`} role={formStatus === "error" ? "alert" : "status"} aria-live="polite">
              {formStatus === "success" && <p><strong>Your brief is in.</strong> We’ll be in touch shortly.</p>}
              {formStatus === "error" && <p><strong>Something interrupted the send.</strong> Please try again or email <a href="mailto:northforge.design@gmail.com">northforge.design@gmail.com</a>.</p>}
            </div>
            <p className="form-note">Secure Netlify form submission. No mailing list. No sales sequence.</p>
          </form>
        </section>
      </main>

      <footer><a className="brand footer-brand logo-link" href="#top" aria-label="NorthForge Studio home"><StudioLogo /></a><p>Websites with gravity.<br />Ontario, Canada · Working beyond.</p><nav aria-label="Footer navigation"><a href="#work">Work</a><a href="#services">Expertise</a><a href="#pricing">Investment</a><a href="#contact">Contact</a></nav><div><span>© 2026 NorthForge</span><a href="#top">Back to the top ↑</a></div></footer>
    </div>
  );
}
