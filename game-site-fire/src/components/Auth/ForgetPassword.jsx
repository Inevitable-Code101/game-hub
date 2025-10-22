import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Forget Password - Gamehub';
    const fromLogin = location.state?.email;
    if (fromLogin) setEmail(fromLogin);
  }, [location]);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      navigate('https://mail.google.com');
    } catch (error) {
      toast.error('Failed to send reset email: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00FF6F]">Forget Password</h1>
      <form onSubmit={handleReset} className="max-w-md mx-auto space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn bg-[#D600FF] text-white w-full hover:bg-[#B000D0]">
          Reset Password
        </button>
      </form>
    </motion.div>
  );
};

export default ForgetPassword;