import React, { useState, useEffect } from 'react'
import { Table, Button } from 'flowbite-react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

export default function UsersList() {
	const [users, setUsers] = useState([])
	const { getToken, devLogin } = useAuth();

	const fetchUsers = async () => {
		const token = await getToken()
		const result = await axios.get('/users', 
			{
				headers: {
				'Authorization': `Bearer ${token}`
				}
			}
		).catch(async error => 
			{
				if (error.response.status === 401 || error.response.status === 400) {
					await devLogin();
					fetchUsers();
				}
			}  
		);
		setUsers(result.data.users);
	};


	const makeModerator = function (userID) {
		try { 
			const makeMod = async () => {
				const token = await getToken()
				const result = await axios.patch(`/users/${userID}`, 
					{
						headers: {
						'Authorization': `Bearer ${token}`
						},
						data: {
							'isModerator': 'MODERATOR'
						}
					}
				).catch(async error => 
          {
            if (error.response.status === 401 || error.response.status === 400) {
							await devLogin();
							makeMod();
            }
          }  
        );
			};
			makeMod();
			fetchUsers();				// after successfully making moderator
		}
		catch {
			console.log("ERROR: While making moderator")
		}
	}

	
	const deleteUser = function (userID) {
		try { 
			const deleteUsr = async () => {
				const token = await getToken()
				const result = await axios.delete(`/users/${userID}`, 
					{
						headers: {
						'Authorization': `Bearer ${token}`
						},
					}
				).catch(async error => 
          {
            if (error.response.status === 401 || error.response.status === 400) {
							await devLogin();
							deleteUsr();
            }
          }  
        );
			};
			deleteUsr();
			fetchUsers();				// after successfully making moderator
		}
		catch {
			console.log("ERROR: While deleting user")
		}
	}


	useEffect(() => {
		// console.log("Fetching of user data happening")
		try {
			fetchUsers();
		}
		catch {
			console.log("ERROR: While fetching UsersList from server")
		}
  }, []);

	return (
		<div className="w-full">
			<Table hoverable={true} className="w-full">
				
				{/* Table Head */}
				<Table.Head>
					<Table.HeadCell>
						Type
					</Table.HeadCell>
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
				{
					(() => 
					{
						if ((users).length == 0) {
							return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
									No Record Found
								</Table.Cell>
							</Table.Row>
						}
						return users.map(user => (
							<Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
									{	
										(() => {
											if (user.isAdmin) return 'Admin';
											if (user.isModerator) return 'Moderator';
											return 'User';
										})()
									}
								</Table.Cell>
								<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
									{user.email}
								</Table.Cell>
								<Table.Cell>
									{
										(() => {
											const subscriptionsName = Object.keys(user.subscriptions);
											return subscriptionsName.length === 0 ? 'None' : subscriptionsName.join(', ');
										})()
									}
								</Table.Cell>
								<Table.Cell>
									<div className='flex flex-row gap-2'>
										<Button 
											size="sm" color="light" 
											className="border-2 border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 " 
										>
											Edit
										</Button>
										{	!user.isAdmin &&
											<Button 
												size="sm" color="light"
												onClick={() => makeModerator(user._id)} 
												className="border-2 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600 " 
											>
												Make Moderator
											</Button>
										}
										<Button 
											size="sm" color="light" 
											className="border-2 border-red-700 text-red-700 hover:text-white hover:bg-red-700 " 
										>
											Delete User
										</Button>
									</div>
								</Table.Cell>
							</Table.Row>
						))
					})()
				}
				</Table.Body>
			</Table>

		</div>
	)
}
