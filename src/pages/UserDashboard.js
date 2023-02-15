import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const UserDashboard = () => {
  
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