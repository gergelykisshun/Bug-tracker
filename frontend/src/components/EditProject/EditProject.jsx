import React, {useState, useContext} from 'react'
import './EditProject.css';
import Ticket from '../Ticket/Ticket';
import {toastMessageContext} from '../Layout/Layout'

const EditProject = ({setIsVisible, info}) => {
  const { _id ,name, description, assignedTo, tickets } = info;

  const showToastMessage = useContext(toastMessageContext).showToast;

  const [ticketStage, setTicketStage] = useState(false);
  const [createTicket, setCreateTicket] = useState({
    title: '',
    priority: 'Low',
    description: '',
    projectId: _id
  })

  const removeOverlay = () => {
    setIsVisible(prev => !prev);
  };

  const newTicketInit = () => {
    setTicketStage(prev => !prev);
  };

  const sendNewTicket = () => {
    fetch('/api/v1/project/new-ticket', {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(createTicket)
    }).then(res => res.json())
    .then(data => {
      if (data.success){
        window.location.href = '/my-projects';
        showToastMessage(`${data.success}`)
      }
    })
  };

  const inputHandler = (e) => {
    const {value, name} = e.target;
    setCreateTicket(prev => ({...prev,[name]: value }))
  };

  const initEditTicket = (e, ticketInfo) => {
    setCreateTicket(prev => ({
      ...prev,
      title: ticketInfo.title,
      description: ticketInfo.description,
      priority: ticketInfo.priority
    }))
    setTicketStage(prev => !prev);
  };

  return (
    <section className='overlay'>
      <div className='general-container'>
        {ticketStage ? 
        <div className='login-form create-ticket-form'>
          <h3 style={{color:'var(--text-active)'}}>Writing a new ticket for <span style={{color:'var(--primary-color)'}}>{name}</span></h3>
          <label>Title
          <input type="text" name="title" onChange={inputHandler} value={createTicket.title}/>
          </label>
          <label>Priority
            <select name="priority" onChange={inputHandler} value={createTicket.priority}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>Description
          <textarea name="description" cols="30" rows="10" className='desc-text' onChange={inputHandler} value={createTicket.description}></textarea>
          </label>
          <div className='ticket-btns'>
            <button onClick={sendNewTicket} className='primary-btn'>Confirm</button>
            <button onClick={() => setTicketStage(prev => !prev)} className='secondary-btn'>Back</button>
          </div>
        </div> :
        <div className='project-overview'>
          <div className='workers-on-ticket'>
            <div style={{color: 'var(--primary-color)'}}>
              <h3>Managers</h3>
              {assignedTo.filter(person => person.role === 'manager').map(person => <p>{`${person.username}`}</p>)}
            </div>
            <div>
              <h3>Developers</h3>
              {assignedTo.filter(person => person.role === 'developer').map(person => <p>{`${person.username}`}</p>)}
            </div>
          </div>
          <div>
            {tickets.map((ticket, i) => <Ticket key={i} initEditTicket={initEditTicket} info={ticket}/>)}
          </div>
          <div className='ticket-btns'>
            <button onClick={newTicketInit} className='primary-btn'>New Ticket</button>
            <button onClick={removeOverlay} className='secondary-btn'>Back</button>
          </div>
        </div>
        }
      </div>
    </section>
  )
}

export default EditProject;