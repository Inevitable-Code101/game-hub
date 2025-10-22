import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Register = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register - Gamehub';
  }, []);

  const validatePassword = (pass) => {
    return pass.length >= 6 && /[A-Z]/.test(pass) && /[a-z]/.test(pass);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error('Password must be 6+ chars with upper and lower case');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      setUser(userCredential.user);
      toast.success('Registered successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed: ' + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      toast.success('Registered with Google!');
      navigate('/');
    } catch (error) {
      toast.error('Google registration failed: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00FF6F]">Register</h1>
      <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Photo URL (optional)"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn bg-[#D600FF] text-white w-full hover:bg-[#B000D0]">
          Register
        </button>
      </form>
      <div className="flex justify-center items-center">
        <button
        onClick={handleGoogleRegister}
        className="btn bg-blue-600 text-white w-full max-w-md mx-auto mt-4 hover:bg-blue-700"
      >
        Register with Google
      </button>
      </div>
      
      <p className="text-center mt-4">
        Have an account?{' '}
        <NavLink to="/login" className="text-[#00FF6F] hover:text-[#D600FF]">
          Login
        </NavLink>
      </p>
    </motion.div>
  );
};

export default Register;