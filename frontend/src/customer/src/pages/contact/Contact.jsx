import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="section__container p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
      <p className="text-center text-gray-600 mb-4">
        Have questions or suggestions? We're here to help!
      </p>

      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
          <textarea placeholder="Your Message" className="w-full p-2 border rounded" rows="4"></textarea>
          <button className="btn w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>

      {/* Customer Support */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Customer Support</h3>
        <p className="text-gray-600">For immediate assistance, reach out to us:</p>
        <ul className="mt-2 text-gray-800">
          <li>📧 Email: support@yourstore.com</li>
          <li>📞 Phone: +123 456 7890</li>
          <li>💬 Live Chat: Available 9 AM - 6 PM</li>
        </ul>
      </div>

      {/* Feedback Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Help Us Improve</h3>
        <p className="text-gray-600">We value your feedback! Share your thoughts with us:</p>
        <textarea className="w-full p-2 border rounded mt-2" placeholder="Your suggestions..." rows="3"></textarea>
        <button className="btn w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mt-2">
          Submit Feedback
        </button>
      </div>

      {/* Back to Home Button */}
      <div className="text-center mt-6">
        <Link to="/" className="text-blue-500 hover:underline">⬅ Back to Home</Link>
      </div>
    </div>
  );
};

export default Contact;
