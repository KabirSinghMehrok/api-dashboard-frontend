import React, { useContext, useState } from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpeg'

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="https://cosylab.iiitd.edu.in/">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            CoSyLab API
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" rounded={true}/>}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                Ganesh Bagler
              </span>
              <span className="block truncate text-sm font-medium">
                bagler@iiitd.ac.in
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item>
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            href="/navbars"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            About
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Services
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Pricing
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {console.log(currentUser)}
    </>
  );
}

export default HomePage;