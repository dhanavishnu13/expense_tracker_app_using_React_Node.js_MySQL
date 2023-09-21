import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Books=()=> {
  const [notes, setNotes]= useState([]);

  useEffect(()=>{
    const fetchAllNotes= async ()=>{
        try{
          const res=await axios.get("http://localhost:8800/note");
          // console.log(res)
          setNotes(res.data);
        }catch(err){
          console.log(err);
        }
    }
    fetchAllNotes()
  },[]);

  const handleDelete= async (sno)=>{
    try{
      await axios.delete("http://localhost:8800/note/"+sno);
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <h1>My Expense</h1>
      <div className='notes'>
        {notes.map(note=>(
          <div className="note" key={note.sno}>
            {/* {book.cover && <img src="" alt="" />} */}
            <h2>{note.payee}</h2>
            <p>{note.desc}</p>
             <span>{note.amount}</span>
             <button className='delete' onClick={()=>handleDelete(note.sno)}>Delete</button>
             <button className='update'><Link to={`/update/${note.sno}`}>Update</Link></button>
          </div>
        ))}

        <button>
        <Link to="/add" >
        Add new book
        </Link>
      </button>
      </div>
      
    </div>
  );
}

export default Books