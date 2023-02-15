import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext({});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()

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
		setCurrentUser({token: getToken()})
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
		setCurrentUser({token: getToken()})
		return response;
	}

	function storeToken(token) {
		localStorage.setItem("jwtToken", token);
	}
	
	// Retrieve JWT from local storage
	function getToken() {
		const returnVal = localStorage.getItem("jwtToken");
		console.log(`haiyaaa ${returnVal}`);
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
		currentUser,
		setCurrentUser,
		getToken,
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