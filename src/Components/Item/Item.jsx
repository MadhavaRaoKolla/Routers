import React, { useContext } from 'react'
import './Item.scss'
import { Info, ItemP } from '../StyledComponents/FormComp'
import { AuthContext } from '../../Context/Auth'

const Item = ({ data, handleDelete, handleEdit }) => {
  const { user } = useContext( AuthContext );
  return (
    <div>
        {data.map(item => (
            <Info className='user-info' key={item.id}>
              <ItemP>First Name: {item.firstname}</ItemP>
              <ItemP>Last Name: {item.lastname}</ItemP>
              <ItemP>Gender: {item.gender}</ItemP>
              <ItemP>Email: {item.email}</ItemP>
              <ItemP>About: {item.about}</ItemP>
              { user.role==='Admin' && (
                <>
                  <button className="delete" onClick={()=>{handleDelete(item.id)}}>Delete</button>
                  <button className='update' onClick={()=> {handleEdit(item)}}>Update</button>
                </>
              )}
            </Info>
        ))}
    </div>
  )
}

export default Item