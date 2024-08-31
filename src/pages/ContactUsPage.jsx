import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#286140] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you!</p>
        </div>
      </div>
      <main className="xl:container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control space-y-2">
                <label htmlFor="" className="text-xl">
                  Name
                </label>
                <input
                  type="text"
                  className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-control space-y-2">
                <label htmlFor="" className="text-xl">
                  Email
                </label>
                <input
                  type="email"
                  className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control space-y-2">
                <label htmlFor="" className="text-xl">
                  Message
                </label>
                <textarea
                  type="text"
                  className="py-3 px-6 border border-black w-full outline-none placeholder:text-sm placeholder-gray-600 focus:border-gray-300 resize-none"
                  placeholder="Message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="default-btn px-6 py-3">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-2" />
                <span>support@quickeats.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-2" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-2" />
                <span>Asfia Tower, House - 76 Rd No. 11, Dhaka 1213</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">Our Location</h3>
              <div className="rounded-md overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116861.68286960691!2d90.30733159664067!3d23.749961438851887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a26f46d3cb%3A0xcc39eabe95a50820!2sHungryNaki!5e0!3m2!1sen!2sbd!4v1725084729444!5m2!1sen!2sbd`}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "inherit" }}
                  loading="lazy"
                  title="DotEats Location"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
