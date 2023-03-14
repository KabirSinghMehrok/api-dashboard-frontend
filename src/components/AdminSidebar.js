import React from 'react'
import { Sidebar } from 'flowbite-react';

export default function AdminSidebar({ apiList, handleFetchApiUsers }) {
	return (
		<div className="w-fit h-full border-r-2">
			<Sidebar 
				aria-label="Sidebar with multi-level dropdown"
			>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item onClick={() => handleFetchApiUsers("showUserList")}>
							All Users
						</Sidebar.Item>
						<Sidebar.Collapse
							label="Users by API"
						>
							{
								apiList.map(api => (
									<Sidebar.Item key={api._id} onClick={() => handleFetchApiUsers(api)}>
										{api.name}
									</Sidebar.Item>
								))
							}
						</Sidebar.Collapse>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</div>
	)
}
