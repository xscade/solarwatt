import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sun, Zap, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import { ADDRESS, EMAIL_ADDRESS, PHONE_NUMBER, PHONE_NUMBER_2 } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', bill: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', bill: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light min-h-screen">
      {/* Hero Header */}
      <div className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get In Touch</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Ready to switch to solar? Fill out the form below and our experts will get back to you within 24 hours with a customized quote.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            
            {/* Form Section - Takes 3 columns */}
            <div className="lg:col-span-3 bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Send size={20} className="text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-dark">Request Free Quote</h2>
              </div>
              <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">Get a personalized solar solution for your home or business.</p>

              {isSuccess ? (
                <div className="bg-green-50 text-green-700 p-8 rounded-2xl border border-green-200 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-green-600 mb-4">Your request has been submitted successfully. Our solar experts will contact you within 24 hours.</p>
                  <button onClick={() => setIsSuccess(false)} className="text-sm underline hover:text-green-800">Submit another request</button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mb-6">
                      <p className="font-medium">{error}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                        placeholder="Enter your full name"
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <input 
                          required
                          type="tel" 
                          className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={e => setFormState({...formState, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Electricity Bill (₹) *</label>
                        <input 
                          required
                          type="number" 
                          className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                          placeholder="e.g. 3000"
                          value={formState.bill}
                          onChange={e => setFormState({...formState, bill: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white resize-none"
                        placeholder="Tell us about your requirements, roof type, or any questions..."
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full py-4 text-lg" isLoading={isSubmitting}>
                      Get Free Quote
                    </Button>
                    <p className="text-center text-xs text-gray-400">
                      By submitting, you agree to our Privacy Policy. We'll never share your data.
                    </p>
                  </form>
                </>
              )}

              {/* Trust Indicators */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div className="text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <Sun size={16} className="text-primary" />
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium">Free Site Survey</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <Zap size={16} className="text-secondary" />
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium">24hr Response</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                      <Shield size={16} className="text-green-600" />
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium">No Obligation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6 order-1 lg:order-2">
              {/* Contact Info Card */}
              <div className="bg-secondary text-white rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h3 className="text-xl font-bold mb-6 relative z-10">Contact Information</h3>
                <ul className="space-y-5 relative z-10">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-200 uppercase text-xs mb-1">Office Address</p>
                      <p className="text-sm leading-relaxed">{ADDRESS}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-200 uppercase text-xs mb-1">Phone</p>
                      <a href={`tel:${PHONE_NUMBER}`} className="block text-sm hover:text-primary transition-colors">{PHONE_NUMBER}</a>
                      <a href={`tel:${PHONE_NUMBER_2}`} className="block text-sm hover:text-primary transition-colors">{PHONE_NUMBER_2}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-200 uppercase text-xs mb-1">Email</p>
                      <a href={`mailto:${EMAIL_ADDRESS}`} className="text-sm hover:text-primary transition-colors break-all">{EMAIL_ADDRESS}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-200 uppercase text-xs mb-1">Working Hours</p>
                      <p className="text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      <p className="text-sm text-blue-200">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
                <div className="p-3 md:p-4 border-b border-gray-100">
                  <h4 className="font-bold text-dark flex items-center gap-2 text-sm md:text-base">
                    <MapPin size={16} className="text-primary" />
                    Find Us Here
                  </h4>
                </div>
                <div className="h-48 md:h-64">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.3587228284696!2d79.1064667!3d21.09826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bfe29a889b7d%3A0xafc369e6a15381c3!2sSolarwatt%20Energy!5e0!3m2!1sen!2sin!4v1766139431078!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Solarwatt Energy Location"
                  ></iframe>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-primary to-orange-500 rounded-2xl md:rounded-3xl p-4 md:p-6 text-white">
                <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Why Choose Us?</h4>
                <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 md:gap-4">
                  <div className="bg-white/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center backdrop-blur-sm">
                    <p className="text-lg md:text-2xl font-extrabold">500+</p>
                    <p className="text-[9px] md:text-xs text-orange-100">Customers</p>
                  </div>
                  <div className="bg-white/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center backdrop-blur-sm">
                    <p className="text-lg md:text-2xl font-extrabold">5+</p>
                    <p className="text-[9px] md:text-xs text-orange-100">Years Exp</p>
                  </div>
                  <div className="bg-white/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center backdrop-blur-sm">
                    <p className="text-lg md:text-2xl font-extrabold">25</p>
                    <p className="text-[9px] md:text-xs text-orange-100">Yr Warranty</p>
                  </div>
                  <div className="bg-white/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center backdrop-blur-sm">
                    <p className="text-lg md:text-2xl font-extrabold">MNRE</p>
                    <p className="text-[9px] md:text-xs text-orange-100">Approved</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
