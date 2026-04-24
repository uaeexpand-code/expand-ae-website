// Expand Tools — Product Detail Page
// Style: WebLX-inspired layout — icon + title left, feature showcase right,
//   stats row, features grid, other extensions at bottom
// ============================================================

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Download, Star, Shield, Zap, Eye, ChevronLeft,
  ExternalLink, Check, Users, MessageSquare, Package,
} from "lucide-react";
import { Link, useParams } from "wouter";
import ParticleCanvas from "../components/ParticleCanvas";
import MorphingBlob from "../components/MorphingBlob";
import CustomCursor from "../components/CustomCursor";

const ICON_INSTAGRAM = "/icon-instagram-focus.png";
const ICON_QUICK_NOTES = "/icon-quick-notes.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/#products" },
  { label: "Request Feature", href: "https://forms.gle/zWcpVci3s3NZNBqt6" },
  { label: "Support", href: "https://forms.gle/zWcpVci3s3NZNBqt6" },
];

const products: Record<string, {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  version: string;
  icon: string;
  storeUrl: string;
  users: string;
  reviews: string;
  rating: string;
  features: { icon: React.ReactNode; title: string; desc: string }[];
  tags: string[];
  color1: string;
  color2: string;
}> = {
  "instagram-focus": {
    id: "instagram-focus",
    name: "Instagram Focus Mode",
    tagline: "Hide Reels, Stories & More",
    description:
      "Take control of what you see on Instagram. Hide Reels, Explore, Stories, Comments, and any nav item with a single toggle.",
    longDescription:
      "Instagram is designed to keep you scrolling. Instagram Focus Mode puts you back in control. With a single toggle you can hide Reels, Explore, Stories, Comments, and any navigation item you don't need. It also includes a session counter so you can see exactly how long you've been on the site, and a daily limit warning to help you stay on track.",
    version: "v1.6.1",
    icon: ICON_INSTAGRAM,
    storeUrl: "https://chromewebstore.google.com/detail/gpklldeooblbpkkhhodklkdpjklhckda?utm_source=item-share-cb",
    users: "500+",
    reviews: "20+",
    rating: "5.0",
    tags: ["Instagram", "Focus", "Productivity", "Privacy"],
    color1: "#833ab4",
    color2: "#fd1d1d",
    features: [
      {
        icon: <Eye className="w-5 h-5" />,
        title: "Hide Reels & Stories",
        desc: "Remove the most distracting parts of Instagram in one click. Reels and Stories disappear completely.",
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Hide Explore & Comments",
        desc: "Block the Explore tab and comment sections to keep your feed clean and distraction-free.",
      },
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Session Counter",
        desc: "See exactly how much time you've spent on Instagram during your current session.",
      },
      {
        icon: <MessageSquare className="w-5 h-5" />,
        title: "Daily Limit Warning",
        desc: "Set a daily time limit and get a warning when you've been on Instagram too long.",
      },
      {
        icon: <Package className="w-5 h-5" />,
        title: "Single Toggle Control",
        desc: "Everything is controlled from one simple popup. No complicated settings or menus.",
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: "No Account Required",
        desc: "Works instantly after installation. No sign-up, no account, and no data collection.",
      },
    ],
  },
  "quick-notes": {
    id: "quick-notes",
    name: "Quick Notes",
    tagline: "Instant notes in your browser",
    description:
      "A lightweight notepad always accessible inside Chrome. Jot down ideas, copy snippets, or keep a to-do list without ever leaving your current tab.",
    longDescription:
      "Quick Notes is the notepad that lives inside your browser. Click the extension icon and a clean, minimal notepad opens instantly. Everything you type is saved automatically, so you never lose a thought. Whether you're copying a snippet, drafting a quick message, or keeping a running to-do list, Quick Notes is always one click away.",
    version: "v2.3.4",
    icon: ICON_QUICK_NOTES,
    storeUrl: "https://chromewebstore.google.com/detail/bkejgoiaknodgmbdocmmkagllnhopnge?utm_source=item-share-cb",
    users: "1000+",
    reviews: "30+",
    rating: "5.0",
    tags: ["Notes", "Productivity", "Lightweight", "Auto-save"],
    color1: "#2563eb",
    color2: "#7c3aed",
    features: [
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Instant Access",
        desc: "One click opens your notepad. No loading screens, no splash pages, just your notes.",
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: "Auto-save",
        desc: "Everything you type is saved automatically. Close the popup and your notes are still there.",
      },
      {
        icon: <Eye className="w-5 h-5" />,
        title: "Markdown Support",
        desc: "Write in Markdown and see it rendered in real time. Headers, bold, lists and more.",
      },
      {
        icon: <Package className="w-5 h-5" />,
        title: "Sync Across Devices",
        desc: "Your notes follow you across every Chrome browser you're signed into.",
      },
      {
        icon: <MessageSquare className="w-5 h-5" />,
        title: "Minimal Interface",
        desc: "A clean, distraction-free editor. Nothing gets in the way of your thinking.",
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: "Completely Free",
        desc: "No premium tier, no limits, no ads. Quick Notes is free for everyone, forever.",
      },
    ],
  },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Product() {
  const params = useParams<{ id: string }>();
  const product = products[params.id ?? ""];
  const [activeNav, setActiveNav] = useState("All Products");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#141824" }}>
        <div className="text-center">
          <p className="text-white/40 font-['Inter'] mb-4">Extension not found</p>
          <Link href="/" className="text-indigo-400 font-['Inter'] hover:text-indigo-300 transition-colors">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const otherProducts = Object.values(products).filter(p => p.id !== product.id);

  return (
    <div className="min-h-screen" style={{ background: "#141824" }}>
      <CustomCursor />
      <ParticleCanvas />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        {/* Desktop */}
        <motion.div
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
          <Link href="/" className="flex items-center gap-2 px-3 py-1.5 mr-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-['Geist'] font-bold text-sm">E</span>
          </Link>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveNav(link.label)}
              className="relative px-4 py-1.5 rounded-full text-sm font-['Inter'] font-medium transition-colors duration-200"
              style={{ color: activeNav === link.label ? "#fff" : "rgba(255,255,255,0.45)" }}
            >
              {activeNav === link.label && (
                <motion.span
                  layoutId="pill-product"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.3)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </motion.div>

        {/* Mobile */}
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
          <Link href="/" className="font-['Geist'] font-bold text-white text-sm">Expand Tools</Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span className="w-4 h-px bg-white/60 block" />
            <span className="w-4 h-px bg-white/60 block" />
          </button>
        </motion.div>

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
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-['Inter'] font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 md:pt-36 md:pb-20">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <MorphingBlob color1={product.color1} color2={product.color2} size={500} className="-top-20 left-1/2 -translate-x-1/2 z-[1] opacity-15" duration={10} />

          {/* Back link */}
          <Reveal>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-['Inter'] text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              All extensions
            </Link>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
            {/* Left: info */}
            <div>
              <Reveal delay={0.1}>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={product.icon}
                    alt={product.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex-shrink-0"
                    style={{ imageRendering: "crisp-edges" }}
                  />
                  <div>
                    <h1 className="font-['Geist'] font-bold text-2xl md:text-3xl text-white leading-tight">
                      {product.name}
                    </h1>
                    <p className="font-['Inter'] text-white/40 text-sm mt-0.5">{product.tagline}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <p className="font-['Inter'] text-white/55 text-base leading-relaxed mb-6">
                  {product.longDescription}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-['Inter'] font-medium"
                      style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "rgba(165,180,252,0.85)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={product.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-['Inter'] font-semibold text-sm text-white transition-opacity hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    <Download className="w-4 h-4" />
                    Install Free
                  </a>
                  <a
                    href={product.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-['Inter'] font-medium text-sm text-white/60 hover:text-white transition-colors"
                    style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Chrome Store
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right: visual card */}
            <Reveal delay={0.2}>
              <div
                className="relative rounded-2xl overflow-hidden p-8 flex flex-col items-center justify-center min-h-[280px] md:min-h-[340px]"
                style={{
                  background: `linear-gradient(135deg, ${product.color1}22, ${product.color2}22)`,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${product.color1}18 0%, transparent 70%)` }}
                />
                <motion.img
                  src={product.icon}
                  alt={product.name}
                  className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-3xl mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ imageRendering: "crisp-edges", boxShadow: `0 24px 64px ${product.color1}55` }}
                />
                <div className="relative z-10 text-center">
                  <p className="font-['Geist'] font-bold text-white text-xl mb-1">{product.name}</p>
                  <p className="font-['Inter'] text-white/40 text-sm">{product.tagline}</p>
                  <span
                    className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] font-medium"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}
                  >
                    {product.version}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-10 md:py-14"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-6 md:gap-10 text-center">
            {[
              { icon: <Users className="w-4 h-4" />, value: product.users, label: "Active users" },
              { icon: <MessageSquare className="w-4 h-4" />, value: product.reviews, label: "Reviews" },
              { icon: <Star className="w-4 h-4" />, value: product.rating, label: "Rating" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-5 md:p-6"
                  style={{ background: "rgba(30,36,52,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-400"
                    style={{ background: "rgba(99,102,241,0.12)" }}>
                    {s.icon}
                  </div>
                  <p className="font-['Geist'] font-bold text-2xl md:text-3xl text-white mb-0.5">{s.value}</p>
                  <p className="font-['Inter'] text-white/35 text-xs">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-['Inter'] mb-4"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "rgba(165,180,252,0.8)" }}
            >
              features
            </span>
            <h2 className="font-['Geist'] font-bold text-3xl sm:text-4xl text-white mb-3">
              Everything it does
            </h2>
            <p className="font-['Inter'] text-white/35 text-base max-w-sm mx-auto">
              Simple on the surface. Powerful underneath.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {product.features.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.3)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="rounded-2xl p-5 md:p-6 h-full"
                  style={{ background: "rgba(30,36,52,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 text-indigo-400"
                    style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.18)" }}>
                    {feat.icon}
                  </div>
                  <h3 className="font-['Geist'] font-semibold text-white text-base mb-2">{feat.title}</h3>
                  <p className="font-['Inter'] text-white/40 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALL CTA ── */}
      <section className="py-10 md:py-16">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <Reveal>
            <div
              className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-center"
              style={{ background: "rgba(30,36,52,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
              />
              <div className="relative z-10">
                <img src={product.icon} alt={product.name} className="w-14 h-14 rounded-2xl mx-auto mb-5" />
                <h2 className="font-['Geist'] font-bold text-2xl sm:text-3xl text-white mb-3">
                  Ready to install
                </h2>
                <p className="font-['Inter'] text-white/40 text-sm mb-7 max-w-xs mx-auto">
                  Free, lightweight, and ready in seconds. No account needed.
                </p>
                <a
                  href={product.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-['Inter'] font-semibold text-sm text-white transition-opacity hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  <Download className="w-4 h-4" />
                  Add to Chrome for free
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OTHER EXTENSIONS ── */}
      <section className="py-14 md:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-['Inter'] mb-4"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "rgba(165,180,252,0.8)" }}
            >
              our products
            </span>
            <h2 className="font-['Geist'] font-bold text-2xl sm:text-3xl text-white">
              Other extensions
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {otherProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.3)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="rounded-2xl p-6 flex flex-col"
                  style={{ background: "rgba(30,36,52,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img src={p.icon} alt={p.name} className="w-12 h-12 rounded-xl flex-shrink-0" />
                    <div>
                      <p className="font-['Geist'] font-semibold text-white text-sm">{p.name}</p>
                      <p className="font-['Inter'] text-white/35 text-xs">{p.tagline}</p>
                    </div>
                  </div>
                  <p className="font-['Inter'] text-white/40 text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
                  <div className="flex gap-2">
                    <a
                      href={p.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-['Inter'] font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Install
                    </a>
                    <Link
                      href={`/products/${p.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-['Inter'] font-medium text-white/50 hover:text-white transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      Details
                    </Link>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 md:py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container px-4 md:px-6 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-['Geist'] font-bold text-xs">E</span>
            <span className="font-['Geist'] font-semibold text-white/70 text-sm">Expand Tools</span>
          </div>
          <p className="font-['Inter'] text-white/25 text-xs text-center">
            Free Chrome extensions built with care. No tracking, no bloat.
          </p>
          <Link href="/" className="font-['Inter'] text-white/30 text-xs hover:text-white/60 transition-colors">
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
