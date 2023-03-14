import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import AdminSidebar from '../components/AdminSidebar';
import UsersList from '../components/UsersList';
import ApiUsersList from '../components/ApiUsersList';
import axios from '../api/axios';
import DUMMY_API_DATA from '../json/DUMMY_API_DATA.json';

const AdminDashboard = () => {
  const [showApiList, setShowApiList] = useState(false)
  const [apiUserData, setApiUserData] = useState([])
  const [apiList, setApiList] = useState([]);
  const { getToken, devLogin } = useAuth();


  useEffect(() => {
    // fetch the list of API's
    // store the response in array and pass to AdminSidebar
    try {
      const fetchApi = async () => {
        const result = await axios.get('/apis');
        setApiList(result.data.apis);
      }
      fetchApi();
    }
    catch {
      console.log("ERROR: While fetching API list")
    }
    return () => {
      return void setApiList([])
    }
  }, [])


  const handleFetchApiUsers = (value) => {
    const apiListVal = value === "showUserList" ? false : value;
    if (!apiListVal) return
    try {
      const fetchApiUserData = async () => {
        const token = getToken()
        const result = await axios.get(`/users?apiName=${apiListVal.name}`, 
          {
            headers: {
            // add the authorization 
            'Authorization': `Bearer ${token}` 
            }
          }
        ).catch(async error => 
          {
            if (error.response.status === 401 || error.response.status === 400) {
              await devLogin();
              fetchApiUserData();
            }
          }  
        );
        setApiUserData(result.data.users);
        // console.log(apiListVal.name, result.data.users);
      };
      setApiUserData([]);
      fetchApiUserData();
    }
    catch {
      console.log("ERROR: While fetching ApiUsersList from server")
    }

    setShowApiList(apiListVal);
  }


  return (
    <div className="flex flex-col h-full">
      <Navigation/>
      <div className="flex grow overflow-hidden ">
        <AdminSidebar apiList={apiList} handleFetchApiUsers={handleFetchApiUsers} />
        <div className='p-6 w-full h-full overflow-y-scroll'>
          {
            showApiList 
            ? <ApiUsersList apiName={showApiList.name} apiUserData={apiUserData} apiID={showApiList._id}/>
            : <UsersList/>
          }
        </div>
      </div>
    </div>
  );
}


export default AdminDashboard;