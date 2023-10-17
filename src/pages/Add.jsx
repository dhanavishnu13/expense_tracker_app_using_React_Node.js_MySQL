import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const Add=()=> {
  const [note,setNote]=useState({
    date:"",
    category:"",
    payee:"",
    desc:"",
    amount:null,
    total:null,
    note:"",
  });

  const navigate=useNavigate()

  const handleChange=(e)=>{
    setNote((prev)=>({ ...prev, [e.target.name]:e.target.value}));
  };
  console.log(note)
  
  const handleClick =async e=>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/note",note)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='form'>
      <h2>Add New Payee {note.payee}</h2>
       {/* <label for="category" name='category'>Select Category:</label>
       <select id="category" name="category">
      <option value="expense" name="category">Expense</option>
      <option value="income" name='category'>Income</option>
    </select> */}
    <input
      type='text'
      placeholder='Enter category'
      onChange={handleChange}
      name='category'
      />
      <input
      type='date'
      placeholder='Enter Date'
      onChange={handleChange}
      name='date'
      />
      <input
      type='text'
      placeholder='Enter Payee Name'
      onChange={handleChange}
      name='payee'
      />
      <input
      type='text'
      placeholder='Add discription'
      onChange={handleChange}
      name='desc'
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
      
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add