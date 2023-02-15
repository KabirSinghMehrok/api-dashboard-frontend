import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute() {
	return ( true ? <Outlet/> : <Navigate to="/login"/> )
}
