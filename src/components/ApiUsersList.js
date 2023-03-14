import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Table, Button } from 'flowbite-react';
import axios from '../api/axios';

export default function ApiUsersList({apiName, apiUserData, apiID}) {
	const { getToken, logout } = useAuth();

	// useEffect(() => {
	// 	// console.log("Fetching of user data happening")
	// 	try { 

	// 		const fetchApiUserData = async () => {
	// 			const token = await getToken()
	// 			const result = await axios.get(`/users?apiName=${apiName}`, 
	// 				{
	// 					headers: {
	// 					// add the authorization 
	// 					'Authorization': `Bearer ${token}` 
	// 					}
	// 				}
	// 			).catch(async error => 
  //         {
  //           if (error.response.status === 401 || error.response.status === 400) {
	// 						await devLogin();
	// 						fetchApiUserData();
  //           }
  //         }  
  //       );
	// 			setApiUserData(result.data.users);
	// 			console.log(apiName);
	// 		};
	// 		fetchApiUserData();
	// 	}
	// 	catch {
	// 		console.log("ERROR: While fetching ApiUsersList from server")
	// 	}

	// 	return () => {
  //     return void setApiUserData([])
  //   }
  // }, [apiName]);
	
	// // NOTE - Change the value of result.data.user
	// useEffect(() => {
	// 	// fetch user data
	// 	const fetchUserData = async () => {
	// 		const usersList = Object.values(rawData.users);
	// 		for (let user of usersList) {
	// 			const result = await axios.get(`users/userId`, // replace this with correct call
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

	// console.log(apiUserData);
	
	const unsubscribe = function (userID, subID, apiName) {
		try {
      const unsub = async () => {
        const token = getToken()
        const result = await axios.delete(`/users/${userID}/subscriptions/${subID}`, 
          {
            headers: {
            // add the authorization 
            'Authorization': `Bearer ${token}` 
            },
						data: {
							apiName
						}
          }
        ).catch(async error => 
          {
            if (error.response.status === 401) {
              // Unauthorized, token invalid
							logout();
            }
          }  
        );
      };
      unsub();
    }
    catch {
      console.log("ERROR: While fetching ApiUsersList from server")
    }
	}
	

	return (
		<div className="w-full">
			<div className="text-2xl mb-6">
				API name: <span className="font-bold">{apiName}</span>
			</div>
			<Table hoverable={true} className="w-full">
				
				<Table.Head>
					<Table.HeadCell>
						User email
					</Table.HeadCell>
					<Table.HeadCell>
						Plan Name
					</Table.HeadCell>
					<Table.HeadCell>
						Status
					</Table.HeadCell>
					<Table.HeadCell>
						Tokens
					</Table.HeadCell>
					<Table.HeadCell>
						Duration
					</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">
							Edit
						</span>
					</Table.HeadCell>
				</Table.Head>
				
				<Table.Body className="divide-y">
				{
					(() => 
					{
						if ((apiUserData).length == 0) {
							return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
									No Record Found
								</Table.Cell>
							</Table.Row>
						}
						return apiUserData.map(user => (
							user.subscriptions[apiName].map(sub => 
								<Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
									{user.email}
								</Table.Cell>
								<Table.Cell>
									{sub['planName']}
								</Table.Cell>
								<Table.Cell>
									{sub['status']}
								</Table.Cell>
								<Table.Cell>
									{sub['tokens']}
								</Table.Cell>
								<Table.Cell>
									{sub['duration']}
								</Table.Cell>
								<Table.Cell>
									<Button 
										size="sm" color="light" 
										onClick={() => unsubscribe(user._id, sub._id, apiName)}
										className="border-2 border-red-700 text-red-700 hover:text-white hover:bg-red-700" 
									>
										Unsubscribe
									</Button>
								</Table.Cell>
							</Table.Row>
							)
						))
					})()
				}
				</Table.Body>
			</Table>

		</div>
	)
}
