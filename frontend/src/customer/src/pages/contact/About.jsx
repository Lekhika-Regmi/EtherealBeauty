import React from "react";
import { Link } from "react-router-dom";
 import aboutImg from "../../assets/aboutImg.png"; // Replace with your actual about image path

 const About = () => {
   return (
     <div className="max-w-screen-lg mx-auto px-6 py-12 text-gray-800">
       <h1 className="text-4xl font-bold text-center mb-6">About Ethereal Beauty</h1>
       
       <section className="mb-8">
         <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
         <p>
           Many individuals prioritize having good skin, but achieving it can be daunting. Ethereal Beauty provides a
           comprehensive skincare platform, offering tailored advice and solutions to help users attain healthier skin.
         </p>
       </section>
       
       <section className="mb-8">
         <h2 className="text-2xl font-semibold mb-2">Why Ethereal Beauty?</h2>
         <ul className="list-disc ml-6">
           <li>Personalized product recommendations</li>
           <li>Environmental impact and air quality assessments</li>
           <li>AI-powered skin type identification</li>
           <li>Find dermatologists nearby</li>
           <li>Shop for skincare products directly from the app</li>
         </ul>
       </section>
       
       <section className="mb-8">
         <h2 className="text-2xl font-semibold mb-2">Scope of the Project</h2>
         <p>
           Ethereal Beauty is a one-stop solution for all skincare concerns. With features like image processing for skin
           type analysis, real-time air quality integration, and e-commerce functionalities, the platform revolutionizes
           skincare accessibility.
         </p>
       </section>
       
     </div>
   );
 };
 
 export default About;

