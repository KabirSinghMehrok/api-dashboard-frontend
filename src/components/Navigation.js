import React from 'react'
import { Navbar, Dropdown, Avatar, Button, Badge } from 'flowbite-react';
import logo from '../assets/logo.jpeg'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const {getProfile, logout} = useAuth();
  const userInfo = getProfile();

	return (
		<Navbar
        fluid={true}
        rounded={true}
        className="border-b-2"
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
        {
          userInfo 
          ? <div className="flex items-center gap-4 md:order-2">
              { (('isAdmin' in userInfo) || userInfo.isModerator) &&
                <Badge
                  color={
                    ( () => {
                      if ('isAdmin' in userInfo) return 'purple';
                      if (userInfo.isModerator) return 'pink';
                    })()
                  }
                  size="lg"
                >
                  {( () => {
                      if ('isAdmin' in userInfo) return 'Admin';
                      if (userInfo.isModerator) return 'Moderator';
                    } )()
                  }
                </Badge>
              }
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="User settings" img="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" rounded={true}/>}
              >
                <Dropdown.Header>
                  <span className="block truncate text-sm font-medium">
                    {userInfo.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item>
                  Profile Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className='text-red-600' onClick={logout}>
                  Log out
                </Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
          
          : <div className="flex gap-1 md:gap-3 md:order-2">
              <Link to='/login'>
                <Button color="light">
                  Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button>
                  Signup
                </Button>
              </Link>
            </div>
        }

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
	)
}
