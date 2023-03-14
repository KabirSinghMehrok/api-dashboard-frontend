import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext({});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {

	async function login(data) {
		const response = await axios.post('/login', JSON.stringify(data), 
			{
				headers: { 
					'Content-Type': 'application/json', 
					'Access-Control-Allow-Origin': '*'
				},
				// withCredentials: true
			}
		)

		storeToken(response.data.token)
		return response;
	}

	async function devLogin() {
		console.log("devLogin has triggered");
		const data = {'email': 'mansi@iiitd.ac.in', 'password': 'CoSyLab'};
		const response = await axios.post('/login', JSON.stringify(data), 
			{
				headers: { 
					'Content-Type': 'application/json', 
					'Access-Control-Allow-Origin': '*'
				},
				// withCredentials: true
			}
		)

		storeToken(response.data.token)
		return response;
	}


	async function signup(data) {
		const response = await axios.post('/register', JSON.stringify(data), 
			{
				headers: { 
					'Content-Type': 'application/json', 
					'Access-Control-Allow-Origin': "*"
				},
				// withCredentials: true
			}
		)

		storeToken(response.data.token)
		return response;
	}

	function storeToken(token) {
		localStorage.setItem("jwtToken", token);
	}
	
	// Retrieve JWT from local storage
	function getToken() {
		const returnVal = localStorage.getItem("jwtToken");
		return returnVal ? returnVal : 0;
	}

	function logout() {
		localStorage.removeItem("jwtToken");
	}


	function resetPassword() {

	}


	function updatePassword() {

	}


	let value = {
		getToken,
		login,
		devLogin,
		logout,
		signup,
		resetPassword,
		updatePassword,
	}

	return (
		<AuthContext.Provider value={value} >
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;