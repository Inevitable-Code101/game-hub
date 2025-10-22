import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const MyProfile = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    document.title = 'My Profile - Gamehub';
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed: ' + error.message);
    }
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto py-12 px-4 bg-gray-900 text-white min-h-screen"
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00FF6F]">My Profile</h1>
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
        <img
          src={user.photoURL || 'https://avatar.iran.liara.run/public'}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-center mb-2"><strong>Name:</strong> {user.displayName || 'N/A'}</p>
        <p className="text-center mb-4"><strong>Email:</strong> {user.email}</p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/update-info')}
            className="btn bg-[#D600FF] text-white w-full hover:bg-[#B000D0]"
          >
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="btn bg-[#FF073A] text-white w-full hover:bg-[#D0002F]"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;