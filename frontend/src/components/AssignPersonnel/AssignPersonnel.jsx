import React from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import './AssignPersonnel.css';

const AssignPersonnel = ({info, assignToProject}) => {
  const {username, role} = info;

  return (
    <div className='person-container'>
      <div>
        <h2>{username}</h2>
        <p>{role}</p>
      </div>
      <AddBoxOutlinedIcon onClick={(e) => assignToProject(e, info)} className='add-person'/>
    </div>
  )
}

export default AssignPersonnel