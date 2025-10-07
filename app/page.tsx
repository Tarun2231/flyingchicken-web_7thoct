'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Clock, Users, Shield, Star, ChevronRight } from 'lucide-react'

const benefits = [
  {
    icon: Award,
    title: 'Quality Meat',
    description: 'Premium cuts from certified vendors with FSSAI compliance',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Fresh meat delivered to your doorstep within hours',
  },
  {
    icon: Users,
    title: 'Trusted Vendors',
    description: 'Verified sellers with proven track records',
  },
  {
    icon: Shield,
    title: 'Easy Onboarding',
    description: 'Simple registration process for vendors to join our platform',
  },
]

const featuredVendors = [
  // Featured vendors will be added here one by one with permission
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Home Chef',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    comment:
      'The quality of meat is exceptional! Fresh delivery every time. Flying Chicken has become my go-to platform.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Restaurant Owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    comment:
      'As a vendor, this platform helped me reach thousands of customers. The premium plan is worth every penny!',
    rating: 5,
  },
  {
    name: 'Anita Desai',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    comment:
      'Fast delivery, premium quality, and amazing customer service. Highly recommended for meat lovers!',
    rating: 5,
  },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/second.jpg"
            alt="Fresh chicken and meat"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Fresh Chicken, Faster Delivery 🍗
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-10"
          >
            Connecting premium meat vendors to your doorstep
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/vendors"
              className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Order Now</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register-vendor"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition-all duration-300"
            >
              Join as Vendor
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-textPrimary/70 max-w-2xl mx-auto">
              We bring together the best meat vendors and customers on a single platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/10"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6 mx-auto">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{benefit.title}</h3>
                <p className="text-textPrimary/70 text-center">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Vendors</h2>
            <p className="text-lg text-textPrimary/70 max-w-2xl mx-auto">
              Discover our top-rated meat and chicken vendors
            </p>
          </motion.div>

          {/* Half-half layout for image and text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            {/* Image side - takes up half */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/fourth.jpeg"
                  alt="Featured vendors showcase"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Text side - takes up half */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1 flex items-center"
            >
              <div className="w-full">
                <p className="text-lg lg:text-xl text-textPrimary/80 leading-relaxed">
                  At Flying Chicken, our vendors are not just partners — they're the backbone of our
                  journey. We believe in building trust through transparency, fairness, and mutual
                  growth. Every vendor who joins us becomes part of our family, sharing our
                  commitment to quality, customer satisfaction, and success.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Vendor cards below in full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVendors.map((vendor, index) => (
                <motion.div
                  key={vendor.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48">
                    <Image src={vendor.image} alt={vendor.name} fill className="object-cover" />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        vendor.plan === 'Premium'
                          ? 'bg-primary text-white'
                          : 'bg-purple-400 text-white'
                      }`}
                    >
                      {vendor.plan}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
                    <p className="text-textPrimary/70 text-sm mb-3">{vendor.location}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <span className="font-semibold">{vendor.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Link
              href="/vendors"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full gradient-primary text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>View All Vendors</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-background to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What People Say</h2>
            <p className="text-lg text-textPrimary/70 max-w-2xl mx-auto">
              Trusted by thousands of customers and vendors across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-textPrimary/80 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-textPrimary/70">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=1920&h=600&fit=crop"
            alt="Join our platform"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Network of Trusted Meat Vendors
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Grow your business and reach thousands of customers across India
          </p>
          <Link
            href="/register-vendor"
            className="inline-flex items-center space-x-2 px-10 py-5 rounded-full bg-white text-secondary font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>Register Now</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
