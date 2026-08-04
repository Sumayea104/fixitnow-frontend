'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const tickerContent = (
    <div className="flex items-center gap-2 pr-12 text-xs font-semibold tracking-wide">
      <Tag className="w-3.5 h-3.5 text-yellow-300 dark:text-blue-400 animate-pulse shrink-0" />
      <span>
        Get <strong className="text-white underline decoration-yellow-300 underline-offset-2">10% OFF</strong> on your first booking! Code: {' '}
        <span className="bg-white/20 dark:bg-blue-950/90 border border-white/30 dark:border-blue-500/30 text-white dark:text-blue-300 px-2 py-0.5 rounded-md font-mono font-bold tracking-wider mx-1 shadow-xs">
          FIXITFIRST
        </span>
        • Special Offer for Dhaka City!
      </span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-lg backdrop-blur-xl">
      {/* 🎨 GRADIENT DISCOUNT TICKER BAR */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 text-white border-b border-white/10 dark:border-blue-500/20 py-2.5 overflow-hidden">
        <div className="max-w-3xl mx-auto overflow-hidden relative">
          {/* Smooth Fade Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-indigo-700 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-700 dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Slow Motion Infinite Ticker */}
          <motion.div 
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="flex whitespace-nowrap w-max"
          >
            {tickerContent}
            {tickerContent}
            {tickerContent}
          </motion.div>
        </div>
      </div>

      {/* 🧭 MAIN NAVBAR */}
      <div className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight flex items-center gap-2">
            <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>FixIt<span className="text-slate-900 dark:text-white">Now</span></span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline" className="hidden sm:inline-flex rounded-xl bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 font-semibold text-xs">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}