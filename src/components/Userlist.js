import React, { useState, useEffect } from 'react'
import { Table } from 'flowbite-react';
import DUMMY_DATA from './DUMMY_DATA.json'
import axios from '../api/axios';

export default function Userlist() {
	const [rawData, setRawData] = useState({})
	let refinedData = Object.values(DUMMY_DATA)
	console.log(refinedData);
	const token = "DUMMY_TOKEN"
	

	// useEffect(() => {
	// 	// console.log("Fetching of user data happening")
	// 	try { 
	// 		const fetchRawData = async () => {
	// 			const result = await axios.get('/users', 
	// 				{
	// 					headers: {
	// 					'Authorization': `Bearer ${token}`
	// 					}
	// 				}
	// 			);
	// 			setRawData(result.data);
	// 		};
	// 		fetchRawData();
	// 	}
	// 	catch {
	// 		console.log("ERROR: While fetching Userlist from server")
	// 	}
  // }, [refinedData]);
	
	// // NOTE - Change the value of result.data.user
	// useEffect(() => {
	// 	// fetch user data
	// 	const fetchUserData = async () => {
	// 		const usersList = Object.values(rawData.users);
	// 		for (let user of usersList) {
	// 			const result = await axios.get(`users/userId`, 
	// 				{
	// 					headers: {
	// 					'Authorization': `Bearer ${token}`
	// 					}
	// 				}
	// 			);
	// 			// CHANGE this value
	// 			refinedData.push(result.data.user);
	// 		}
	// 	}


	// 	// for every user in rawData, fetch their user data using axios
	// 	// stored this information in refinedData object
	// 	if (Object.keys(rawData).length !== 0) {
	// 		fetchUserData();
	// 	}
	// }, [rawData])


	return (
		<div className="w-full">
			<Table hoverable={true} className="w-full">
				
				{/* Table Head */}
				<Table.Head>
					<Table.HeadCell>
						User email
					</Table.HeadCell>
					<Table.HeadCell>
						Subscribed API's
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
							
						</Table.Cell>
					</Table.Row>
				))
				}
				</Table.Body>
			</Table>

		</div>
	)
}
