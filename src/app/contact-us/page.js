import React from 'react';

// /e:/Projects/Techathon/techathon/src/app/contact-us/page.js

const ContactUs = () => {
    return (
        <div className="mt-20 flex items-center justify-center bg-gray-100 text-black">
            <div className="w-full max-w-4xl p-8">
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Our Office</h2>
                        <p className="text-gray-700 mb-2">123 Techathon Street</p>
                        <p className="text-gray-700 mb-2">Tech City, TC 12345</p>
                        <p className="text-gray-700 mb-2">Phone: (123) 456-7890</p>
                        <p className="text-gray-700 mb-2">Email: contact@techathon.com</p>
                        <div className="mt-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9b1b1b1b1!2sTechathon%20Office!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Techathon Office Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-6 text-center">Send Us a Message</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                rows="4"
                                placeholder="Your message"
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;