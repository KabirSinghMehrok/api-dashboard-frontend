import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import AdminSidebar from '../components/AdminSidebar';
import Userlist from '../components/Userlist';

const AdminDashboard = () => {
  const [showUsers, setShowUsers] = useState(true);

  return (
    <div className="flex flex-col h-full">
      <Navigation className="z-10"/>
      <div className="flex grow">
        <AdminSidebar/>
        <div className='p-6 w-full'>
          <Userlist/>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;