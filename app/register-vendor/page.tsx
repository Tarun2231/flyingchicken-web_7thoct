'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle,
  Sparkles,
  MapPin,
  Loader2,
  CreditCard,
  Shield,
  Building2,
  Copy,
} from 'lucide-react'

const vendorSchema = z.object({
  vendorName: z.string().min(2, 'Vendor name must be at least 2 characters'),
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Pincode must be 6 digits').max(6, 'Pincode must be 6 digits'),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  gstNumber: z
    .string()
    .min(15, 'GST number must be 15 characters')
    .max(15, 'GST number must be 15 characters'),
  businessType: z.string().min(1, 'Please select a business type'),
  subscriptionPlan: z.string().min(1, 'Please select a subscription plan'),
  fssaiLicense: z.any(),
})

type VendorFormData = z.infer<typeof vendorSchema>

const steps = [
  { id: 1, title: 'Basic Information', fields: ['vendorName', 'shopName', 'phone', 'email'] },
  { id: 2, title: 'Address Details', fields: ['street', 'city', 'state', 'pincode'] },
  {
    id: 3,
    title: 'Business Details',
    fields: ['gstNumber', 'businessType', 'subscriptionPlan', 'fssaiLicense'],
  },
  {
    id: 4,
    title: 'Payment',
    fields: [],
  },
]

const businessTypes = [
  'Chicken Retailer',
  'Mutton Retailer',
  'Fish & Seafood',
  'Mixed Meat Shop',
  'Wholesale Supplier',
  'Farm Direct',
]

const plans = [
  { value: 'free', label: 'Free - ₹0/month' },
  { value: 'mid', label: 'Mid - ₹500/month' },
  { value: 'premium', label: 'Premium - ₹1000/month' },
]

export default function RegisterVendorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [vendorId, setVendorId] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    mode: 'onChange',
  })

  const latitude = watch('latitude')
  const longitude = watch('longitude')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  const detectLocation = () => {
    setIsDetectingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      setIsDetectingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6)
        const lng = position.coords.longitude.toFixed(6)
        setValue('latitude', lat)
        setValue('longitude', lng)
        setIsDetectingLocation(false)
        setLocationError(null)
      },
      (error) => {
        let errorMessage = 'Failed to detect location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        setLocationError(errorMessage)
        setIsDetectingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const nextStep = async () => {
    const currentFields = steps[currentStep - 1].fields as Array<keyof VendorFormData>
    const isValid = await trigger(currentFields)
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: VendorFormData) => {
    setIsProcessingPayment(true)

    try {
      // Simulate vendor registration API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a mock vendor ID (in real app, this would come from API)
      const mockVendorId = '68e136e61f8a0fb84f8be44f'
      setVendorId(mockVendorId)

      // Move to payment step
      setCurrentStep(4)
      setIsProcessingPayment(false)
    } catch (error) {
      console.error('Registration failed:', error)
      setIsProcessingPayment(false)
    }
  }

  const handlePayment = async () => {
    if (!vendorId) return

    // Mark as submitted to show success screen
    setIsSubmitted(true)
  }

  const getPaymentUrl = () => {
    if (!vendorId) return ''
    const subscriptionPlan = watch('subscriptionPlan')
    return `https://production-swart.vercel.app/payment/upi?vendorId=${vendorId}&subscriptionId=${subscriptionPlan}`
  }

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const bankDetails = {
    accountHolder: "PAVAN'S FLYING CHICKEN PRIVATE LIMITED",
    accountNumber: '5020 0102 0094 62',
    accountType: 'Current Account',
    bank: 'HDFC Bank',
    ifsc: 'HDFC0009860',
  }

  const upiDetails = {
    upiId: '8885747773-4@ybl',
    name: 'rudra pavan',
  }

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl font-bold mb-4">Registration Successful! 🎉</h1>
              <p className="text-lg text-textPrimary/70 mb-8">
                Thank you for registering with Flying Chicken! Our team will review your application
                and get back to you within 24-48 hours.
              </p>
              <div className="space-y-4 text-left bg-background rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-lg mb-3">What's Next?</h3>
                <ul className="space-y-2 text-textPrimary/70">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>We'll verify your documents and business details</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>You'll receive a confirmation email with login credentials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Start listing your products and reach thousands of customers</span>
                  </li>
                </ul>
              </div>
              <a
                href="/"
                className="inline-block px-8 py-4 rounded-full gradient-primary text-white font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Back to Home
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Register as Vendor
            </h1>
            <p className="text-lg text-textPrimary/80 max-w-2xl mx-auto">
              Join our platform and start growing your business today
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep >= step.id
                          ? 'gradient-primary text-white shadow-lg scale-110'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id}
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        currentStep >= step.id ? 'text-primary' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Vendor Name *</label>
                        <input
                          {...register('vendorName')}
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.vendorName ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors`}
                          placeholder="Your full name"
                        />
                        {errors.vendorName && (
                          <p className="text-red-500 text-sm mt-1">{errors.vendorName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Shop Name *</label>
                        <input
                          {...register('shopName')}
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.shopName ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors`}
                          placeholder="Your business name"
                        />
                        {errors.shopName && (
                          <p className="text-red-500 text-sm mt-1">{errors.shopName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors`}
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Email Address *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Address Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">Address Details</h2>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Street Address *</label>
                        <input
                          {...register('street')}
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.street ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors`}
                          placeholder="123 Main Street"
                        />
                        {errors.street && (
                          <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">City *</label>
                          <input
                            {...register('city')}
                            type="text"
                            className={`w-full px-4 py-3 rounded-xl border-2 ${
                              errors.city ? 'border-red-500' : 'border-gray-200'
                            } focus:border-primary outline-none transition-colors`}
                            placeholder="Mumbai"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">State *</label>
                          <input
                            {...register('state')}
                            type="text"
                            className={`w-full px-4 py-3 rounded-xl border-2 ${
                              errors.state ? 'border-red-500' : 'border-gray-200'
                            } focus:border-primary outline-none transition-colors`}
                            placeholder="Maharashtra"
                          />
                          {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Pincode *</label>
                        <input
                          {...register('pincode')}
                          type="text"
                          maxLength={6}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.pincode ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors`}
                          placeholder="400001"
                        />
                        {errors.pincode && (
                          <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
                        )}
                      </div>

                      {/* Location Detection */}
                      <div className="border-2 border-dashed border-primary/30 rounded-2xl p-6 bg-accent/20">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <label className="block text-sm font-semibold mb-1">
                              <MapPin className="w-4 h-4 inline mr-1" />
                              GPS Location (Optional)
                            </label>
                            <p className="text-xs text-textPrimary/60">
                              Help customers find you easily by sharing your exact location
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={detectLocation}
                          disabled={isDetectingLocation}
                          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isDetectingLocation
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'gradient-primary text-white hover:shadow-lg hover:scale-105'
                          }`}
                        >
                          {isDetectingLocation ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Detecting Location...</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-5 h-5" />
                              <span>Detect My Location</span>
                            </>
                          )}
                        </button>

                        {locationError && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{locationError}</p>
                          </div>
                        )}

                        {latitude && longitude && (
                          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-sm font-semibold mb-2">
                              ✓ Location Detected Successfully!
                            </p>
                            <div className="space-y-1 text-xs text-green-700">
                              <p>
                                <span className="font-semibold">Latitude:</span> {latitude}
                              </p>
                              <p>
                                <span className="font-semibold">Longitude:</span> {longitude}
                              </p>
                              <a
                                href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-semibold inline-block mt-2"
                              >
                                View on Google Maps →
                              </a>
                            </div>
                          </div>
                        )}

                        <input type="hidden" {...register('latitude')} />
                        <input type="hidden" {...register('longitude')} />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Business Details */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">Business Details</h2>

                      <div>
                        <label className="block text-sm font-semibold mb-2">GST Number *</label>
                        <input
                          {...register('gstNumber')}
                          type="text"
                          maxLength={15}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.gstNumber ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors uppercase`}
                          placeholder="22AAAAA0000A1Z5"
                        />
                        {errors.gstNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.gstNumber.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Business Type *</label>
                        <select
                          {...register('businessType')}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            errors.businessType ? 'border-red-500' : 'border-gray-200'
                          } focus:border-primary outline-none transition-colors`}
                        >
                          <option value="">Select business type</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.businessType && (
                          <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Subscription Plan *
                        </label>
                        <div className="space-y-3">
                          {plans.map((plan) => (
                            <label
                              key={plan.value}
                              className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors"
                            >
                              <input
                                {...register('subscriptionPlan')}
                                type="radio"
                                value={plan.value}
                                className="w-5 h-5 text-primary"
                              />
                              <span className="ml-3 font-medium">{plan.label}</span>
                            </label>
                          ))}
                        </div>
                        {errors.subscriptionPlan && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.subscriptionPlan.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">FSSAI License *</label>
                        <div className="relative">
                          <input
                            {...register('fssaiLicense')}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                            id="fssai-upload"
                          />
                          <label
                            htmlFor="fssai-upload"
                            className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary transition-colors"
                          >
                            <div className="text-center">
                              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                              <p className="font-medium text-textPrimary">
                                {selectedFile ? selectedFile : 'Click to upload FSSAI License'}
                              </p>
                              <p className="text-sm text-textPrimary/60 mt-1">
                                PDF, JPG, or PNG (Max 5MB)
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Payment */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                          <CreditCard className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
                        <p className="text-textPrimary/70">
                          Complete the payment below to activate your vendor account
                        </p>
                      </div>

                      {/* Selected Plan Display */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                        <h3 className="font-bold text-lg mb-4 flex items-center">
                          <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                          Selected Plan
                        </h3>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-xl capitalize">
                                {watch('subscriptionPlan')} Plan
                              </h4>
                              <p className="text-textPrimary/70">
                                {watch('subscriptionPlan') === 'free' &&
                                  '₹0/month - Basic features'}
                                {watch('subscriptionPlan') === 'mid' &&
                                  '₹500/month - Enhanced visibility'}
                                {watch('subscriptionPlan') === 'premium' &&
                                  '₹1000/month - Maximum exposure'}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {watch('subscriptionPlan') === 'free' && '₹0'}
                                {watch('subscriptionPlan') === 'mid' && '₹500'}
                                {watch('subscriptionPlan') === 'premium' && '₹1000'}
                              </div>
                              <div className="text-sm text-textPrimary/60">per month</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Options */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* PhonePe QR Payment */}
                        <div className="border-2 border-purple-200 rounded-2xl overflow-hidden bg-white shadow-lg">
                          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-purple-700 font-bold text-lg">₹</span>
                              </div>
                              <h3 className="font-bold">PhonePe Payment</h3>
                            </div>
                          </div>

                          <div className="p-6 bg-gray-50">
                            <div className="bg-white rounded-2xl p-6 shadow-md">
                              {/* PhonePe Logo and Header */}
                              <div className="text-center mb-4">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">₹</span>
                                  </div>
                                  <h2 className="text-2xl font-bold">PhonePe</h2>
                                </div>
                                <p className="text-purple-600 font-bold text-lg">ACCEPTED HERE</p>
                              </div>

                              <p className="text-center text-gray-600 mb-4">
                                Scan any QR using PhonePe App
                              </p>

                              {/* QR Code */}
                              <div className="flex justify-center mb-4">
                                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg border-2 border-purple-200 shadow-inner">
                                  <div className="w-64 h-64 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                                    <Image
                                      src="/phonepe-qr.png"
                                      alt="PhonePe QR Code"
                                      width={256}
                                      height={256}
                                      className="w-full h-full object-contain"
                                      priority
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* UPI ID - Prominent */}
                              <div className="text-center mb-4">
                                <p className="text-sm text-gray-600 mb-2">Pay to:</p>
                                <p className="font-bold text-xl mb-3">{upiDetails.name}</p>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-4 shadow-md">
                                  <p className="text-xs text-gray-600 mb-2">UPI ID</p>
                                  <div className="flex items-center justify-center space-x-3">
                                    <p className="font-mono text-lg font-bold text-purple-900">
                                      {upiDetails.upiId}
                                    </p>
                                    <button
                                      onClick={() => copyToClipboard(upiDetails.upiId, 'upi')}
                                      className="p-2 bg-white hover:bg-purple-100 rounded-lg transition-colors shadow-sm"
                                      title="Copy UPI ID"
                                    >
                                      {copiedField === 'upi' ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                      ) : (
                                        <Copy className="w-5 h-5 text-purple-600" />
                                      )}
                                    </button>
                                  </div>
                                  <p className="text-xs text-purple-700 mt-2">
                                    Click to copy and use in any UPI app
                                  </p>
                                </div>
                              </div>

                              {/* Payment Amount Display */}
                              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                <p className="text-sm text-purple-700 mb-1">Amount to Pay</p>
                                <p className="text-3xl font-bold text-purple-900">
                                  {watch('subscriptionPlan') === 'free' && '₹0'}
                                  {watch('subscriptionPlan') === 'mid' && '₹500'}
                                  {watch('subscriptionPlan') === 'premium' && '₹1000'}
                                </p>
                              </div>

                              {/* Instructions */}
                              <div className="mt-4 text-xs text-center text-gray-500">
                                <p>©2016, All rights reserved, PhonePe Internet Pvt. Ltd.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bank Transfer Details */}
                        <div className="border-2 border-green-200 rounded-2xl overflow-hidden bg-white shadow-lg">
                          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
                            <h3 className="font-bold flex items-center">
                              <Building2 className="w-5 h-5 mr-2" />
                              Bank Transfer Details
                            </h3>
                          </div>

                          <div className="p-6 space-y-4">
                            <div className="text-center mb-6">
                              <p className="text-sm text-gray-600 mb-2">Transfer payment to:</p>
                              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="font-bold text-green-800 text-lg">
                                  {bankDetails.accountHolder}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="text-xs text-gray-500">Account Number</p>
                                  <p className="font-mono font-bold">{bankDetails.accountNumber}</p>
                                </div>
                                <button
                                  onClick={() =>
                                    copyToClipboard(bankDetails.accountNumber, 'account')
                                  }
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                  <Copy
                                    className={`w-4 h-4 ${copiedField === 'account' ? 'text-green-600' : 'text-gray-400'}`}
                                  />
                                </button>
                              </div>

                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="text-xs text-gray-500">IFSC Code</p>
                                  <p className="font-mono font-bold">{bankDetails.ifsc}</p>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(bankDetails.ifsc, 'ifsc')}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                  <Copy
                                    className={`w-4 h-4 ${copiedField === 'ifsc' ? 'text-green-600' : 'text-gray-400'}`}
                                  />
                                </button>
                              </div>

                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="text-xs text-gray-500">Bank Name</p>
                                  <p className="font-bold">{bankDetails.bank}</p>
                                </div>
                              </div>

                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="text-xs text-gray-500">Account Type</p>
                                  <p className="font-bold">{bankDetails.accountType}</p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                              <p className="text-sm text-blue-800">
                                <strong>Note:</strong> After making the bank transfer, please upload
                                the payment receipt below or contact our support team for
                                verification.
                              </p>
                            </div>

                            {/* Copy All Details Button */}
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  `Account Holder: ${bankDetails.accountHolder}\nAccount Number: ${bankDetails.accountNumber}\nIFSC: ${bankDetails.ifsc}\nBank: ${bankDetails.bank}\nAccount Type: ${bankDetails.accountType}`,
                                  'all'
                                )
                              }
                              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Copy All Details</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Payment Security Info */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-1 text-sm">
                              Secure Payment
                            </h4>
                            <p className="text-xs text-blue-800">
                              Your payment is processed securely. We use industry-standard
                              encryption.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Complete Registration Button */}
                      <div className="text-center pt-4">
                        <button
                          type="button"
                          onClick={handlePayment}
                          className="w-full max-w-md mx-auto flex items-center justify-center space-x-3 px-8 py-4 rounded-full gradient-primary text-white font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                          <CheckCircle className="w-6 h-6" />
                          <span>I've Completed Payment</span>
                        </button>
                        <p className="text-xs text-textPrimary/60 mt-3">
                          Click after completing payment above
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-textPrimary hover:bg-gray-200'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center space-x-2 px-6 py-3 rounded-full gradient-primary text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : currentStep === steps.length - 1 ? (
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                        isProcessingPayment
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'gradient-primary text-white'
                      }`}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Complete Registration</span>
                          <Sparkles className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
