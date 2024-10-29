/*import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { userContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import HandleLogout from './HandleLogout'
import axios from 'axios'
const UserStatus = () => {
  const {user,status,setStatus}=useContext(userContext);
  const navigate=useNavigate();
  const [allUser,setAllUser]=useState();
 
  const handleStatus=(id)=>{
    // console.log(allUser)
    // console.log(id);
       axios.post(`/update-status`,{id:id})
            .then(res=>setStatus(res.data))   
            .catch(err=>console.log(err));
            // window.location.reload();
            
  }


useEffect(()=>{
    
  axios.get('/user')
       .then(res=>setAllUser(res.data))
       .catch(err=>console.log(err));


  axios.get('/profile')
  .then(res=>{
  //  console.log(res.data)
 if(res.data==='null'){
   navigate('/login')
 }
 })
  .catch(err=>console.log(err));
},[allUser]);


// console.log(allUser)
  return (
    <div>
  
      <table>
        <tr><th>username</th><th>status</th></tr>
        {allUser?
        allUser.map(Element=>{
          return Element.email==="amarenibret292@gmail.com"?"":<tr><td>{Element.email}</td><td>{Element.status}<button onClick={()=>handleStatus(Element._id)} >status</button></td></tr>
        })
        :""}
      </table>
    </div>
  )
}

export default UserStatus
*/
import '../style/userstatus.css'
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { userContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserStatus = () => {
  const { user, status, setStatus } = useContext(userContext);
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState();

  const handleStatus = (id) => {
    axios.post(`/update-status`, { id: id })
      .then(res => setStatus(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('/user')
      .then(res => setAllUser(res.data))
      .catch(err => console.log(err));

    axios.get('/profile')
      .then(res => {
        if (res.data === 'null') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [allUser]);

  return (
    <div className="user-status-container">
      <table className="user-status-table">
        <thead>
          <tr className="user-status-header">
            <th className="user-status-th">Username</th>
            <th className="user-status-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {allUser ? allUser.map(Element => {
            return Element.email === "amarenibret292@gmail.com"||Element.usertype==="seller" ? "" : (
              <tr key={Element._id} className="user-status-row">
                <td className="user-status-tm">{Element.email}</td>
                <td className={`user-status-td ${Element.status === 'on' ? 'status-on' : 'status-off'}`}>
                  {Element.status}
                  <button className="status-button" onClick={() => handleStatus(Element._id)}>Change Status</button>
                </td>
              </tr>
            )
          }) : ""}
        </tbody>
      </table>
    </div>
  )
}

export default UserStatus;
