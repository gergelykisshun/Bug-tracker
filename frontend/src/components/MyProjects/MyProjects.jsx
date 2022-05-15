import React, {useState, useEffect} from 'react'
import Project from '../Project/Project';
import './MyProjects.css';
import CircularProgress from '@mui/material/CircularProgress';

const MyProjects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/v1/project/my-projects')
    .then(res => res.json())
    .then(data => {
      console.log(data.projects);
      if(data.projects){
        setProjects(data.projects);
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      }
    })
  }, [])


  return (
    <>
      {loading ?
       <CircularProgress style={{width:60,height:60}} /> :
      <div className='general-container my-projects'>
        {
        projects.length > 0 ? 
          projects.map((project) => <Project key={project._id} info={project} />) :
          'You have no active projects!'
        }
      </div>
      }
    </>
  )
}

export default MyProjects;