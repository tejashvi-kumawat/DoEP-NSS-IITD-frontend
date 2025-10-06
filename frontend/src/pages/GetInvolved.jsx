// src/pages/GetInvolved.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const GetInvolved = () => {
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interests: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contributionAreas = [
    { id: 'teaching', label: 'Teaching & Mentoring' },
    { id: 'content', label: 'Content Creation' },
    { id: 'tech', label: 'Technical Development' },
    { id: 'design', label: 'Design & Media' },
    { id: 'management', label: 'Project Management' },
    { id: 'outreach', label: 'Community Outreach' }
  ];

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const subject = encodeURIComponent('NSS IITD - Volunteer Application');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nAreas of Interest:\n${formData.interests.map(id => 
        contributionAreas.find(area => area.id === id)?.label
      ).join(', ')}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:nss@iitd.ac.in?subject=${subject}&body=${body}`;
    
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-700 via-emerald-800 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(30deg, transparent 12%, rgba(255, 255, 255, .05) 12%, rgba(255, 255, 255, .05) 13%, transparent 13%, transparent 87%, rgba(255, 255, 255, .05) 87%, rgba(255, 255, 255, .05) 88%, transparent 88%), linear-gradient(150deg, transparent 12%, rgba(255, 255, 255, .05) 12%, rgba(255, 255, 255, .05) 13%, transparent 13%, transparent 87%, rgba(255, 255, 255, .05) 87%, rgba(255, 255, 255, .05) 88%, transparent 88%)',
              backgroundSize: '80px 140px'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 md:py-28 relative">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block mb-6">
                <div className="text-sm font-semibold tracking-wider uppercase text-emerald-300 border-l-4 border-emerald-400 pl-4">
                  Partnership Opportunities
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Shape the Future
                <span className="block text-emerald-300">of Education</span>
              </h1>
              
              <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
                Join a community of changemakers dedicated to transforming educational outcomes through strategic initiatives and sustainable impact.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Financial Support Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                
                <div className="p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Financial Support</h2>
                      <p className="text-gray-600 text-lg">Fuel educational initiatives through strategic contributions</p>
                    </div>
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { amount: '₹500', impact: 'Educational supplies for 5 students', tier: 'Bronze', popular: false },
                      { amount: '₹2,000', impact: 'Fund a community workshop', tier: 'Silver', popular: true },
                      { amount: '₹5,000', impact: 'Support a full project cycle', tier: 'Gold', popular: false },
                      { amount: 'Custom', impact: 'Tailored contribution amount', tier: 'Platinum', popular: false }
                    ].map((option, index) => (
                      <div 
                        key={index}
                        className={`relative group border-2 rounded-xl p-5 transition-all duration-300 cursor-pointer ${
                          option.popular 
                            ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                            : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50'
                        }`}
                      >
                        {option.popular && (
                          <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Most Popular
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-gray-900">{option.amount}</span>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                            option.popular 
                              ? 'bg-emerald-200 text-emerald-800' 
                              : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-200 group-hover:text-emerald-800'
                          }`}>
                            {option.tier}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{option.impact}</p>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="mailto:nss@iitd.ac.in?subject=Donation%20Inquiry%20-%20NSS%20IITD&body=I%20would%20like%20to%20make%20a%20donation%20to%20support%20NSS%20IITD%20initiatives.%0A%0APreferred%20Amount%3A%20%0AContact%20Information%3A%20"
                    className="block w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center group"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span>Proceed to Donation</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>

              {/* Volunteer Engagement Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <div className="h-2 bg-gradient-to-r from-gray-700 to-gray-900"></div>
                
                <div className="p-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Volunteer Engagement</h2>
                      <p className="text-gray-600 text-lg">Contribute expertise and drive meaningful change</p>
                    </div>
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {contributionAreas.map((area) => (
                      <div 
                        key={area.id}
                        className="border-2 border-gray-200 rounded-xl p-4 hover:border-gray-700 hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{area.label}</span>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowVolunteerForm(true);
                      setTimeout(() => {
                        document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Application</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Application Form */}
        {showVolunteerForm && (
          <div id="volunteer-form" className="bg-white py-20 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Form</h2>
                  <p className="text-xl text-gray-600">Share your background and areas of expertise</p>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:ring-0 transition-colors outline-none bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:ring-0 transition-colors outline-none bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:ring-0 transition-colors outline-none bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Areas of Interest <span className="text-red-600">*</span>
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {contributionAreas.map((area) => (
                        <div
                          key={area.id}
                          onClick={() => handleInterestToggle(area.id)}
                          className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.interests.includes(area.id)
                              ? 'border-emerald-600 bg-emerald-50'
                              : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{area.label}</span>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              formData.interests.includes(area.id)
                                ? 'border-emerald-600 bg-emerald-600'
                                : 'border-gray-300'
                            }`}>
                              {formData.interests.includes(area.id) && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {formData.interests.length === 0 && (
                      <p className="text-sm text-gray-500 mt-2">Please select at least one area of interest</p>
                    )}
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Professional Background <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:ring-0 transition-colors outline-none resize-none bg-white"
                      placeholder="Share your relevant experience, skills, and motivation for volunteering..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || formData.interests.length === 0}
                    className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Application</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Impact Metrics */}
        <div className="bg-gradient-to-br from-gray-900 to-emerald-900 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Measurable Impact</h2>
                <p className="text-xl text-gray-300">Data-driven results from community collaboration</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { number: '500+', label: 'Students Reached', sublabel: 'Across 15 communities' },
                  { number: '50+', label: 'Active Contributors', sublabel: 'Skilled professionals' },
                  { number: '₹5L+', label: 'Resources Deployed', sublabel: 'Strategic investments' },
                  { number: '25+', label: 'Projects Delivered', sublabel: 'Sustainable outcomes' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-lg font-semibold text-emerald-300 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-400">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-12 text-center text-white shadow-2xl">
                <h2 className="text-4xl font-bold mb-4">Questions About Partnership?</h2>
                <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                  Our team is available to discuss custom engagement models and strategic collaboration opportunities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:nss@iitd.ac.in?subject=Partnership%20Inquiry%20-%20NSS%20IITD"
                    className="bg-white text-emerald-700 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Us
                  </a>
                  
                  <Link
                    to="/contact"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default GetInvolved;
