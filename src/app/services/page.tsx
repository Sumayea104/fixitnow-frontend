'use client';

import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { useServices, Service } from '@/features/services/hooks/useServices';
import { useCategories } from '@/features/categories/hooks/useCategories';

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');

  const { data: servicesData, isLoading: isLoadingServices } = useServices({
    search: search || undefined,
    category: category || undefined,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    rating: rating ? parseFloat(rating) : undefined,
  });

  const { data: categoriesData } = useCategories();

  const services: Service[] = (servicesData as unknown as { data: Service[] })?.data || (servicesData as unknown as Service[]) || [];
  const categories: Category[] = (categoriesData as unknown as Category[]) || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setRating('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Services</h1>
        <p className="text-muted-foreground">
          Find the perfect service for your needs
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </form>

        <div className="flex flex-wrap gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat: Category) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-25"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-25"
            />
          </div>

          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
              <SelectItem value="4">4.0+</SelectItem>
              <SelectItem value="3.5">3.5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Services Grid */}
      {isLoadingServices ? (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found</p>
          <Button variant="outline" className="mt-4" onClick={handleReset}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service: Service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}