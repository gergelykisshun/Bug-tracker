import React from 'react'
import './Ticket.css';

const Ticket = ({info, initEditTicket}) => {
  const {title, description, priority} = info;
  return (
    <div className='ticket-card'>
      <div>
        <h3>{title}</h3>
        <h4>{priority}</h4>
      </div>
      <p>{description}</p>
      <button onClick={(e) => initEditTicket(e, info)} className='primary-btn edit-ticket-btn'>Edit ticket</button>
    </div>
  )
}

export default Ticket