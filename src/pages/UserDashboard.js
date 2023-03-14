import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { getProfile } = useAuth();
  const userInfo = getProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.isModerator) {
      navigate('/admin');
    }  
  }, []);

  return (
    <>
      <Navigation/>
      <div className="flex justify-center items-center w-full h-screen">
        <h1>This is the UserDashboard</h1>
      </div>
    </>
  );
}

export default UserDashboard;