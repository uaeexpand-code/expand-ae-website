// ============================================================
// Expand Tools — Home Page
// Animations: particles, morphing blobs, 3D tilt cards,
//   magnetic buttons, split text reveals, count-up stats,
//   custom cursor, floating icons, scroll parallax
// ============================================================

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ExternalLink, Star, Download, Mail, ChevronRight,
  Shield, Zap, Eye, X,
} from "lucide-react";

import ParticleCanvas from "../components/ParticleCanvas";
import MorphingBlob from "../components/MorphingBlob";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";
import CountUp from "../components/CountUp";
import CustomCursor from "../components/CustomCursor";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663585227010/CukLp4cpqBzTmCAhXqc5uB/hero-bg-G6i7QUHidU223Lt99gAbkV.webp";
const ICON_INSTAGRAM = "/icon-instagram-focus.png";
const ICON_QUICK_NOTES = "/icon-quick-notes.png";
const CONTACT_URL = "https://forms.gle/zWcpVci3s3NZNBqt6";

const products = [
  {
    id: "instagram-focus",
    name: "Instagram Focus Mode",
    tagline: "Hide Reels, Stories & More",
    description:
      "Take control of what you see on Instagram. Hide Reels, Explore, Stories, Comments, and any nav item — with a single toggle. Includes a Session Counter and Daily Limit Warning.",
    version: "v1.6.1",
    icon: ICON_INSTAGRAM,
    features: ["Hide Reels & Stories", "Hide Explore & Comments", "Session Counter", "Daily Limit Warning"],
    storeUrl: "https://chromewebstore.google.com",
    accentColor: "#833ab4",
  },
  {
    id: "quick-notes",
    name: "Quick Notes",
    tagline: "Instant notes in your browser",
    description:
      "A lightweight, always-accessible notepad right inside Chrome. Jot down ideas, copy snippets, or keep a to-do list — without leaving your tab.",
    version: "v2.3.4",
    icon: ICON_QUICK_NOTES,
    features: ["Instant access", "Auto-save", "Markdown support", "Sync across devices"],
    storeUrl: "https://chromewebstore.google.com/detail/quick-notes/bkejgoiaknodgmbdocmmkagllnhopnge",
    accentColor: "#3b82f6",
  },
];

const stats = [
  { label: "Extensions", value: 2, suffix: "+" },
  { label: "Active Users", value: 1000, suffix: "+" },
  { label: "5-Star Reviews", value: 50, suffix: "+" },
  { label: "Features", value: 20, suffix: "+" },
];

const whyItems = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy First",
    desc: "No tracking, no analytics on your data, no external servers. Your preferences stay in your browser.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightweight",
    desc: "Each extension does one thing well. No bloat, no unnecessary permissions, no background processes.",
    gradient: "from-pink-500/20 to-orange-500/20",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Beautifully Crafted",
    desc: "Interfaces that feel native to Chrome. Thoughtful design, smooth interactions, and clear controls.",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
];

// Scroll-triggered reveal
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating icon with orbit animation
function FloatingIcon({ src, alt, size = 56, delay = 0, orbitRadius = 12, duration = 4 }: {
  src: string; alt: string; size?: number; delay?: number; orbitRadius?: number; duration?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [-orbitRadius, orbitRadius, -orbitRadius],
        rotate: [-3, 3, -3],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className="ext-icon cursor-pointer"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.18, rotate: 8 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#07071a] text-white overflow-x-hidden" style={{ cursor: "none" }}>
      <CustomCursor />

      {/* ── NAV ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        style={{
          borderColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent",
          background: scrolled ? "oklch(0.09 0.02 280 / 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-14 md:h-16">
          <a href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg ig-gradient flex items-center justify-center shadow-lg flex-shrink-0"
            >
              <span className="text-white font-bold text-xs md:text-sm font-['Sora']">E</span>
            </motion.div>
            <span className="font-['Sora'] font-bold text-white text-sm md:text-base tracking-tight">Expand Tools</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["Home", "All Products", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={item === "Home" ? "/" : item === "Contact" ? CONTACT_URL : "#products"}
                target={item === "Contact" ? "_blank" : undefined}
                rel={item === "Contact" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-['DM_Sans'] relative group"
              >
                {item}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-px ig-gradient"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.25 }}
                />
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#products"
            whileHover={{ opacity: 0.88 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-['DM_Sans'] font-medium text-white"
            style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
          >
            Explore Extensions <ChevronRight className="w-3.5 h-3.5" />
          </motion.a>

          <button
            className="md:hidden text-white/60 hover:text-white p-2 -mr-1 touch-manipulation"
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
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-white/[0.06]"
              style={{ background: "oklch(0.09 0.02 280 / 0.98)" }}
            >
              <div className="px-6 py-5 flex flex-col gap-5">
                {["Home", "All Products", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={item === "Home" ? "/" : item === "Contact" ? CONTACT_URL : "#products"}
                    target={item === "Contact" ? "_blank" : undefined}
                    rel={item === "Contact" ? "noopener noreferrer" : undefined}
                    className="text-base text-white/70 font-['DM_Sans'] hover:text-white transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-['DM_Sans'] font-semibold text-white mt-1"
                  style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
                >
                  Explore Extensions <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO ────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-14 md:pt-16 overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #07071a 100%)" }} />
        </motion.div>

        {/* Particle field */}
        <div className="absolute inset-0 z-[1]">
          <ParticleCanvas />
        </div>

        {/* Morphing blobs */}
        <MorphingBlob color1="#833ab4" color2="#c13584" size={700} className="-top-40 -left-40 z-[1] opacity-40" duration={9} />
        <MorphingBlob color1="#e1306c" color2="#f77737" size={600} className="-bottom-20 -right-20 z-[1] opacity-30" duration={11} />

        {/* Hero content */}
        <motion.div
          className="relative z-10 container text-center py-16 md:py-24 px-5 md:px-6"
          style={{ opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 font-['DM_Sans'] mb-6 md:mb-8 backdrop-blur-sm"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Chrome Web Store — Verified Publisher
          </motion.div>

          {/* Headline with split text */}
          <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-5 md:mb-6">
            <SplitText text="Enhance your" className="block text-white" delay={0.2} stagger={0.06} />
            <SplitText text="everyday browsing" className="block ig-gradient-text" delay={0.5} stagger={0.05} />
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-['DM_Sans'] text-base md:text-lg lg:text-xl text-white/55 max-w-sm sm:max-w-lg mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            Premium Chrome extensions built with attention to detail.
            Focused, minimal, and crafted to respect your time.
          </motion.p>

          {/* Floating product icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-6 mb-8 md:mb-10"
          >
            <FloatingIcon src={ICON_INSTAGRAM} alt="Instagram Focus Mode" size={56} delay={0} duration={3.5} orbitRadius={10} />
            <FloatingIcon src={ICON_QUICK_NOTES} alt="Quick Notes" size={56} delay={0.5} duration={4} orbitRadius={12} />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#products"
              whileHover={{ opacity: 0.88 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-['DM_Sans'] font-semibold text-sm shadow-lg shadow-purple-900/30"
              style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
            >
              <Download className="w-4 h-4" /> Explore All Extensions
            </motion.a>
            <motion.a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white/70 hover:text-white font-['DM_Sans'] font-medium text-sm border border-white/10 bg-white/5 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" /> Contact
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs font-['DM_Sans'] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent origin-top"
          />
        </motion.div>
      </section>

      {/* ── STATS ───────────────────────────────────────── */}
      <section className="py-10 md:py-16 border-y border-white/[0.06]" style={{ background: "oklch(0.11 0.02 280 / 0.5)" }}>
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-['Sora'] font-bold text-2xl sm:text-3xl md:text-4xl ig-gradient-text mb-1">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="font-['DM_Sans'] text-xs sm:text-sm text-white/50">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────── */}
      <section id="products" className="py-16 md:py-24 relative overflow-hidden">
        {/* Subtle background blob */}
        <MorphingBlob color1="#833ab4" color2="#3b82f6" size={500} className="top-0 right-0 z-0 opacity-10" duration={12} />

        <div className="container px-4 md:px-6 relative z-10">
          <Reveal className="mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 font-['DM_Sans'] mb-4">
              <Zap className="w-3 h-3" /> All Products
            </div>
            <h2 className="font-['Sora'] font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              <SplitText text="Tools built for" className="block" delay={0} />
              <SplitText text="real people" className="block ig-gradient-text" delay={0.2} />
            </h2>
            <p className="font-['DM_Sans'] text-white/50 text-base md:text-lg max-w-lg">
              Every extension is designed to solve a specific problem — no bloat, no tracking, no nonsense.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 0 0 1px rgba(193,53,132,0.35), 0 20px 60px rgba(131,58,180,0.18)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="glass-card h-full"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="p-5 sm:p-6 md:p-8 h-full flex flex-col">
                    {/* Card header */}
                    <div className="flex items-start justify-between mb-5 md:mb-6 gap-3">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 8 }}
                          transition={{ type: "spring", stiffness: 400, damping: 12 }}
                          className="ext-icon ext-icon-lg flex-shrink-0"
                        >
                          <img src={product.icon} alt={product.name} className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="min-w-0">
                          <h3 className="font-['Sora'] font-bold text-base sm:text-lg md:text-xl text-white mb-0.5 leading-tight">{product.name}</h3>
                          <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/50 truncate">{product.tagline}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="font-['JetBrains_Mono'] text-xs text-white/30 bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap">
                          {product.version}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-green-400 font-['DM_Sans'] whitespace-nowrap">
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          Live
                        </span>
                      </div>
                    </div>

                    <p className="font-['DM_Sans'] text-white/60 text-sm leading-relaxed mb-5 md:mb-6 flex-grow">
                      {product.description}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                      {product.features.map((f, fi) => (
                        <motion.span
                          key={f}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: fi * 0.06, duration: 0.3 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          className="text-xs font-['DM_Sans'] text-white/60 bg-white/5 border border-white/[0.08] px-3 py-1 rounded-full cursor-default"
                        >
                          {f}
                        </motion.span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3 mt-auto">
                      <motion.a
                        href={product.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ opacity: 0.88 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-['DM_Sans'] font-semibold"
                        style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
                      >
                        <Download className="w-3.5 h-3.5" /> Install Free
                      </motion.a>
                      <motion.a
                        href={product.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-white/60 hover:text-white text-sm font-['DM_Sans'] border border-white/10 bg-white/5 transition-colors duration-200"
                      >
                        View on Store <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EXPAND TOOLS ────────────────────────────── */}
      <section className="py-16 md:py-24 border-t border-white/[0.06] relative overflow-hidden">
        <MorphingBlob color1="#c13584" color2="#833ab4" size={400} className="bottom-0 left-0 z-0 opacity-15" duration={10} />

        <div className="container px-4 md:px-6 relative z-10">
          <Reveal className="text-center mb-10 md:mb-16">
            <h2 className="font-['Sora'] font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Why <span className="ig-gradient-text">Expand Tools</span>?
            </h2>
            <p className="font-['DM_Sans'] text-white/50 text-base md:text-lg max-w-md mx-auto">
              Every decision we make is guided by three principles.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 0 0 1px rgba(193,53,132,0.25), 0 16px 48px rgba(131,58,180,0.14)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="glass-card h-full"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="p-6 md:p-8 text-center h-full flex flex-col items-center">
                    {/* Animated icon container */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 12 }}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ig-gradient flex items-center justify-center mx-auto mb-4 md:mb-5 text-white relative`}
                    >
                      {/* Glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl ig-gradient opacity-0"
                        whileHover={{ opacity: 0.5, scale: 1.3 }}
                        transition={{ duration: 0.3 }}
                        style={{ filter: "blur(8px)" }}
                      />
                      {item.icon}
                    </motion.div>
                    <h3 className="font-['Sora'] font-semibold text-base md:text-lg text-white mb-2 md:mb-3">{item.title}</h3>
                    <p className="font-['DM_Sans'] text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden p-8 sm:p-10 md:p-14 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(131,58,180,0.2), rgba(193,53,132,0.2), rgba(225,48,108,0.15), rgba(247,119,55,0.15))",
                border: "1px solid rgba(255,255,255,0.08)"
              }}>
              {/* Animated glow */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-3xl"
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "linear-gradient(135deg, #833ab4, #f77737)" }}
              />

              <div className="relative z-10">
                {/* Animated stars */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center gap-1 mb-4"
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15, rotate: -30 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                <h2 className="font-['Sora'] font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3 md:mb-4">
                  <SplitText text="Ready to take control?" delay={0.1} />
                </h2>
                <p className="font-['DM_Sans'] text-white/55 text-base md:text-lg mb-7 md:mb-8 max-w-sm sm:max-w-md mx-auto">
                  Join thousands of users who browse smarter with Expand Tools extensions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <motion.a
                    href="#products"
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-['DM_Sans'] font-semibold text-sm shadow-lg shadow-purple-900/40"
                    style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
                  >
                    <Download className="w-4 h-4" /> Get Extensions Free
                  </motion.a>
                  <motion.a
                    href={CONTACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ borderColor: "rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white/70 hover:text-white font-['DM_Sans'] font-medium text-sm border border-white/10 bg-white/5 transition-colors duration-200"
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
      <footer className="border-t border-white/[0.06] py-8 md:py-10">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-7 h-7 rounded-lg ig-gradient flex items-center justify-center flex-shrink-0"
            >
              <span className="text-white font-bold text-xs font-['Sora']">E</span>
            </motion.div>
            <span className="font-['Sora'] font-semibold text-white/80 text-sm">Expand Tools</span>
          </div>
          <p className="font-['DM_Sans'] text-xs text-white/30 order-last md:order-none">
            © {new Date().getFullYear()} Expand Tools. All extensions are free to use.
          </p>
          <div className="flex items-center gap-5 md:gap-6">
            {[
              { label: "Contact", href: CONTACT_URL, external: true },
              { label: "Chrome Web Store", href: "https://chromewebstore.google.com", external: true },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-['DM_Sans'] text-xs text-white/40 hover:text-white/70 transition-colors"
                whileHover={{ y: -1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
        <motion.div
          className="mt-6 md:mt-8 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, #833ab4, #c13584, #e1306c, #f77737, transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </footer>
    </div>
  );
}
