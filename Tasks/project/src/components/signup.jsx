import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {

  const [state, setState] = useState({
    name:'',
    email: '',
    password: ''
  });

  const history = useHistory();


  const submitHandler = e => {
    e.preventDefault();
    axios.post('/signup', state)
      .then(response => {
        console.log(response.data);
        history.push('/login')
      
      })
      .catch(error => {
        console.log(error);
        alert(error)
      })
    setState({
      name:'',
      email: '',
      password: ''
    })
  }


  return (

    <div className="card mr-auto ml-auto" style={{ height: 500, width: 500, boxShadow: '1px 1px 10px #888888', background: '#f8f9fa!important;', marginTop: 200 }}>
      <form className="p-4" onSubmit={submitHandler}>
        <h4 className="text-uppercase">
          <strong>Sign Up</strong>
        </h4>
        <br />
        <div className="form-group mb-5">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="name" name="state[name]" value={state.name} onChange={e => setState({ ...state, name: e.target.value })} />
        </div>
        <div className="form-group mb-5">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" name="state[email]" value={state.email} onChange={e => setState({ ...state, email: e.target.value })} />
        </div>
        <div className="form-group mb-5">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" name="state[password]" value={state.password} onChange={e => setState({ ...state, password: e.target.value })} />
        </div>
         <button type="submit" className="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  );
}

export default Signup;