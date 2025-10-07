'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Check,
  X,
  Sparkles,
  Zap,
  Gift,
  TrendingUp,
  Users,
  BarChart,
  Headphones,
  Star,
} from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/year',
    description: 'Perfect for getting started',
    icon: Gift,
    color: 'from-gray-400 to-gray-600',
    features: [
      { text: '12% commission on all orders', included: true },
      { text: 'year starts from date of first order', included: true },
      { text: 'Standard visibility', included: true },
      { text: 'Basic support', included: true },
      { text: 'Priority placement', included: false },
      { text: 'Promotional campaigns', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Dedicated support', included: false },
    ],
    popular: false,
  },
  {
    name: 'Mid',
    price: '₹500',
    period: '/year',
    description: 'For growing businesses',
    icon: Zap,
    color: 'from-purple-400 to-purple-600',
    features: [
      { text: '6% commission on all orders', included: true },
      { text: 'increase in sales', included: true },
      { text: 'year starts from date of first order', included: true },
      { text: 'Enhanced listing on platform', included: true },
      { text: 'Priority visibility', included: true },
      { text: '24/7 Priority support', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Featured badge', included: true },
      { text: 'Promotional campaigns', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹1000',
    period: '/year',
    description: 'For serious vendors',
    icon: Sparkles,
    color: 'from-primary to-secondary',
    features: [
      { text: '0% commission on all orders', included: true },
      { text: 'increase in sales', included: true },
      { text: 'year starts from date of first order', included: true },
      { text: 'Premium listing on platform', included: true },
      { text: 'Highest visibility & priority', included: true },
      { text: '24/7 Priority support', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'Premium badge', included: true },
      { text: 'Promotional campaigns included', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    popular: true,
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: 'Increase Revenue',
    description: 'Reach thousands of customers and grow your business exponentially',
  },
  {
    icon: Users,
    title: 'Expand Customer Base',
    description: 'Connect with customers across multiple cities',
  },
  {
    icon: BarChart,
    title: 'Track Performance',
    description: 'Get detailed insights into your sales and customer behavior',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Our team is always ready to help you succeed',
  },
]

const comparisonFeatures = [
  { name: 'Listing on Platform', free: true, mid: true, premium: true },
  { name: 'Visibility Priority', free: 'Standard', mid: 'Priority', premium: 'Highest' },
  { name: 'Analytics', free: false, mid: 'Basic', premium: 'Advanced' },
  { name: 'Support', free: 'Basic', mid: '24/7 Priority', premium: '24/7 Priority' },
  { name: 'Featured Badge', free: false, mid: true, premium: true },
  { name: 'Promotional Campaigns', free: false, mid: false, premium: true },
  { name: 'Account Manager', free: false, mid: false, premium: true },
]

export default function PlansPage() {
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">Choose Your Plan</h1>
            <p className="text-xl text-textPrimary/80 max-w-3xl mx-auto">
              Select the perfect subscription plan to grow your meat business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'border-4 border-primary' : 'border border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="gradient-primary px-6 py-2 rounded-full text-white font-bold text-sm flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-white" />
                      <span>MOST POPULAR</span>
                    </div>
                  </div>
                )}

                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                <p className="text-textPrimary/70 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-textPrimary/70">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={feature.included ? 'text-textPrimary' : 'text-textPrimary/40'}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register-vendor"
                  className={`block w-full py-4 rounded-full font-bold text-center transition-all duration-300 ${
                    plan.popular
                      ? 'gradient-primary text-white hover:shadow-xl hover:scale-105'
                      : 'bg-gray-100 text-textPrimary hover:bg-gray-200'
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Vendors Love Us</h2>
            <p className="text-lg text-textPrimary/70 max-w-2xl mx-auto">
              Join thousands of successful vendors growing their business with Flying Chicken
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
                whileHover={{ y: -10 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-textPrimary/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-br from-background to-accent">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Feature Comparison</h2>
            <p className="text-lg text-textPrimary/70 max-w-2xl mx-auto">
              Compare features across all plans
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Feature</th>
                    <th className="px-6 py-4 text-center font-bold">Free</th>
                    <th className="px-6 py-4 text-center font-bold">Mid</th>
                    <th className="px-6 py-4 text-center font-bold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium">{feature.name}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? (
                            <Check className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-textPrimary/70">{feature.free}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.mid === 'boolean' ? (
                          feature.mid ? (
                            <Check className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-textPrimary/70">{feature.mid}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <Check className="w-6 h-6 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-textPrimary/70">{feature.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-textPrimary/80 mb-8">
              Join Flying Chicken today and start growing your business
            </p>
            <Link
              href="/register-vendor"
              className="inline-block px-10 py-4 rounded-full gradient-primary text-white font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Register as Vendor
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
