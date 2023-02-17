import React, { useState, useEffect } from 'react'
import { Table, Button } from 'flowbite-react';
import DUMMY_API_USERS_DATA from '../json/DUMMY_API_USERS_DATA.json'
import axios from '../api/axios';

export default function ApiUsersList({ apiName, apiID }) {
	const [rawData, setRawData] = useState({})
	let refinedData = Object.values(DUMMY_API_USERS_DATA)
	console.log(refinedData);
	const token = "DUMMY_TOKEN"
	

	useEffect(() => {
		// console.log("Fetching of user data happening")
		try { 
			const fetchRawData = async () => {
				const result = await axios.get(`/users/${apiID}`, 
					{
						headers: {
						// add the authorization 
						// 'Authorization': `Bearer ${token}` 
						}
					}
				);
				setRawData(result.data);
			};
			fetchRawData();
		}
		catch {
			console.log("ERROR: While fetching ApiUsersList from server")
		}
  }, []);
	
	// NOTE - Change the value of result.data.user
	useEffect(() => {
		// fetch user data
		const fetchUserData = async () => {
			const usersList = Object.values(rawData.users);
			for (let user of usersList) {
				const result = await axios.get(`users/userId`, // replace this with correct call
					{
						headers: {
						'Authorization': `Bearer ${token}`
						}
					}
				);
				// CHANGE this value
				refinedData.push(result.data.user);
			}
		}


		// for every user in rawData, fetch their user data using axios
		// stored this information in refinedData object
		if (Object.keys(rawData).length !== 0) {
			fetchUserData();
		}
	}, [rawData])


	return (
		<div className="w-full">
			{/* <span className="text-2xl mb-6">API: </span> */}
			<div className="text-2xl mb-6">
				API name: <span className="font-bold">{apiName}</span>
			</div>
			<Table hoverable={true} className="w-full">
				
				{/* Table Head */}
				<Table.Head>
					<Table.HeadCell>
						User email
					</Table.HeadCell>
					<Table.HeadCell>
						Subscription Plan
					</Table.HeadCell>
					<Table.HeadCell>
						Start Date
					</Table.HeadCell>
					<Table.HeadCell>
						End Date
					</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">
							Edit
						</span>
					</Table.HeadCell>
				</Table.Head>
				
				{/* Table Body */}
				<Table.Body className="divide-y">
				{refinedData.map(user => (
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
							{user.email}
						</Table.Cell>
						<Table.Cell>
							{user.subscriptions.map(sub => 
								<span key={sub._id}>
									{`${sub.apiName}, `}
								</span>
							)}
						</Table.Cell>
						<Table.Cell>
							<Button 
								size="sm" color="light" 
								className="border-2 border-red-700 text-red-700 hover:text-white hover:bg-red-700 " 
								onClick={user._id}
							>
								Delete User
							</Button>
						</Table.Cell>
					</Table.Row>
				))
				}
				</Table.Body>
			</Table>

		</div>
	)
}
