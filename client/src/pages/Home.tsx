// ============================================================
// Expand Tools — Home Page
// Design: Dark Cosmos / Premium Developer Tool
// Fonts: Sora (display) + DM Sans (body)
// Accent: Instagram gradient (#833ab4 → #c13584 → #e1306c → #f77737)
// Animations: framer-motion — fade-up on scroll, staggered children
// ============================================================

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, Download, Mail, ChevronRight, Shield, Zap, Eye, FileText, X } from "lucide-react";

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
    status: "live",
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
    status: "live",
  },
];

const stats = [
  { label: "Extensions", value: "2+" },
  { label: "Active Users", value: "1K+" },
  { label: "5-Star Reviews", value: "50+" },
  { label: "Features", value: "20+" },
];

const whyItems = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Privacy First",
    desc: "No tracking, no analytics on your data, no external servers. Your preferences stay in your browser.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightweight",
    desc: "Each extension does one thing well. No bloat, no unnecessary permissions, no background processes.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Beautifully Crafted",
    desc: "Interfaces that feel native to Chrome. Thoughtful design, smooth interactions, and clear controls.",
  },
];

// Reusable scroll-triggered reveal wrapper
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#07071a] text-white overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        style={{
          borderColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent",
          background: scrolled ? "oklch(0.09 0.02 280 / 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg ig-gradient flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-bold text-xs md:text-sm font-['Sora']">E</span>
            </div>
            <span className="font-['Sora'] font-bold text-white text-sm md:text-base tracking-tight">Expand Tools</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["Home", "All Products", "Contact"].map((item) => (
              <a
                key={item}
                href={item === "Home" ? "/" : item === "Contact" ? CONTACT_URL : "#products"}
                target={item === "Contact" ? "_blank" : undefined}
                rel={item === "Contact" ? "noopener noreferrer" : undefined}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-['DM_Sans'] relative group"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px ig-gradient group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#products"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-['DM_Sans'] font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
          >
            Explore Extensions <ChevronRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu button */}
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
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
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

        {/* Mobile menu */}
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
      <section className="relative min-h-screen flex items-center justify-center pt-14 md:pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #07071a 100%)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center py-16 md:py-24 px-5 md:px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 font-['DM_Sans'] mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            Chrome Web Store — Verified Publisher
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Sora'] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-5 md:mb-6"
          >
            Enhance your<br />
            <span className="ig-gradient-text">everyday browsing</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="font-['DM_Sans'] text-base md:text-lg lg:text-xl text-white/55 max-w-sm sm:max-w-lg mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            Premium Chrome extensions built with attention to detail.
            Focused, minimal, and crafted to respect your time.
          </motion.p>

          {/* Product icon row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 mb-8 md:mb-10"
          >
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.08 }}
                className="ext-icon cursor-pointer"
                title={p.name}
              >
                <img src={p.icon} alt={p.name} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-['DM_Sans'] font-semibold text-sm shadow-lg"
              style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
            >
              <Download className="w-4 h-4" /> Explore All Extensions
            </motion.a>
            <motion.a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white/70 hover:text-white font-['DM_Sans'] font-medium text-sm border border-white/10 hover:border-white/25 transition-colors duration-200 bg-white/5 hover:bg-white/10"
            >
              <Mail className="w-4 h-4" /> Contact
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator — hidden on small screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
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
              <div className="font-['Sora'] font-bold text-2xl sm:text-3xl md:text-4xl ig-gradient-text mb-1">{s.value}</div>
              <div className="font-['DM_Sans'] text-xs sm:text-sm text-white/50">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────── */}
      <section id="products" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {/* Section header */}
          <Reveal className="mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 font-['DM_Sans'] mb-4">
              <Zap className="w-3 h-3" /> All Products
            </div>
            <h2 className="font-['Sora'] font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Tools built for<br /><span className="ig-gradient-text">real people</span>
            </h2>
            <p className="font-['DM_Sans'] text-white/50 text-base md:text-lg max-w-lg">
              Every extension is designed to solve a specific problem — no bloat, no tracking, no nonsense.
            </p>
          </Reveal>

          {/* Product cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card ig-gradient-border p-5 sm:p-6 md:p-8 group h-full"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-5 md:mb-6 gap-3">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
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
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-['DM_Sans'] text-white/60 text-sm leading-relaxed mb-5 md:mb-6">
                    {product.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                    {product.features.map((f) => (
                      <span key={f}
                        className="text-xs font-['DM_Sans'] text-white/60 bg-white/5 border border-white/[0.08] px-3 py-1 rounded-full transition-colors hover:bg-white/10 hover:text-white/80">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3">
                    <motion.a
                      href={product.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-['DM_Sans'] font-semibold"
                      style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
                    >
                      <Download className="w-3.5 h-3.5" /> Install Free
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => window.open(product.storeUrl, "_blank")}
                      className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-white/60 hover:text-white text-sm font-['DM_Sans'] border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    >
                      View on Store <ExternalLink className="w-3 h-3" />
                    </motion.button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EXPAND TOOLS ────────────────────────────── */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="container px-4 md:px-6">
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
              <Reveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card p-6 md:p-8 text-center h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl ig-gradient flex items-center justify-center mx-auto mb-4 md:mb-5 text-white"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-['Sora'] font-semibold text-base md:text-lg text-white mb-2 md:mb-3">{item.title}</h3>
                  <p className="font-['DM_Sans'] text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden p-8 sm:p-10 md:p-12 text-center"
              style={{ background: "linear-gradient(135deg, rgba(131,58,180,0.2), rgba(193,53,132,0.2), rgba(225,48,108,0.15), rgba(247,119,55,0.15))", border: "1px solid rgba(255,255,255,0.08)" }}>
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-96 h-32 md:h-40 rounded-full blur-3xl opacity-30"
                style={{ background: "linear-gradient(135deg, #833ab4, #f77737)" }} />
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center gap-1 mb-2"
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
                <h2 className="font-['Sora'] font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3 md:mb-4">
                  Ready to take control?
                </h2>
                <p className="font-['DM_Sans'] text-white/55 text-base md:text-lg mb-7 md:mb-8 max-w-sm sm:max-w-md mx-auto">
                  Join thousands of users who browse smarter with Expand Tools extensions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <motion.a
                    href="#products"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-white font-['DM_Sans'] font-semibold text-sm"
                    style={{ background: "linear-gradient(135deg, #833ab4, #c13584, #e1306c, #f77737)" }}
                  >
                    <Download className="w-4 h-4" /> Get Extensions Free
                  </motion.a>
                  <motion.a
                    href={CONTACT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-white/70 hover:text-white font-['DM_Sans'] font-medium text-sm border border-white/10 hover:border-white/25 transition-colors duration-200 bg-white/5 hover:bg-white/10"
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
            <div className="w-7 h-7 rounded-lg ig-gradient flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs font-['Sora']">E</span>
            </div>
            <span className="font-['Sora'] font-semibold text-white/80 text-sm">Expand Tools</span>
          </div>
          <p className="font-['DM_Sans'] text-xs text-white/30 order-last md:order-none">
            © {new Date().getFullYear()} Expand Tools. All extensions are free to use.
          </p>
          <div className="flex items-center gap-5 md:gap-6">
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer"
              className="font-['DM_Sans'] text-xs text-white/40 hover:text-white/70 transition-colors">
              Contact
            </a>
            <a href="https://chromewebstore.google.com" target="_blank" rel="noopener noreferrer"
              className="font-['DM_Sans'] text-xs text-white/40 hover:text-white/70 transition-colors">
              Chrome Web Store
            </a>
          </div>
        </div>
        {/* Gradient line */}
        <div className="mt-6 md:mt-8 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #833ab4, #c13584, #e1306c, #f77737, transparent)" }} />
      </footer>

    </div>
  );
}
