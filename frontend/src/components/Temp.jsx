// import React from 'react'
// import { useState } from "react";
// import { Link } from "react-router-dom";
// function VendorReg() {
//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [message, setMessage] = useState('');

//   const provinces = [
//     'Province No. 1',
//     'Madhesh Province',
//     'Bagmati Province',
//     'Gandaki Province',
//     'Lumbini Province',
//     'Karnali Province',
//     'Sudurpashchim Province',
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const vendorName = e.target.VName.value;
//     const legalName = e.target.LegalName.value;
//     const address = e.target.address.value;
//     const city = e.target.city.value;

//     if (!vendorName || !legalName || !address || !city || !selectedProvince) {
//       setMessage('All fields are required!');
//       return;
//     }

//     setMessage('Form submitted successfully!');
//   };

//   return (
//     <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">Vendor Verification Form</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Business Name */}
//         <div>
//           <label htmlFor="BName" className="block mb-1 font-medium">Business Name</label>
//           <input
//             type="text"
//             name="BName"
//             id="BName"
//             placeholder="Enter business name"
//             required
//             className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//           />
//         </div>

//         {/* Owner Name */}
//         <div>
//           <label htmlFor="OwnerName" className="block mb-1 font-medium"> Owner of Business</label>
//           <input
//             type="text"
//             name="OwnerName"
//             id="OwnerName"
//             placeholder="Legal Name of Business"
//             required
//             className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//           />
//         </div>

//         {/* Address */}
//         <div>
//           <label htmlFor="address" className="block mb-1 font-medium">Address</label>
//           <input
//             type="text"
//             name="address"
//             id="address"
//             placeholder="Enter Address"
//             required
//             className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//           />
//         </div>

//         {/* City */}
//         <div>
//           <label htmlFor="city" className="block mb-1 font-medium">City</label>
//           <input
//             type="text"
//             name="city"
//             id="city"
//             placeholder="Enter city"
//             required
//             className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//           />
//         </div>

//         {/* Business Registration Number */}
//         <div>
//           <label htmlFor="regNo" className="block mb-1 font-medium">Business Registration Number</label>
//           <input
//             type="text"
//             name="regNo"
//             id="regNo"
//             placeholder="Business Registration Number"
//             required
//             className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//           />
//         </div>

//         {/* Province Dropdown */}
//         <div>
//           <label htmlFor="province" className="block mb-1 font-medium">Province</label>
//           <select
//             id="province"
//             value={selectedProvince}
//             onChange={(e) => setSelectedProvince(e.target.value)}
//             className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//           >
//             <option value="">Select Province</option>
//             {provinces.map((province, index) => (
//               <option key={index} value={province}>
//                 {province}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Message */}
//         {message && (
//           <div className="col-span-2 text-center">
//             <p className="text-red-500">{message}</p>
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="col-span-2 text-center">
//           <button
//             type="submit"
//             className="w-full md:w-1/3 bg-red-900 text-white font-bold py-2 rounded-md hover:bg-red-700"
//           >
//             Submit for verification
//           </button>
//         </div>

//         {/* Link to Register */}
//         <div className="col-span-2 text-center mt-4">
//           <p className="italic text-sm">
//             Don't have an account? <Link to="/register" className="text-red-900">Register</Link> here
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default VendorReg;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Updated import

function VendorReg() {
  // State for current form step and progress
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  // State to store form data
  const [vendorName, setVendorName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Replaces useHistory()

  // Function to update progress based on the step
  const updateProgress = (step) => {
    setProgress(step * 25);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vendorName || !ownerName || !emailAddress || !phoneNo || !password || !confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    // Proceed to next step
    if (currentStep < 4) {
      setCurrentStep((prevStep) => {
        const newStep = prevStep + 1;
        updateProgress(newStep);
        return newStep;
      });
    } else {
      setMessage("Form submitted successfully!");
      setTimeout(() => {
        navigate("/"); // Navigate to home after successful registration
      }, 1000);
    }
  };

  // Step 1: Business Registration Form
  const renderBusinessRegistrationForm = () => (
    <div>
      <div>
        <label htmlFor="BName" className="block mb-1 font-medium">Business Name</label>
        <input
          type="text"
          id="BName"
          placeholder="Enter business name"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          required
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label htmlFor="OwnerName" className="block mb-1 font-medium">Owner of Business</label>
        <input
          type="text"
          id="OwnerName"
          placeholder="Legal Name of Business"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label htmlFor="emailAddress" className="block mb-1 font-medium">E-mail Address</label>
        <input
          type="email"
          id="emailAddress"
          placeholder="Enter Address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label htmlFor="phoneNo" className="block mb-1 font-medium">Phone No</label>
        <input
          type="text"
          id="phoneNo"
          placeholder="Enter phone number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">Create Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );


   // Step 2: Business Verification Form 
   const renderBusinessVerificationForm = () => (
    <div>
     
      <div>
        <label htmlFor="businessName" className="block mb-1 font-medium">Business Name</label>
        <input
          type="text"
          id="businessName"
          placeholder="Enter Business Name"
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div>
        <label htmlFor="businessRN" className="block mb-1 font-medium">Business Registration Number</label>
        <input
          type="text"
          id="businessRN"
          placeholder="Enter Business Registration Number"
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div>
      <label htmlFor="businessAddress" className="block mb-1 font-medium">Business Address</label>
        <input
          type="text"
          id="businessAddress"
          placeholder="Enter Business Address"
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div>
  <label htmlFor="businessLicense" className="block mb-1 font-medium">Business License</label>
  <input
    type="file"
    id="businessLicense"
    placeholder="Upload Here"

    className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
  />
</div>

<div>
  <label htmlFor="govtIssuedId" className="block mb-1 font-medium">Government Issued ID</label>
  <input
    type="file"
    id="govtIssuedId"
    placeholder="Upload Here"

    className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
  />
</div>

    </div>
  );


  // Step 3: Terms and Conditions Form (example, replace with actual fields)
  const renderTermsAndConditionsForm = () => (
    <div>
      {/* Display Terms and Conditions below the checkbox */}
<div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
  <h3 className="font-semibold text-lg mb-2">Terms and Conditions</h3>
  <p className="text-sm mb-2">
    By registering as a vendor, you agree to the following terms and conditions:
  </p>
  <ul className="list-disc pl-5 text-sm">
    <li>Compliance with local laws and regulations.</li>
    <li>Accurate representation of products and services.</li>
    <li>Payment processing fees may apply for transactions.</li>
    <li>You are responsible for handling customer service issues.</li>
    <li>Account termination for violation of terms.</li>
  </ul>
  <p className="text-sm mt-2">Please review these terms carefully before proceeding.</p>

  <input
    type="checkbox"
    id="acceptTerms"
    className=" inline bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
  />
  <label htmlFor="acceptTerms" className="inline mb-1 font-medium">
    I accept the 
    <span
      className="text-blue-600 cursor-pointer"
      
    >
      Terms and Conditions
    </span>
  </label>
</div>
    </div>
  );

  // Step 4: Product Listing Form (example, replace with actual fields)
  const renderProductListingForm = () => (
    <div>
      <label htmlFor="productList" className="block mb-1 font-medium">List Products</label>
      <input
        type="text"
        id="productList"
        placeholder="Enter product names"
        className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
      />
    </div>
  );

  // Render the corresponding form based on the current step
  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return renderBusinessRegistrationForm();
      case 2:
        return renderBusinessVerificationForm();
      case 3:
        return renderTermsAndConditionsForm();
      case 4:
        return renderProductListingForm();
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Vendor Registration Form</h2>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-5">
        <div className="bg-green-500 h-full rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      {renderFormContent()}

      {message && <p className="text-red-500">{message}</p>}

      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={() => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          >
            Back
          </button>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-red-900 text-white font-bold py-2 px-4 rounded-md"
        >
          {currentStep < 4 ? "Next" : "Get Started"}
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="italic text-sm">
          Do not have an account? <Link to="/register" className="text-red-900">Register</Link> here.
        </p>
      </div>
    </div>
  );
}

export default VendorReg;
