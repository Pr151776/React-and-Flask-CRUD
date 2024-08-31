import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


export const Home = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    function getUser(){
        axios.get("http://127.0.0.1:5000/user").then(function(res) {
            // console.log(res.data);
            setUser(res.data);
        });
    };

    const deleteUser = (id) => {
        axios.delete(`http://127.0.0.1:5000/deleteuser/${id}`).then(function(res){
            // console.log(res.data);
            getUser();
        })
        confirm("Are you sure to delete ?");
    };
    
  return (
    <>
    <div className='container vh-100'>
        <h1 className='mt-5 text-primary'>React And Python Flask CRUD</h1>
        <hr />
        <Link to='/adduser' className='btn btn-dark'>Add User</Link>
        <table className="table table-bordered mt-5">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {user.map((users,index)=>
                    <tr key={index}>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.email}</td>
                        <td>
                            <Link to={`user/${users.id}/update`} className='btn btn-success' style={{marginRight:"10px"}}>Edit</Link>
                            <button onClick={()=> deleteUser(users.id)} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
    </>
  )
};
