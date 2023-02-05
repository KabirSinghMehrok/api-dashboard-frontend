import { createContext, useState, useContext } from 'react';
import axios from '../api/axios';

const AuthContext = createContext({});

export function useAuth() {
	return useContext(AuthContext);
}


export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({})
	
	async function login(data) {
		const response = await axios.post('/login', JSON.stringify(data), 
			{
				headers: { 
					'Content-Type': 'application/json', 
					'Access-Control-Allow-Origin': '*'
				},
				withCredentials: true
			}
		)

		setCurrentUser({ 
			userName: response.data.userName,
			profilePic: response.data.profilePic,  
			email: data.email, 
			token: response.data.token,
		})

		return response;
	}


	async function signup(data) {
		const response = await axios.post('/register', JSON.stringify(data), 
			{
				headers: { 
					'Content-Type': 'application/json', 
					'Access-Control-Allow-Origin': '*'
				},
				// withCredentials: true
			}
		)

		setCurrentUser({ 
			userName: response.data.userName,
			profilePic: response.data.profilePic,  
			email: data.email, 
			token: response.data.token,
		})
		
		return response;
	}


	function logout() {

	}


	function resetPassword() {

	}


	function updatePassword() {

	}


	let value = {
		currentUser,
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