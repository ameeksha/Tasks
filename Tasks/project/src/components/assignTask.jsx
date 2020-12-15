import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';


const AddTask = (props) => {

  const [state, setState] = useState({
    user_id: props.user_id,
    user_email: props.user_email,
    task_name:'' ,
    project_name: '',
    status: ''
  });

  const submitHandler = e => {
    e.preventDefault();
    console.log(state);
    axios.post('/tasks', state)
      .then(response => {
        console.log(response.data);
        // history.push('/login')

      })
      .catch(error => {
        console.log(error);
        alert(error)
      })
    setState({
      user_id: '',
      user_email: '',
      task_name:'' ,
      project_name: '',
      status: ''
    })
// alert('assigned task')
  }

  return (


    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title><strong>Assign New Task</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="block">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner">
                <div className="form" >
                  <div className="card-body">
                    <form onSubmit={submitHandler}>
                     
                        <div className="form-group">
                          {/* <label className="text-secondary"><strong>PROJECT NAME</strong></label> */}
                          <input type="hidden" formControlName="user_id" className="form-control" name="state[user_id]" value={state.user_id} onChange={e => setState({ ...state, user_id: e.target.value })} required/>
                        </div>
                        <div className="form-group">
                          <input type="hidden" formControlName="user_email" className="form-control" name="state[user_email]" value={state.user_email} onChange={e => setState({ ...state, user_email: e.target.value })} required/>
                        </div>
  
                        <div className="form-group">
                          <label>Task Name</label>
                          <input type="text" formControlName="task_name" className="form-control" name="state[task_name]" value={state.task_name} onChange={e => setState({ ...state, task_name: e.target.value })} required/>
                        </div>
                        
                      <div className="form-group">
                          <label>Project Name</label>
                          <input type="text" formControlName="project_name" className="form-control" name="state[project_name]" value={state.project_name} onChange={e => setState({ ...state, project_name: e.target.value })} required/>
                        </div>
                    

                      <div className="form-group">
                        <label>Status</label>
                        <input type="text" formControlName="status" className="form-control" name="state[status]" value={state.status} onChange={e => setState({ ...state, status: e.target.value })} required/>
                      </div>

                      <button className="btn-warning btn-shadow col-xl-12">
                        <span className="small"> <i className="icmn-plus"></i> Assign Task</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Modal.Body>
    </Modal>
  );
}

export default AddTask;

