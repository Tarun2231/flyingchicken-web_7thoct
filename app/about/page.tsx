'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Target, Eye, Heart, TrendingUp, Users2, Award } from 'lucide-react'

const timeline = [
  {
    year: '2024',
    title: 'The Beginning',
    description: 'Flying Chicken was founded with a vision to revolutionize meat delivery in India',
  },
  {
    year: '2025',
    title: 'First 100 Vendors',
    description: 'Successfully onboarding 100 trusted meat vendors across major cities',
  },
  {
    year: '2025',
    title: 'Expansion',
    description: 'Expanding to 15+ cities with over 500 verified vendors',
  },
  {
    year: '2025',
    title: 'Going Premium',
    description: 'Launched premium subscription plans and enhanced vendor features',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    description: 'We never compromise on the quality of meat and service',
  },
  {
    icon: Users2,
    title: 'Trust & Transparency',
    description: 'Building lasting relationships with customers and vendors',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Continuously improving our platform with latest technology',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Striving for excellence in every aspect of our service',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/third.jpg"
            alt="About Flying Chicken"
            fill
            className="object-cover opacity-70"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient pb-2 leading-tight">
            About Flying Chicken
          </h1>
          <p className="text-xl text-textPrimary/80 max-w-3xl mx-auto">
            Revolutionizing meat delivery by connecting trusted vendors directly to customers
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-textPrimary/80 leading-relaxed">
                To bring farm-fresh chicken and premium meat to every household across India. We aim
                to create a seamless platform that empowers local meat vendors while ensuring
                customers receive the highest quality products at their doorstep.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-textPrimary/80 leading-relaxed">
                Technology + Trust + Taste. We envision a future where every Indian household has
                access to premium quality meat delivered fresh and fast. A platform where vendors
                thrive and customers enjoy unparalleled service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-textPrimary/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-textPrimary/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story/Timeline */}
      <section className="py-20 bg-gradient-to-br from-background to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-textPrimary/70 max-w-2xl mx-auto">
              From a small startup to India's trusted meat delivery platform
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-center mb-12"
              >
                {/* Timeline Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-24 bg-primary/30" />
                )}

                {/* Year Badge */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white font-bold z-10">
                  {item.year}
                </div>

                {/* Content Card */}
                <div className="ml-8 flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-textPrimary/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Verifying Vendors' },
              { number: '50+', label: 'Happy Customers' },
              { number: '15+', label: 'Cities Covering' },
              { number: '98%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-textPrimary/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
