import React, {useState} from 'react'
import './Project.css';
import EditProject from '../EditProject/EditProject';

const Project = ({info}) => {
  const [isVisible, setIsVisible] = useState(false);

  const { name, description, assignedTo, tickets } = info;


  return (
    <div className='project-card'>
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className='workers'>
        <div style={{color: 'var(--primary-color)'}}>
          <h3>Managers</h3>
          {assignedTo.filter(person => person.role === 'manager').map(person => <p>{`${person.username}`}</p>)}
        </div>
        <div>
          <h3>Developers</h3>
          {assignedTo.filter(person => person.role === 'developer').map(person => <p>{`${person.username}`}</p>)}
        </div>
      </div>
      <div className='tickets'>
        {tickets.length > 0 ? tickets.map((ticket,i) => <p key={i}>{ticket.title} / {ticket.priority}</p>) : 'No tickets recorded!'}
      </div>
      <div className='buttons'>
        <button onClick={() => setIsVisible(prev => !prev)} className='primary-btn'>Edit</button>
      </div>      
    {isVisible && <EditProject setIsVisible={setIsVisible} info={info} />}
    </div>
  )
}

export default Project