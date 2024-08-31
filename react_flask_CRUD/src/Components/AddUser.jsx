import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AddUser = () => {
    const [inputs,setInputs] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]:value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:5000/addUser",inputs).then(function(res){
            // console.log(res.data);
            navigate("/");
        });
    };
  return (
    <>
    <div className='container mt-5'>
        <div className="row col-6">
            <h1>New User Add</h1>
            <hr className='mb-5' />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">User Name</label>
                    <input type="text" name='name' className='form-control' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' className='form-control' onChange={handleChange} />
                </div>
                <button type='submit' name='addUser' className='btn btn-primary'>Save</button>
            </form>
        </div><div className="col-2"></div>
    </div>
    </>
  )
};
