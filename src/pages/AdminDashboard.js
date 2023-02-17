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
  const [apiList, setApiList] = useState(Object.values(DUMMY_API_DATA));
  console.log(apiList)

  useEffect(() => {
    // fetch the list of API's
    // store the response in array and pass to AdminSidebar
    try {
      const fetchApi = async () => {
        const result = await axios.get('/apis');
        setApiList(result.apis);
      }
      fetchApi();
    }
    catch {
      console.log("ERROR: While fetching API list")
    }
  }, [])

  const handleFetchApiUsers = (value) => {
    // if false, show users list
    // if any other value is passed, consider it will always be api id
    // use this api id and fetch it's data for display 
    // (done by the API user list component)
    setShowApiList(value === "showUserList" ? false : value)
  }

  return (
    <div className="flex flex-col h-full">
      <Navigation/>
      <div className="flex grow overflow-hidden ">
        <AdminSidebar apiList={apiList} handleFetchApiUsers={handleFetchApiUsers} />
        <div className='p-6 w-full h-full overflow-y-scroll'>
          {
            showApiList 
            ? <ApiUsersList apiName={showApiList.name} apiID={showApiList._id}/>
            : <UsersList/>
          }
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;