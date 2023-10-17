import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import './style.css'

const Books=()=> {
  const [notes, setNotes]= useState([]);
  const totalamount=0;

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

  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });

  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilter({ ...dateFilter, [name]: value });
  };

  const filteredNotes = notes.filter((note) => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      return true; // No filter applied, show all notes
    }

    const noteDate = new Date(note.date);

    const startDate = new Date(dateFilter.startDate);
    const endDate = new Date(dateFilter.endDate);

    let totalAmount = 0;

    // Loop through filteredNotes to calculate the total amount
    filteredNotes.forEach((note) => {
      totalAmount += parseFloat(note.amount); // Assuming amount is a string, convert it to a float for addition
    });

    

    return noteDate >= startDate && noteDate <= endDate;
  });

  const filtered = notes.filter((note) =>  {
    // Initialize a variable to store the total amount
    let totalAmount = 0;
  
    // Loop through filteredNotes to calculate the total amount
    filteredNotes.forEach((note) => {
      totalAmount += parseFloat(note.amount); // Assuming amount is a string, convert it to a float for addition
    })});

  

  return (
    <div>
      <h1>My Expense</h1>
      <div className='notes'>
      <div>
      <h1>Notes</h1>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={dateFilter.startDate}
          onChange={handleDateFilterChange}
        />
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={dateFilter.endDate}
          onChange={handleDateFilterChange}
        />
        <button onClick={() => setDateFilter({ startDate: '', endDate: '' })}>
          Clear Filter
        </button>
        <h3>Check Total amount for a month, set the date first!</h3>
      </div>
      <table className="notes-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Payee</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map((note) => (
            <tr className="note" key={note.sno}>
              <td>{note.date}</td>
              <td>{note.category}</td>
              <td>{note.payee}</td>
              <td>{note.desc}</td>
              <td>{note.amount}</td>
              <td>
                <button className="delete" onClick={() => handleDelete(note.sno)}>
                  Delete
                </button>
                <button className="update">
                  <Link to={`/update/${note.sno}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <div>
        {/* <strong>Total Amount: {totalAmount.toFixed(2)}</strong> Display total amount with two decimal places */}
      </div>
    </div>

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