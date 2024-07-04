import React,{useState,useContext,useEffect} from 'react'
import './Profile.scss'
import { AuthContext } from '../../Context/Auth'
import { useNavigate } from 'react-router'

const Profile = () => {
    const {user,login} = useContext(AuthContext); //local storage user
    const [updates,setUpdates]=useState({
        firstname:'',
        lastname:'',
        username:'',
        dob:'',
        email:''
    });

    const navigate = useNavigate();
    useEffect(()=>{ 
        if(user) setUpdates(user) 
    },[user])

    const handleChange = (e) => {
        setUpdates({
            ...updates,[e.target.name]:e.target.value
        })
    };

    const handleSubmit = async () => {
        e.preventDefault();
        try{
            const response = await fetch (`http://localhost:7000/data?email=${user.email}`)
            const [existingUser] = await response.json(); //array of object, existinguser is object in array
            if(existingUser){
                const updatedUser = {...existingUser,...updates}; //existinguser values updated by updates 
                await fetch(`http://localhost:7000/data/${existingUser.id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(updatedUser)
                });
                login(updatedUser)
                navigate('/')
            }
        }
        catch (err){
            console.log("error is:",err)
        }
    }

    const handleDelete = () => {
        fetch(`http://localhost:7000/data/${user.id}`,{
            method:'DELETE'
        }).then( res => {
            if(res.ok){console.log("deleted")}
            else console.log("deletion failed")
        }).catch(err => {
            console.log("error",err)
        })
        navigate('/register');       
    };

    if(!user) return <div>Loading...</div>;
    return (
        <div className='profile'>
            <p>Welcome to Your Profile</p>
            <div className="content">
                <div className="left">
                    <p>Hi {user.firstname}</p>
                    <p>Here you can view your profile.</p>
                    <p>Edit your details also..!</p> 
                </div>
                <div className="right">
                    <form className='forms'>
                            <div className="block">
                                <label>Firstname: </label>
                                <input type="text" name='firstname' value={updates.firstname} onChange={handleChange}/>
                            </div>
                            <div className="block">
                                <label>Lastname:</label>
                                <input type="text" name='lastname' value={updates.lastname} onChange={handleChange}/>
                            </div>
                            <div className="block">
                                <label>Username:</label>
                                <input type="text" name='username' value={updates.username} onChange={handleChange}/>
                            </div>
                            <div className="block">
                                <label>Email:</label>
                                <input type="email" name='email' value={updates.email} onChange={handleChange}/>
                            </div>
                            <div className="block">
                                <label>DOB:</label>
                                <input type="date" name='dob' value={updates.dob} onChange={handleChange}/>
                            </div>
                    </form>
                </div>
            </div>
            <button className="update" onClick={handleSubmit} >Update</button>
            <button className="delete" onClick={handleDelete} >Delete Account</button>
        </div>
    )
}

export default Profile