import React from 'react'
import { Sidebar } from 'flowbite-react';

export default function AdminSidebar() {
	return (
		<div className="w-fit h-full border-r-2">
			<Sidebar 
				aria-label="Sidebar with multi-level dropdown"
			>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item
							href="#"
						>
							Users
						</Sidebar.Item>
						<Sidebar.Collapse
							
							label="API's"
						>
							<Sidebar.Item href="#">
								SomeAPI
							</Sidebar.Item>
							<Sidebar.Item href="#">
								AnotherAPI
							</Sidebar.Item>
						</Sidebar.Collapse>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</div>
	)
}
