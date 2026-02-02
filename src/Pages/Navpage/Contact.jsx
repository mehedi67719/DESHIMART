import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <FaPhone className="text-green-600 text-xl" />,
            title: "Phone Number",
            details: ["+880 1234 567890", "+880 9876 543210"],
            bgColor: "bg-green-50"
        },
        {
            icon: <FaEnvelope className="text-green-600 text-xl" />,
            title: "Email Address",
            details: ["support@example.com", "info@example.com"],
            bgColor: "bg-green-50"
        },
        {
            icon: <FaMapMarkerAlt className="text-green-600 text-xl" />,
            title: "Office Location",
            details: ["123 Business Street", "Dhaka 1205, Bangladesh"],
            bgColor: "bg-green-50"
        },
        {
            icon: <FaClock className="text-green-600 text-xl" />,
            title: "Working Hours",
            details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
            bgColor: "bg-green-50"
        }
    ];

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4 py-12">
             
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Get In <span className="text-green-600">Touch</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-black mb-2">Send Us a Message</h2>
                            <p className="text-gray-600">Fill out the form below and our team will get back to you within 24 hours.</p>
                        </div>

                        {submitSuccess && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-700 font-medium text-center">
                                    ✅ Message sent successfully! We'll get back to you soon.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                                        placeholder="+880 1234 567890"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                                        placeholder="How can we help?"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition resize-none"
                                    placeholder="Tell us about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white flex items-center justify-center gap-3 transition-all ${
                                    isSubmitting 
                                    ? 'bg-green-400 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Contact Info & Map */}
                    <div className="space-y-8">
                        {/* Contact Information Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {contactInfo.map((info, index) => (
                                <div 
                                    key={index} 
                                    className={`${info.bgColor} p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white rounded-lg shadow-sm">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-black mb-2">{info.title}</h3>
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>



              
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-black mb-4">Quick Help</h3>
                            <div className="space-y-3">
                                <div className="border-b border-gray-100 pb-3">
                                    <p className="font-medium text-gray-800">Need immediate assistance?</p>
                                    <p className="text-gray-600 text-sm">Call us at <span className="text-green-600 font-semibold">+880 1234 567890</span></p>
                                </div>
                                <div className="border-b border-gray-100 pb-3">
                                    <p className="font-medium text-gray-800">Business inquiries?</p>
                                    <p className="text-gray-600 text-sm">Email: <span className="text-green-600">business@example.com</span></p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Response time</p>
                                    <p className="text-gray-600 text-sm">We typically respond within 24 hours on business days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
                    <p className="mb-6 opacity-90">Check out our comprehensive FAQ section for quick answers.</p>
                    <button className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300">
                        Visit FAQ Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Contact;