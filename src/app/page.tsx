'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowRight, ShieldCheck, Star, Clock, 
  Wrench, Zap, Sparkles, CheckCircle2, UserCheck, CalendarCheck2, CreditCard, Quote, ChevronLeft, ChevronRight,
  Calculator, X, Tag, HelpCircle, ShieldAlert, ThumbsUp, ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle'; 

// --- SUB-COMPONENT: Live Activity Toast Ticker ---
function LiveActivityTicker() {
  const activities = [
    { name: 'Rafiq S.', location: 'Dhanmondi', service: 'AC Servicing', time: '2 mins ago' },
    { name: 'Anika M.', location: 'Gulshan', service: 'Deep Home Cleaning', time: '5 mins ago' },
    { name: 'Tanvir H.', location: 'Uttara', service: 'Plumbing Repair', time: '12 mins ago' },
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activities.length]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 max-w-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="relative flex items-center gap-3 p-3.5 pr-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-900/10"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div className="text-xs">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {activities[index].name} <span className="font-normal text-slate-500">from {activities[index].location}</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Booked <span className="text-blue-600 dark:text-blue-400 font-semibold">{activities[index].service}</span> • {activities[index].time}
            </p>
          </div>
          <button 
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENT: Instant Price Estimator Widget ---
function PriceEstimatorWidget() {
  const [service, setService] = useState<'ac' | 'cleaning' | 'plumbing'>('ac');
  const [units, setUnits] = useState(1);

  const rates = {
    ac: 1200,
    cleaning: 2500,
    plumbing: 800,
  };

  const totalEstimate = rates[service] * units;

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-blue-900/40 backdrop-blur-xl shadow-xl shadow-blue-500/5">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Calculator className="w-4 h-4" /> Instant Cost Calculator
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Estimate Your Service Cost</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-2">Select Service</label>
              <div className="grid grid-cols-3 gap-2">
                {(['ac', 'cleaning', 'plumbing'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setService(item)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold capitalize border transition-all ${
                      service === item 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20' 
                        : 'bg-slate-100/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/60'
                    }`}
                  >
                    {item === 'ac' ? 'AC Service' : item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-2">
                Quantity / Rooms: <span className="font-extrabold text-blue-600 dark:text-blue-400">{units}</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={units} 
                onChange={(e) => setUnits(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-center sm:text-right">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Estimated Total</span>
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 my-1">
              ৳ {totalEstimate.toLocaleString()}
            </div>
            <p className="text-[10px] text-slate-400 mb-4">Includes technician visit fee & diagnostic charge</p>
            <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 shadow-md">
              Book at this Price
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const heroImages = [
    { 
      src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop", 
      tag: "AC Repair & Servicing",
      rating: "4.9",
      reviewsCount: "1,240+",
      highlight: "Quick 30-min Arrival"
    },
    { 
      src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop", 
      tag: "Home Deep Cleaning",
      rating: "4.8",
      reviewsCount: "890+",
      highlight: "Eco-friendly Products"
    },
    { 
      src: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1200&auto=format&fit=crop", 
      tag: "Plumbing & Sanitization",
      rating: "5.0",
      reviewsCount: "650+",
      highlight: "No Hidden Costs"
    },
  ];

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const categories = [
    { title: 'Plumbing', icon: Wrench, color: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10', count: '120+ Experts' },
    { title: 'Electrical', icon: Zap, color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10', count: '95+ Experts' },
    { title: 'Home Cleaning', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10', count: '150+ Experts' },
    { title: 'Appliance Repair', icon: Clock, color: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10', count: '80+ Experts' },
  ];

  const steps = [
    { step: '01', title: 'Choose Service', desc: 'Select the service you need from our verified category list.', icon: Search },
    { step: '02', title: 'Book Schedule', desc: 'Pick your preferred date and time that suits your convenience.', icon: CalendarCheck2 },
    { step: '03', title: 'Get It Fixed', desc: 'An expert technician arrives at your doorstep to complete the job.', icon: UserCheck },
    { step: '04', title: 'Easy Payment', desc: 'Pay securely after service completion with full satisfaction.', icon: CreditCard },
  ];

  const reviews = [
    {
      name: 'Sarah Rahman',
      role: 'Homeowner, Gulshan',
      rating: 5,
      comment: 'Booked an AC repair technician via FixItNow. He arrived right on time and fixed the issue within an hour. Excellent service!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Tanvir Hossain',
      role: 'Apartment Owner, Dhanmondi',
      rating: 5,
      comment: 'The plumbing service was top-notch. Clear communication, no hidden fees, and very professional behavior.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Nusrat Jahan',
      role: 'Software Engineer, Uttara',
      rating: 5,
      comment: 'Deep cleaning service was incredible. They covered every nook and corner. Highly recommended for busy professionals!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const faqs = [
    { q: "Are there any hidden diagnosis fees?", a: "No. You pay the exact amount calculated or agreed upon before the service starts." },
    { q: "What if I am unhappy with the service?", a: "We provide a 7-day service warranty and 100% money-back guarantee for unfulfilled expectations." },
    { q: "Are all technicians background checked?", a: "Yes, 100% of our experts undergo strict NID verification, background checks, and practical skills assessments." }
  ];

  const tickerContent = (
    <div className="flex items-center gap-2 pr-12 text-xs font-semibold tracking-wide">
      <Tag className="w-3.5 h-3.5 text-yellow-300 dark:text-blue-400 animate-pulse shrink-0" />
      <span>
        Get <strong className="text-white underline decoration-yellow-300 underline-offset-2">10% OFF</strong> on your first booking! Code: {' '}
        <span className="bg-white/20 dark:bg-blue-950/90 border border-white/30 dark:border-blue-500/30 text-white dark:text-blue-300 px-2 py-0.5 rounded-md font-mono font-bold tracking-wider mx-1 shadow-xs">
          FIXITNOW
        </span>
        • Special Offer for Dhaka City!
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden relative pt-24 sm:pt-28">
      
      {/* 📌 FIXED HEADER WRAPPER */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-lg backdrop-blur-xl">
        
        {/* 🎨 GRADIENT DISCOUNT TICKER BAR */}
        <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 text-white border-b border-white/10 dark:border-blue-500/20 py-2.5 overflow-hidden">
          
          {/* LIMITED WIDTH CONTAINER WITH SMOOTH EDGE FADING */}
          <div className="max-w-3xl mx-auto overflow-hidden relative">
            
            {/* 🌟 Left Fade Layer  */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-indigo-700 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
            
            {/* 🌟 Right Fade Layer  */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-700 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* SLOW INFINITE TICKER TRACK */}
            <motion.div 
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} // 25s for slow & smooth movement
              className="flex whitespace-nowrap w-max"
            >
              {tickerContent}
              {tickerContent}
              {tickerContent}
            </motion.div>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>FixIt<span className="text-slate-900 dark:text-white">Now</span></span>
          </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button asChild variant="outline" className="hidden sm:inline-flex rounded-xl bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 font-semibold">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>

      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 lg:py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/30 to-purple-400/20 dark:from-blue-600/15 dark:to-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-slate-200/80 dark:border-blue-800/60 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Verified & Trusted Technicians
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                Your Ultimate Solution For <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Home Maintenance.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal">
                Book expert technicians for plumbing, electrical, cleaning, and repair work in seconds. Transparent pricing and guaranteed satisfaction.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto lg:mx-0 p-2 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/90 dark:border-white/10">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3 w-5 h-5 text-slate-400" />
                  <Input 
                    type="text" 
                    placeholder="Search service (e.g. AC Repair, Plumber)..." 
                    className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-slate-900 dark:text-white"
                  />
                </div>
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 shadow-md">
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> Instant Booking</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> Fixed Prices</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" /> 24/7 Support</span>
              </div>
            </motion.div>

            {/* HERO SLIDER CAROUSEL */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-md lg:max-w-none">
                <div className="relative h-100 sm:h-115 w-full rounded-3xl overflow-hidden shadow-2xl border border-white/60 dark:border-white/10 group">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImgIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={heroImages[activeImgIndex].src}
                        alt={heroImages[activeImgIndex].tag}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs px-3.5 py-1.5 rounded-full font-semibold shadow-md">
                    {heroImages[activeImgIndex].tag}
                  </div>

                  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                    <button 
                      onClick={() => setActiveImgIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setActiveImgIndex((prev) => (prev + 1) % heroImages.length)}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeImgIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-blue-950/10 border border-slate-200/80 dark:border-white/10 flex items-center gap-3 z-20 max-w-xs"
                  >
                    <div className="p-3 rounded-xl bg-amber-500/15 text-amber-500 shrink-0">
                      <Star className="w-6 h-6 fill-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 dark:text-white text-lg">{heroImages[activeImgIndex].rating}</span>
                        <span className="text-xs text-slate-500 font-medium">({heroImages[activeImgIndex].reviewsCount})</span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate">
                        {heroImages[activeImgIndex].highlight}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400">10,000+</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Bookings Completed</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400">500+</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Verified Experts</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400">98%</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Satisfaction Rate</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400">24/7</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">Customer Support</p>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Explore Top Categories</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Choose from our wide range of professional home repair services.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div 
                key={cat.title}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group p-6 bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl shadow-blue-500/5 border border-slate-200/80 dark:border-white/10 transition-all flex flex-col justify-between hover:border-blue-500/40 cursor-pointer"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.title}</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{cat.count}</p>
                </div>
                <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 mt-6 group-hover:translate-x-1 transition-transform">
                  View Services <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* INSTANT PRICE ESTIMATOR */}
      <PriceEstimatorWidget />

      {/* TRUST & GUARANTEE BANNER */}
      <section className="py-10 container mx-auto px-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-blue-900/30 shadow-md shadow-blue-500/5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Damaged Goods Protection</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Up to ৳10,000 coverage on accidental damages.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThumbsUp className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">7-Day Service Warranty</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Free re-visit if the issue persists within 7 days.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Background Checked Pros</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Every expert is NID & safety verified.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-slate-200/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Get your home issues resolved in 4 effortless steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-blue-500/40 transition-colors shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-xl mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="absolute top-4 right-4 text-xs font-black text-slate-300 dark:text-slate-700">{s.step}</span>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">What Our Clients Say</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Read real experiences from homeowners who trust FixItNow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl shadow-blue-500/5 transition-all relative group"
            >
              <Quote className="w-10 h-10 text-blue-500/10 absolute top-4 right-4" />
              <div className="flex items-center gap-1 text-amber-500 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                &quot;{rev.comment}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                  <Image 
                    src={rev.avatar} 
                    alt={rev.name} 
                    fill 
                    sizes="40px"
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rev.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-slate-200/40 dark:bg-slate-900/20 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" /> Got Questions?
          </div>
          <h2 className="text-2xl font-black text-center tracking-tight text-slate-900 dark:text-white mb-8">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="p-5 bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">{f.q}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION (CTA) */}
      <section className="py-16 container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Are You a Skilled Technician?</h2>
            <p className="mt-3 text-blue-100 text-base">
              Join FixItNow as a verified service provider. Expand your business and get daily job requests in your locality.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-xl bg-white text-blue-600 hover:bg-slate-100 font-bold shadow-lg shrink-0">
            <Link href="/register?type=provider">Register as Expert</Link>
          </Button>
        </div>
      </section>

      {/* 🌊 FOOTER */}
      

      {/* 🛠️ MECHANICAL GO-TO-TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/25 transition-all cursor-pointer group"
          >
            <Wrench className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOATING LIVE ACTIVITY TICKER */}
      <LiveActivityTicker />

    </div>
  );
}