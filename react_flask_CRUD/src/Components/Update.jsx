import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';

export const Update = () => {
    const [inputs,setInputs] = useState([])

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    function getUser(){
        axios.get(`http://127.0.0.1:5000/listuser/${id}`).then(function(res) {
            setInputs(res.data);
        });
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values=> ({...values, [name]:value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://127.0.0.1:5000/updateuser/${id}`, inputs).then(function(res){
            // console.log(res.data);
            navigate('/');
        });
    };


  return (
    <>
    <div className='container mt-5'>
        <div className="row col-6">
            <h1>Update User</h1>
            <hr className='mb-5' />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">User Name</label>
                    <input type="text" name='name' value={inputs.name} className='form-control' onChange={handleChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={inputs.email} className='form-control' onChange={handleChange}  />
                </div>
                <button type='submit' name='updateUser' className='btn btn-primary'>Update</button>
            </form>
        </div><div className="col-2"></div>
    </div>
    </>
  )
};
