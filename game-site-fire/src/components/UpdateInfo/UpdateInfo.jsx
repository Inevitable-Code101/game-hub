import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const UpdateInfo = ({ user, setUser }) => {
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    document.title = 'Update Profile - Gamehub';
  }, [user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });
      toast.success('Profile updated successfully!');
      navigate('/my-profile');
    } catch (error) {
      toast.error('Update failed: ' + error.message);
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
      <h1 className="text-4xl font-bold text-center mb-8 text-[#00FF6F]">Update Profile</h1>
      <form onSubmit={handleUpdate} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="url"
          placeholder="Photo URL"
          className="input input-bordered w-full bg-gray-800 text-white"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <button type="submit" className="btn bg-[#D600FF] text-white w-full hover:bg-[#B000D0]">
          Update
        </button>
      </form>
    </motion.div>
  );
};

export default UpdateInfo;