import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); 

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    console.log(loginData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Login successful!");
        localStorage.setItem("token", result.token);

        const role = result.user.role;
        if (role === "superadmin") {
            setTimeout(() => { navigate("/");}, 2000);
          
        } else if (role === "vendor") {
          setTimeout(() => { navigate("/");}, 2000);
        } else {
        setTimeout(() => { navigate("/");}, 2000);
        }
      } else {
        setIsSuccess(false);
        setMessage(result.message || "Login failed");
      }
    } catch (err) {
        setIsSuccess(false);
      setMessage("Error during login");
      console.error(err);
    }
  };

  return (

   <section className='h-screen flex items-center justify-center'>
   <div className='max-w-sm border shadow bg-white mx-auto p-8'>
    <h2 className=" text-2xl font-semibold pt-5">Please Log In.</h2>
    <form className='space-y-5 max-width-sm mx-auto pt-8' onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email"  value={email} id="email" onChange={(e) => setEmail(e.target.value)}
          required
        placeholder="E-mail Address" className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
         <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        placeholder="Password" className='w-full bg-gray-100 focus:outline-none px-5 py-3' />
         {message && (<p className={isSuccess ? "text-green-500" : "text-red-500"}>{message}</p>)}
                <button type='submit' className='w-full mt-5 text-white bg-red-900 font-bold py-3 rounded-md transition transform duration-300 hover:scale-105 '>Log In</button>

        <p className='my-5 italic text-sm text-center'> Do not have an account? <Link to="/register" className='text-red-900'>Register</Link> here.</p>
    </form>
   </div>
   </section> 
 

  );
};

export default Login;