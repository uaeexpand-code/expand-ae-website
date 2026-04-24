// ============================================================
// Expand Tools — Home Page
// Style: WebLX-inspired — dark navy, floating pill navbar,
//   centered minimal layout, clean cards, subtle borders
// ============================================================

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ExternalLink, Star, Download, Mail, ChevronRight,
  Shield, Zap, Eye, X,
} from "lucide-react";

import ParticleCanvas from "../components/ParticleCanvas";
import MorphingBlob from "../components/MorphingBlob";
import SplitText from "../components/SplitText";
import CountUp from "../components/CountUp";
import { Link } from "wouter";
import CustomCursor from "../components/CustomCursor";
const ICON_INSTAGRAM = "/icon-instagram-focus.png";
const ICON_QUICK_NOTES = "/icon-quick-notes.png";
const CONTACT_URL = "https://forms.gle/zWcpVci3s3NZNBqt6";

const products = [
  {
    id: "instagram-focus",
    name: "Instagram Focus Mode",
    tagline: "Hide Reels, Stories & More",
    description:
      "Take control of what you see on Instagram. Hide Reels, Explore, Stories, Comments, and any nav item with a single toggle. Includes a session counter and daily limit warning.",
    version: "v1.6.1",
    icon: ICON_INSTAGRAM,
    features: ["Hide Reels & Stories", "Hide Explore & Comments", "Session Counter", "Daily Limit Warning"],
    storeUrl: "https://chromewebstore.google.com/detail/gpklldeooblbpkkhhodklkdpjklhckda?utm_source=item-share-cb",
  },
  {
    id: "quick-notes",
    name: "Quick Notes",
    tagline: "Instant notes in your browser",
    description:
      "A lightweight notepad always accessible inside Chrome. Jot down ideas, copy snippets, or keep a to-do list without ever leaving your current tab.",
    version: "v2.3.4",
    icon: ICON_QUICK_NOTES,
    features: ["Instant access", "Auto-save", "Markdown support", "Sync across devices"],
    storeUrl: "https://chromewebstore.google.com/detail/bkejgoiaknodgmbdocmmkagllnhopnge?utm_source=item-share-cb",
  },
];

const stats = [
  { label: "Active Users", value: 1000, suffix: "+", icon: <Shield className="w-5 h-5" /> },
  { label: "Monthly Installs", value: 500, suffix: "+", icon: <Download className="w-5 h-5" /> },
  { label: "5-Star Reviews", value: 50, suffix: "+", icon: <Star className="w-5 h-5" /> },
  { label: "Features", value: 20, suffix: "+", icon: <Zap className="w-5 h-5" /> },
];

const whyItems = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Privacy First",
    desc: "No tracking and no analytics on your data. Your preferences stay securely in your browser.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Lightweight",
    desc: "Each extension does one thing perfectly. No bloat, no extra permissions, and no background processes.",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Beautifully Crafted",
    desc: "Interfaces that feel native to Chrome. We focus on thoughtful design and clear controls.",
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();
  useEffect(() => { if (isInView) controls.start("visible"); }, [isInView, controls]);
  return (
    <motion.div ref={ref} initial="hidden" animate={controls}
      variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } } }}
      className={className}>
      {children}
    </motion.div>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "#products" },
  { label: "Request Feature", href: CONTACT_URL, external: true },
  { label: "Support", href: CONTACT_URL, external: true },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: "#141824", cursor: "none" }}>
      <CustomCursor />

      {/* ── FLOATING PILL NAVBAR ─────────────────────────── */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: "rgba(28, 33, 48, 0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              onClick={() => setActiveNav(link.label)}
              className="relative px-4 py-1.5 rounded-full text-sm font-['Inter'] font-medium transition-colors duration-200"
              style={{ color: activeNav === link.label ? "#fff" : "rgba(255,255,255,0.55)" }}
            >
              {activeNav === link.label && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.4)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </motion.a>
          ))}
        </motion.nav>

        {/* Mobile nav */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden flex items-center justify-between w-full max-w-sm px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(28, 33, 48, 0.97)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          <span className="font-['Geist'] font-bold text-white text-sm">Expand Tools</span>
          <button
            className="text-white/60 hover:text-white p-1 touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-5 h-0.5 bg-current" />
                    <div className="w-5 h-0.5 bg-current" />
                    <div className="w-5 h-0.5 bg-current" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden md:hidden"
            style={{ background: "rgba(28,33,48,0.98)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="px-4 py-3 rounded-xl text-sm font-['Inter'] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => { setActiveNav(link.label); setMobileMenuOpen(false); }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particle field */}
        <div className="absolute inset-0 z-[1]">
          <ParticleCanvas />
        </div>

        {/* Subtle radial glow like WebLX */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

        <MorphingBlob color1="#6366f1" color2="#8b5cf6" size={600} className="-top-40 left-1/2 -translate-x-1/2 z-[1] opacity-20" duration={10} />

        <motion.div
          className="relative z-10 container text-center px-5 md:px-6 pt-32 pb-16"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-['Inter'] mb-5"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "rgba(165,180,252,0.9)" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Chrome Web Store Verified Publisher
          </motion.div>

          {/* Headline */}
          <h1 className="font-['Geist'] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 text-white">
            <SplitText text="Take back control" className="block" delay={0.3} stagger={0.05} />
            <SplitText text="of your browser" className="block text-white/70" delay={0.6} stagger={0.04} />
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="font-['Inter'] text-base md:text-lg text-white/45 max-w-md mx-auto mb-10 leading-relaxed"
          >
            Free Chrome extensions built with attention to detail.
            Focused, minimal, and crafted to respect your focus and time.
          </motion.p>

          {/* Icon row — exactly like WebLX */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{ duration: 0.4, delay: 1.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.1 }}
                className="ext-icon"
                title={p.name}
              >
                <img src={p.icon} alt={p.name} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA — single pill button like WebLX */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.a
              href="#products"
              whileHover={{ backgroundColor: "rgba(99,102,241,0.2)", borderColor: "rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-['Inter'] font-medium text-white/80 transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Explore all products <ChevronRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-['Inter'] font-medium text-white/50 hover:text-white/70 transition-colors duration-200"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Mail className="w-4 h-4" /> Contact
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <span className="text-xs font-['Inter'] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── STATS ───────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <Reveal className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-['Inter'] mb-3"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "rgba(165,180,252,0.8)" }}>
              our impact
            </span>
            <h2 className="font-['Geist'] font-bold text-2xl md:text-3xl text-white mb-2">
              Building tools that people actually want to use
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white/60"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {s.icon}
                  </div>
                </div>
                <div className="font-['Geist'] font-bold text-2xl md:text-3xl text-white mb-1">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="font-['Inter'] text-xs text-white/40">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────── */}
      <section id="products" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Reveal className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-['Inter'] mb-4"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "rgba(165,180,252,0.8)" }}>
              extensions
            </span>
            <h2 className="font-['Geist'] font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Tools built for focus
            </h2>
            <p className="font-['Inter'] text-white/40 text-base md:text-lg max-w-md mx-auto">
              Every extension solves a specific problem. No bloat, no tracking, and absolutely no nonsense.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.35)", boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-2xl p-6 md:p-7 h-full flex flex-col"
                  style={{ background: "rgba(30,36,52,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-start justify-between mb-5 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="ext-icon ext-icon-lg flex-shrink-0"
                      >
                        <img src={product.icon} alt={product.name} className="w-full h-full object-cover" />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="font-['Geist'] font-bold text-base md:text-lg text-white mb-0.5 leading-tight">{product.name}</h3>
                        <p className="font-['Inter'] text-xs text-white/40 truncate">{product.tagline}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="font-['JetBrains_Mono'] text-xs px-2 py-0.5 rounded-md"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)" }}>
                        {product.version}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-green-400 font-['Inter']">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        /> Live
                      </span>
                    </div>
                  </div>

                  <p className="font-['Inter'] text-white/50 text-sm leading-relaxed mb-5 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((f, fi) => (
                      <motion.span key={f}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: fi * 0.05 }}
                        className="text-xs font-['Inter'] px-3 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
                      >
                        {f}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-col xs:flex-row gap-2 mt-auto">
                    <motion.a
                      href={product.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ backgroundColor: "rgba(99,102,241,0.2)", borderColor: "rgba(99,102,241,0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-['Inter'] font-medium text-white/80 transition-colors duration-200"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <Download className="w-3.5 h-3.5" /> Install Free
                    </motion.a>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-['Inter'] text-white/40 hover:text-white/60 transition-colors duration-200"
                      style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      Details <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EXPAND TOOLS ────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container px-4 md:px-6">
          <Reveal className="text-center mb-12">
            <h2 className="font-['Geist'] font-bold text-3xl sm:text-4xl text-white mb-4">
              Why Expand Tools
            </h2>
            <p className="font-['Inter'] text-white/40 text-base max-w-sm mx-auto">
              Every decision we make is guided by three core principles.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.25)" }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-2xl p-6 md:p-7 text-center h-full"
                  style={{ background: "rgba(30,36,52,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4 text-white/60"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    {item.icon}
                  </div>
                  <h3 className="font-['Geist'] font-semibold text-base text-white mb-2">{item.title}</h3>
                  <p className="font-['Inter'] text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center max-w-3xl mx-auto"
              style={{ background: "rgba(30,36,52,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <motion.div className="flex items-center justify-center gap-1 mb-5">
                  {[1,2,3,4,5].map((i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
                <h2 className="font-['Geist'] font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3">
                  Ready to upgrade your browser
                </h2>
                <p className="font-['Inter'] text-white/40 text-base mb-8 max-w-sm mx-auto">
                  Join thousands of people who browse smarter and faster with Expand Tools.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <motion.a
                    href="#products"
                    whileHover={{ backgroundColor: "rgba(99,102,241,0.2)", borderColor: "rgba(99,102,241,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-['Inter'] font-medium text-white/80 transition-colors duration-200"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <Download className="w-4 h-4" /> Get Extensions Free
                  </motion.a>
                  <motion.a
                    href={CONTACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-['Inter'] text-white/40 hover:text-white/60 transition-colors duration-200"
                    style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <Mail className="w-4 h-4" /> Contact
                  </motion.a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="py-8 md:py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
              <span className="text-indigo-300 font-bold text-xs font-['Geist']">E</span>
            </div>
            <span className="font-['Geist'] font-semibold text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Expand Tools</span>
          </div>
          <p className="font-['Inter'] text-xs order-last md:order-none" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} Expand Tools. All extensions are free to use.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Contact", href: CONTACT_URL, external: true },
              { label: "Chrome Web Store", href: "https://chromewebstore.google.com", external: true },
            ].map((link) => (
              <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ color: "rgba(255,255,255,0.6)" }}
                className="font-['Inter'] text-xs transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}>
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
