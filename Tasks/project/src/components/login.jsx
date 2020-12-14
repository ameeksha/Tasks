import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link, Route, Switch } from 'react-router-dom';


const Login = () => {

  const [state, setState] = useState({
    email: '',
    password: '',
    login: false,
    store: null
  });

  const history = useHistory();


  const submitHandler = e => {
    e.preventDefault();
    axios.post('/login', state)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('login', JSON.stringify({
          login: true,
          user_id: response.data.data.id,
          user_email: response.data.data.email
        }))
        history.push('/main')

      })
      .catch(error => {
        console.log(error);
        alert(error)
      })
    setState({
      email: '',
      password: ''
    })
  }


  return (

    <React.Fragment>
      <div className="card mr-auto ml-auto" style={{ height: 500, width: 500, boxShadow: '1px 1px 10px #888888', background: '#f8f9fa!important;', marginTop: 200 }}>
        <form className="p-4" onSubmit={submitHandler}>
          <h4 className="text-uppercase">
            <strong>Sign In</strong>
          </h4>
          <br />
          <div className="form-group mb-5">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" name="state[email]" value={state.email} onChange={e => setState({ ...state, email: e.target.value })} />
          </div>
          <div className="form-group mb-5">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" name="state[password]" value={state.password} onChange={e => setState({ ...state, password: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-2">Submit</button>
          <Link to='/signup'>Sign Up</Link>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;