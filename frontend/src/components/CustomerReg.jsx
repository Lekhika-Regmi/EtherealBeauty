import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CustomerReg() {
  const [username, setName] = useState('');
  const [phone_no, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    const userData = {
      username,
      phone_no,
      password, 
      email,
    };

    try {
      const response = await fetch('http://localhost:5000/api/register/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const result = await response.json();
        setMessage({ text: result.message || 'User registered successfully!', type: 'success' });
      } else {
        const error = await response.json();
        setMessage({ text: error.message || 'Error during registration', type: 'error' });

      }
    } catch (err) {
      setMessage(err.message);
      console.error(err); // Log the error for debugging
    }
  };

  return (
    <div className="section__container">
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm min-width-sm border shadow bg-white mx-auto p-8'>
        <h2 className="text-2xl font-semibold pt-5">Let's get started with Ethereal Beauty!</h2>
        <form className='space-y-5 max-width-sm mx-auto pt-8' onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

          <label htmlFor="phoneNo">Phone No</label>
          <input
            type="text"
            id="phoneNo"
            placeholder="Phone Number"
            value={phone_no}
            onChange={(e) => setPhone(e.target.value)}
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

{message && (
            <p className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message.text}
            </p>
          )}
          <button
            type='submit'
            className='w-full mt-5 text-white bg-rose-600 font-bold py-3 rounded-md transition transform duration-300 hover:scale-105'
          >
            Register
          </button>

          <p className='my-5 italic text-sm text-center'>
            Already have an account? <Link to="/login" className='text-rose-600'>Log In</Link> here
          </p>
        </form>
      </div>
    </section>
    </div>
  );
}

export default CustomerReg;
