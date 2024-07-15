import React from 'react'
import './Item.scss'
import { Info, ItemP } from '../StyledComponents/FormComp'

const Item = ({data,handleDelete}) => {
  return (
    <div>
        {data.map(item=>(
            <Info className='user-info' key={item.id}>
              <ItemP>First Name: {item.firstname}</ItemP>
              <ItemP>Last Name: {item.lastname}</ItemP>
              <ItemP>About: {item.about}</ItemP>
              <button className="delete" onClick={()=>{handleDelete(item.id)}}>Delete</button>
            </Info>
        ))}
    </div>
  )
}

export default Item