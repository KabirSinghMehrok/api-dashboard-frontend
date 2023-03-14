import axios from "axios";

export default axios.create({
	baseURL: 'https://cosylab.iiitd.edu.in/dashboard/api/'
})