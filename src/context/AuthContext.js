import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const navigate = useNavigate();

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

		storeToken(response.data.token);
		await fetchProfile();
		return response;
	}


	// async function devLogin() {
	// 	console.log("devLogin has triggered");
	// 	// const data = {'email': 'mansi@iiitd.ac.in', 'password': 'CoSyLab'};
	// 	const data = {'email': 'bagler@iiitd.ac.in', 'password': 'petelgeuse247'};
	// 	const response = await axios.post('/login', JSON.stringify(data), 
	// 		{
	// 			headers: { 
	// 				'Content-Type': 'application/json', 
	// 				'Access-Control-Allow-Origin': '*'
	// 			},
	// 			// withCredentials: true
	// 		}
	// 	)

	// 	storeToken(response.data.token)
	// 	await getProfile();
	// 	return response;
	// }


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


	async function fetchProfile() {
		const response = await axios.get('/profile', 
			{
				headers: {
					'Authorization': `Bearer ${getToken()}`
				}
			}
		)
		console.log(response.data.user);
		localStorage.setItem('userInfo', JSON.stringify(response.data.user) );
	}	

	// check whether profile is valid
	// and return if valid
	function getProfile() {
		const returnVal = JSON.parse(localStorage.getItem('userInfo'));
		return returnVal;
		// check if structure valid
		// if (returnVal && ('isModerator' in returnVal) && ('_id' in returnVal)
		// && ('email' in returnVal)) {
		// 	return returnVal;
		// }
	}

	function logout() {
		localStorage.removeItem('jwtToken');
		localStorage.removeItem('userInfo');
		navigate('/login');
	}
		// withCredentials: true

	function resetPassword() {

	}


	function updatePassword() {

	}


	let value = {
		getToken,
		getProfile,
		login,
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