import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Userpanel = () => {
    const id = localStorage.getItem('user_id');
    console.log(id)
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/tasks/${id}`)
      .then(res => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
    return ( 
     <div>
        <h1>List of user tasks</h1>
        <p>
            {
              tasks.map(task => <ul key={task._id}>
                <li>{task.task_name}</li>
              </ul>)
            }
        </p>
     </div>
     );
}
 
export default Userpanel;