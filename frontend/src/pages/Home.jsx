import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export default function Home() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin');
  };

  return (
    <div>
      <h1>Welcome, {auth.currentUser?.email}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
