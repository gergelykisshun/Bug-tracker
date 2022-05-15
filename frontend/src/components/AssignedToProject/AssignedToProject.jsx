import React from 'react'
import './AssignedToProject.css';
import ClearIcon from '@mui/icons-material/Clear';

const AssignedToProject = ({info, removeFromProject}) => {


  return (
    <div className='assigned-worker-container'>
      <p>{`${info.username}, ${info.role}`}</p>
      <ClearIcon style={{color: 'var(--primary-color)', cursor: 'pointer'}} onClick={(e) => removeFromProject(e, info)}/>
    </div>
  )
}

export default AssignedToProject