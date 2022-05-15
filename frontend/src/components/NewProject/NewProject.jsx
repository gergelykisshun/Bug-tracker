import React, {useState, useEffect, useContext} from 'react'
import './NewProject.css';
import AssignPersonnel from '../AssignPersonnel/AssignPersonnel';
import AssignedToProject from '../AssignedToProject/AssignedToProject';
import {toastMessageContext} from '../Layout/Layout';
import CircularProgress from '@mui/material/CircularProgress';


const NewProject = () => {
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    assignedTo: []
  })

  const [allWorkers, setAllWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToastFn = useContext(toastMessageContext).showToast;


  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/users')
    .then(res => res.json())
    .then(data => {
      setAllWorkers(data.all)
      setTimeout(() => {setLoading(false)}, 1500)
    })
    .catch(err => console.log(err));
  }, [])

  const createProject = () => {
    fetch('/api/v1/project/new', {
      headers:{
        "Content-Type": "application/json"
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(newProject)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //empty fields
      setNewProject({
        name: '',
        description: '',
        assignedTo: []
      })
      //toast msg
      showToastFn('Project created successfully!');
    })
  };

  const assignToProject = (e, workerInfo) => {
    setNewProject(prev => {
      if(prev.assignedTo.every(worker => worker._id !== workerInfo._id)){
        return ({...prev, assignedTo: [...prev.assignedTo, workerInfo]})
      } else {
        //msg
        console.log('Worker already added!')
        return {...prev};
      }
  })
};

  const removeFromProject = (e, workerInfo) => {
    setNewProject(prev => {
      const newWorkers = prev.assignedTo.filter(worker => worker._id !== workerInfo._id);
      return {...prev, assignedTo: newWorkers};
    })
  }

  const inputHandler = (e) => {
    const {value, name} = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }))
  };


  return (
    <div className='general-container new-project-container'>
      <label>Project name
        <input type="text" name="name" value={newProject.name} onChange={inputHandler}/>
      </label>
      <label>Description
        <input type="text" name="description" value={newProject.description} onChange={inputHandler}/>
      </label>
      <div className='personnel-container'>
        {
        loading ?
        <CircularProgress style={{width:60,height:60,marginLeft:200}} /> :
        allWorkers.map(worker => <AssignPersonnel key={worker._id} assignToProject={assignToProject} info={worker} />)
        }
      </div>
      <div>
        <h3>Developers assigned to the project:</h3>
        <div className='assigned-workers-wrapper'>
          {newProject.assignedTo.length > 0 ? newProject.assignedTo.map(worker => <AssignedToProject info={worker} removeFromProject={removeFromProject} key={worker._id}/>) : 'Nobody assigned to project yet!' }
        </div> 
      </div>
      <button onClick={createProject} className='primary-btn'>Create Project</button>
    </div>
  )
}

export default NewProject;