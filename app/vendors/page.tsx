'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Star, Filter, ChevronRight } from 'lucide-react'

const allVendors = [
  // Vendors will be added here one by one with permission
]

const cities = [
  'All',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
]

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All')

  const filteredVendors = allVendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = selectedCity === 'All' || vendor.city === selectedCity
    return matchesSearch && matchesCity
  })

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Discover Premium Vendors
            </h1>
            <p className="text-xl text-textPrimary/80 max-w-3xl mx-auto">
              Find trusted chicken and meat vendors in your city
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-textPrimary/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vendors by name or speciality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-primary/20 focus:border-primary outline-none transition-colors text-lg"
              />
            </div>

            {/* City Filter */}
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="w-5 h-5 text-textPrimary/60" />
              <span className="text-textPrimary/60 font-medium">Filter by city:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCity === city
                      ? 'gradient-primary text-white shadow-lg'
                      : 'bg-white text-textPrimary border-2 border-gray-200 hover:border-primary'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredVendors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-textPrimary/60">
                No vendors found matching your criteria
              </p>
            </motion.div>
          ) : (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                <p className="text-lg text-textPrimary/70">
                  Showing <span className="font-bold text-primary">{filteredVendors.length}</span>{' '}
                  vendors
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVendors.map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={vendor.image}
                        alt={vendor.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                          vendor.plan === 'Premium'
                            ? 'bg-primary text-white'
                            : vendor.plan === 'Mid'
                              ? 'bg-purple-400 text-white'
                              : 'bg-gray-600 text-white'
                        }`}
                      >
                        {vendor.plan}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {vendor.name}
                      </h3>

                      <div className="flex items-center text-textPrimary/70 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vendor.location}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-primary text-primary" />
                          <span className="font-semibold">{vendor.rating}</span>
                          <span className="text-textPrimary/60 text-sm">({vendor.reviews})</span>
                        </div>
                        <span className="text-sm text-textPrimary/70">{vendor.speciality}</span>
                      </div>

                      <button className="w-full py-2 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 lg:px-8 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6">Want to be a Vendor?</h2>
            <p className="text-lg text-textPrimary/80 mb-8">
              Join our platform and reach thousands of customers across India
            </p>
            <Link
              href="/register-vendor"
              className="inline-flex items-center space-x-2 px-10 py-4 rounded-full gradient-primary text-white font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span>Register Now</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
