import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const EtherealBeautyBody = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* About Section */}
      <section className="bg-white text-black p-8 rounded-lg shadow-xl mb-16">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>
        <p className="text-lg mb-4">
          At *Ethereal Beauty*, we believe that beauty is a reflection of inner health and self-love. 
          We offer a wide range of high-quality beauty products, crafted with natural ingredients to enhance your natural glow.
        </p>
        <p className="text-lg">
          Our mission is to empower individuals to embrace their unique beauty, providing products that are gentle, effective, and ethically sourced.
        </p>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Skincare</h3>
            <p>Organic skincare products to nourish your skin naturally.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Haircare</h3>
            <p>Gentle hair care products that promote healthy hair growth.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Makeup</h3>
            <p>Enhance your natural features with our toxin-free makeup range.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="path/to/product1.jpg" alt="Product 1" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Radiance Serum</h3>
            <p className="text-sm">A brightening serum to give your skin a natural glow.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="path/to/product2.jpg" alt="Product 2" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Herbal Shampoo</h3>
            <p className="text-sm">A natural shampoo that promotes healthy hair growth.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="path/to/product3.jpg" alt="Product 3" className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">Glow Foundation</h3>
            <p className="text-sm">A lightweight foundation that enhances your natural features.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
            <p className="italic mb-4">"The skincare products are amazing! My skin has never felt so soft and radiant."</p>
            <p className="font-semibold">- Sarah L.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
            <p className="italic mb-4">"I love the makeup line. It’s perfect for everyday wear and feels so light on my skin!"</p>
            <p className="font-semibold">- Priya S.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
            <p className="italic mb-4">"The Herbal Shampoo completely transformed my hair. It feels so much healthier now!"</p>
            <p className="font-semibold">- Anita R.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EtherealBeautyBody;
