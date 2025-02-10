import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Updated import

function VendorReg() {
  // State for current form step and progress
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);

  // State to store form data in step 1 
  const [vendorName, setVendorName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Step 2: Business Verification
  const [businessName, setBusinessName] = useState("");
  const [businessRN, setBusinessRN] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessLicense, setBusinessLicense] = useState(null);
  const [govtIssuedId1, setGovtIssuedId1] = useState(null);  // For front of the ID
  const [govtIssuedId2, setGovtIssuedId2] = useState(null);  // For back of the ID  const navigate = useNavigate(); // Replaces useHistory()

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setChecked] = useState(false); // Initialize as boolean

  
  const [file, setFile] = useState(null);
  
  const files = event.target.files; // FileList object
  const handleGovtIssuedId1Change = (e) => {
    setGovtIssuedId1(e.target.files[0]); // Store the first government-issued ID file
  };
  
  const handleGovtIssuedId2Change = (e) => {
    setGovtIssuedId2(e.target.files[0]); // Store the second government-issued ID file
  };




  const handleBusinessLicenseChange = (event) => {
    setBusinessLicense(event.target.files[0]); // Store the single business license file
  };



  // Function to update progress based on the step
  const updateProgress = (step) => {
    if(step<4){
    setProgress((step-1) * 25);}
    else if (step ==4 ){
      setProgress(step * 25);
    }
  };

  // Handle form submit
  const handleNext= ()=> {

    if(step==1){

    if (!vendorName || !ownerName || !emailAddress || !phoneNo || !password || !confirmPassword) {
      setMessage("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }
  } 
  else if (step==2){
    if(!businessName|| !businessRN|| !businessAddress || !businessLicense || !govtIssuedId1||!govtIssuedId2){
       setMessage("All fields are required!");
       return;
    }

  }
  else if (step ==3)  {
  if (!checked){
      setMessage("You must agree to out Terms and Conditions before proceeding!");
      return;
    }
  }

   setMessage("");
  
    if (currentStep < 4) {
      setCurrentStep((prevStep) => {
        updateProgress(prevStep + 1); // Set progress BEFORE updating step
        return prevStep + 1;
      });}
       else {
        
      setMessage("Form submitted successfully!");
      setTimeout(() => navigate("/"), 1000);
      return 4;
    }
  }

  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    e.preventDefault();
   
    if (currentStep !== 4) {
      setMessage("Please complete all steps before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("vendorName", vendorName);
    formData.append("ownerName", ownerName);
    formData.append("emailAddress", emailAddress);
    formData.append("phoneNo", phoneNo);
    formData.append("password", password);
    formData.append("businessName", businessName);
    formData.append("businessRN", businessRN);
    formData.append("businessAddress", businessAddress);

    if (businessLicense) {
      formData.append("businessLicense", businessLicense);
    }

    // Append the files to the form data
  formData.append("govtIssuedId1", govtIssuedId1);
  formData.append("govtIssuedId2", govtIssuedId2);
    
 
    formData.append("termsAccepted", checked);


  
    try {
      const response = await fetch("http://localhost:5000/api/register/vendor", {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Vendor registered successfully!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(data.message || "Registration failed!");
      }
    } catch (error) {
      setMessage("Error submitting form. Please try again.");
      console.error("Error:", error);
    }
    setIsSubmitting(false);
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
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          placeholder="Enter Business Name"
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div>
        <label htmlFor="businessRN" className="block mb-1 font-medium">Business Registration Number</label>
        <input
          type="text"
          id="businessRN"
          value={businessRN}
          onChange={(e) => setBusinessRN(e.target.value)}
          required
          placeholder="Enter Business Registration Number"
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div>
      <label htmlFor="businessAddress" className="block mb-1 font-medium">Business Address</label>
        <input
          type="text"
          id="businessAddress"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
          required
          placeholder="Enter Business Address"
          className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
        />
      </div>
       <div>
  <label htmlFor="businessLicense" className="block mb-1 font-medium">Business License</label>
  <input
  type="file"
  id="businessLicense"
  name="businessLicense"
  onChange={handleBusinessLicenseChange}
  required
  className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
/>
</div> 

<div>
  <label htmlFor="govtIssuedId" className="block mb-1 font-medium">Government Issued ID</label>
  <input
  type="file"
  id="govtIssuedId1"
  name="govtIssuedId1"
  
  onChange={handleGovtIssuedId1Change}
  required
  className="w-full bg-gray-100 border px-4 py-2 rounded-md focus:ring-2 focus:ring-red-500"
/>
<input
  type="file"
  id="govtIssuedId2"
  name="govtIssuedId2"
  
  onChange={handleGovtIssuedId2Change}
  required
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
    value={checked}
          onChange={(e) => setChecked(e.target.checked)}
          required
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
      {message && (<p className={`${message === "Vendor registered successfully!" ? "text-green-500" : "text-red-500" }`}> {message}</p>)}
      {/* {message && <p className="text-red-500">{message}</p>} */}

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

        {/* <button
          type="submit"
          onClick={currentStep < 4 ? handleNext : handleSubmit}
          className="bg-rose-600 text-white font-bold py-2 px-4 rounded-md"
        >
          {currentStep < 4 ? "Next" : "Get Started"}
        </button> */}

<button
    type="submit"
    onClick={currentStep < 4 ? handleNext : handleSubmit}
    className="bg-rose-600 text-white font-bold py-2 px-4 rounded-md"
    disabled={isSubmitting}  // Disable button when submitting
  >
    {isSubmitting ? 'Submitting...' : currentStep < 4 ? 'Next' : 'Get Started'}
  </button>
      </div>

      <div className="text-center mt-4">
        <p className="italic text-sm">
          Do not have an account? <Link to="/register" className="text-rose-600">Register</Link> here.
        </p>
      </div>
    </div>
  );
}

export default VendorReg;
