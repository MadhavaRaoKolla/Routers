import React,{useState,useContext,useEffect} from 'react'
import './Profile.scss'
import { AuthContext } from '../../Context/Auth'
import { useNavigate } from 'react-router'
import { ItemP, P } from '../../Components/StyledComponents/FormComp'
import styled from 'styled-components'

const Profile = () => {
    const {user,login,logout} = useContext(AuthContext); //local storage user
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

    const handleDelete =async () => {

        //deleting data of inner form
        try {
            const data = await fetch (`http://localhost:3000/data/?user_id=${user.id}`)
            const userData = await data.json();
            if(!userData) throw new Error ("Fetching Failed....")
            for(let i=0;i<userData.length;i++){
                try {
                    const del= await fetch (`http://localhost:3000/data/${userData[i].id}`,{
                      method:'DELETE',       
                    });
                    if(!del.ok) {throw new Error ("Deleting Failed...")}
                } catch (error) {
                    console.log("Error:",error)
                }
            }
        } catch (error) {
            console.log("error:",error);
        }

        //deleting user details
        try {
            const data = await fetch (`http://localhost:7000/data/${user.id}`,{
                method:'DELETE',
            })
            if(!data.ok) throw new Error ("User deleting failed...")
            localStorage.removeItem('user');
            logout();
        } catch (error) {
            console.log("Error",error)
        }
        navigate('/register');
    }

    if(!user) return <div>Loading...</div>;
    return (
        <ProfileDiv className='profile'>
            <P>Welcome to Your Profile</P>
            <div className="content">
                <div className="left">
                    <ItemP>Hi {user.firstname}</ItemP>
                    <ItemP>Here you can view your profile.</ItemP>
                    <ItemP>And can edit your details also..!</ItemP> 
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
        </ProfileDiv>
    )
}

const ProfileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    min-width: 40rem;
    box-shadow: 0px 0px 2px var(--color-7);
    background: linear-gradient(100deg,var(--color-3),var(--color-2));  
    font-weight: bold;
`;

export default Profile