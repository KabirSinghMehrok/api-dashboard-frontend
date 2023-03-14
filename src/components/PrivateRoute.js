import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute() {
	const {getProfile} = useAuth();

	return ( getProfile() ? <Outlet/> : <Navigate to="/login"/> )
}
