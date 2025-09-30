import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// --- (Your SVG and Logo components remain the same) ---
const UserIcon = () => ( <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );
const MailIcon = () => ( <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
const LockIcon = () => ( <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> );
const Logo = () => ( <div className="flex items-center space-x-2"> <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md"> <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> </div> <span className="text-4xl font-bold text-[#083d41]">HCH</span> </div> );

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // CHANGED: Add a loading state
  const [isLoading, setIsLoading] = useState(false);

  const { registerUser, errorMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!agreedToTerms) {
        alert("You must agree to the Terms of Service to create an account.");
        return;
    }
    
    // CHANGED: Set loading to true when submission starts
    setIsLoading(true);

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    const result = await registerUser(userData);

    // CHANGED: Set loading to false when submission finishes
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage(result.message + " Redirecting to login..."); // Update success message

      // CHANGED: Add a 3-second delay before redirecting
      setTimeout(() => {
        navigate('/signin');
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };

  return (
    <>
    <style>{`
        .bg-pattern { background-color: #f8fafc; background-image: radial-gradient(#e2e8f0 1px, transparent 1px); background-size: 16px 16px; }
    `}</style>
    <section className="font-sans bg-pattern min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="mb-8 self-center">
                <Logo />
            </div>

            <div className="w-full">
                <h2 className="text-3xl font-bold text-[#083d41] mb-2 text-center">Create Account</h2>
                <p className="text-gray-600 mb-8 text-center">Join us and enjoy a cleaner home today!</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input fields for first name, last name, email, password */}
                    <div className="relative"> <span className="absolute inset-y-0 left-0 flex items-center pl-4"> <UserIcon /> </span> <input type="text" name="first-name" placeholder="First Name *" required className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 border-2 border-transparent focus:border-green-300 focus:bg-white focus:ring-0 transition" value={firstName} onChange={(e) => setFirstName(e.target.value)} /> </div>
                    <div className="relative"> <span className="absolute inset-y-0 left-0 flex items-center pl-4"> <UserIcon /> </span> <input type="text" name="last-name" placeholder="Last Name *" required className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 border-2 border-transparent focus:border-green-300 focus:bg-white focus:ring-0 transition" value={lastName} onChange={(e) => setLastName(e.target.value)} /> </div>
                    <div className="relative"> <span className="absolute inset-y-0 left-0 flex items-center pl-4"> <MailIcon /> </span> <input type="email" name="email" placeholder="Your Email *" required className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 border-2 border-transparent focus:border-green-300 focus:bg-white focus:ring-0 transition" value={email} onChange={(e) => setEmail(e.target.value)} /> </div>
                    <div className="relative"> <span className="absolute inset-y-0 left-0 flex items-center pl-4"> <LockIcon /> </span> <input type="password" name="password" placeholder="Password *" required className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 border-2 border-transparent focus:border-green-300 focus:bg-white focus:ring-0 transition" value={password} onChange={(e) => setPassword(e.target.value)} /> </div>
                    
                    <div className="flex items-start">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-400 focus:ring-offset-0" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                            <span className="ml-2">I agree to the <a href="#" className="font-semibold text-green-600 hover:underline">Terms of Service</a></span>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            // CHANGED: Disable button when isLoading is true and change styles
                            disabled={isLoading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {/* CHANGED: Change button text when loading */}
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                {/* --- (Message display and social login sections remain the same) --- */}
                {errorMsg && ( <p className="text-red-500 text-center mt-4">{errorMsg}</p> )}
                {successMessage && ( <p className="text-green-600 text-center mt-4">{successMessage}</p> )}
                <div className="mt-8 text-center"> <p className="text-gray-600"> Already have an account? <a href="/signin" className="font-semibold text-green-600 hover:underline ml-1">Sign In</a> </p> </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}