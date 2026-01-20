import React from 'react';
import { CiLocationOn, CiMail, CiPhone, CiSearch } from 'react-icons/ci';
import { FaFacebookF, FaGithub, FaLinkedinIn, FaSlack, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-gray-100 font-sans">
            <div className="lg:max-w-[70%] md:max-w-[95%] max-w-[98%] mx-auto px-4">
                
            

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold text-green-500 mb-4">
                            DESHIMART
                        </h2>
                        <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
                            Discover fresh, organic farm products at DeshiMart, your trusted online destination for quality agricultural products.
                        </p>
                        <div className="flex gap-3">
                            {[FaYoutube, FaGithub, FaLinkedinIn, FaFacebookF, FaSlack].map((Icon, index) => (
                                <a key={index} href="#" className="p-2.5 border border-gray-200 rounded-full text-gray-500 hover:bg-green-500 hover:text-white transition-all">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-5">Quick Links</h3>
                        <ul className="text-gray-500 text-[13px] space-y-4">
                            {['About us', 'Contact us', 'Terms & Conditions', 'Privacy Policy', 'FAQs'].map(link => (
                                <li key={link} className="hover:text-green-500 cursor-pointer transition-colors">{link}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-5">Categories</h3>
                        <ul className="text-gray-500 text-[13px] space-y-4">
                            {['Vegetables', 'Fruits', 'Dairy & Eggs', 'Meat & Fish', 'Frozen Food'].map(cat => (
                                <li key={cat} className="hover:text-green-500 cursor-pointer transition-colors">{cat}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-5">Newsletter</h3>
                        <p className="text-gray-500 text-[13px] mb-5 leading-relaxed">Subscribe to our newsletter for updates.</p>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full p-3 border border-gray-200 rounded outline-none focus:border-green-500 mb-3 text-sm"
                        />
                        <button className="w-full bg-green-500 text-white py-3 rounded font-bold text-sm hover:bg-green-600 transition-all mb-4">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 text-center text-[13px] text-gray-400">
                    © 2026 <span className="font-bold text-black uppercase">Deshimart</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;