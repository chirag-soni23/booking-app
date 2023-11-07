import React, { useEffect } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import axios from 'axios';

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  useEffect(()=>{
    if(!user){
      window.location.href = "/login"
    }

  },[])
  return (
    <div className='ml-3 mt-3'>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
        <h1>My Profile</h1>
        <br/>
        <h1>Name : {user.name}</h1>
        <h1>Email : {user.email}</h1>
        <h1>isAdmin: {user.isAdmin ? "Yes": "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
    <MyBooking/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;
const user = JSON.parse(localStorage.getItem("currentUser"))



export function MyBooking(){
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/bookings/getbookingsbyuserid", {
          userid: user._id
        });
        const rooms = response.data;
        console.log(rooms);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUserBookings(); 
  
  }, []);
  return(
    <div>
      <h1>My booking</h1>
    </div>
  )
}
