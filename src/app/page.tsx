'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Zap, PaintBucket, Brush, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Wrench,
    title: 'Plumbing',
    description: 'Professional plumbing services for your home',
  },
  {
    icon: Zap,
    title: 'Electrical',
    description: 'Safe and reliable electrical repairs',
  },
  {
    icon: PaintBucket,
    title: 'Painting',
    description: 'Interior and exterior painting services',
  },
  {
    icon: Brush,
    title: 'Cleaning',
    description: 'Deep cleaning and home maintenance',
  },
];

export default function HomePage() {  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-linear-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-12 w-12 text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Trusted Home Service Platform
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              Find and book qualified technicians for your home services with ease
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Browse Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="text-muted-foreground mt-2">
              Professional services at your fingertips
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-blue-500" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-blue-100 mt-2">
            Join FixItNow today and find trusted professionals
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-4">
            <Link href="/auth/register">Create Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}