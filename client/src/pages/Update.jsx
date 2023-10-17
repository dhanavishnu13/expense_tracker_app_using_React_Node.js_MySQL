import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom"

const Update=()=> {
  const [note,setNote]=useState({
    date:"",
    category:"",
    payee:"",
    desc:"",
    amount:null,
    total:null,
    note:"",
  });
  // const [oldnote,setOldnote]= useState([])

  const navigate=useNavigate()
  const location=useLocation()
  console.log(location.pathname)
  const sno = location.pathname.split("/")[2]

  // useEffect(()=>{
    
  //   const fetchNote= async ()=>{
  //     const sno = location.pathname.split("/")[2]
  //       try{
  //         const res=await axios.get("http://localhost:8800/note/"+1);
  //         console.log(res)
  //         setOldnote(res.data);
  //       }catch(err){
  //         console.log(err);
  //       }
  //   }
  //   fetchNote()
  // },[]);

  const handleChange=(e)=>{
    setNote((prev)=>({ ...prev, [e.target.name]:e.target.value}));
  };
  
  const handleClick =async e=>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/note/"+sno,note)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='form'>
      <h2>Update {note.payee}</h2>
      <input
      type='date'
      placeholder='Enter Date'
      onChange={handleChange}
      name='date'
      />
      <input
      type='text'
      placeholder='Enter Category'
      onChange={handleChange}
      name='category'
      />
      <input
      type='text'
      placeholder='Enter Payee Name'
      onChange={handleChange}
      name='payee'
      />
      <input
      type='number'
      placeholder='Enter the Amount'
      onChange={handleChange}
      name='amount'
      />
      <input
      type='number'
      placeholder='Enter the Total'
      onChange={handleChange}
      name='total'
      />
      <input
      type='text'
      placeholder='Add short note'
      onChange={handleChange}
      name='note'
      />
      
      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update