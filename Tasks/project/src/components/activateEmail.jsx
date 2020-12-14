import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link, Route, Switch } from 'react-router-dom';


const Home = ({ match }) => {

  const count = 1;
  const [state, setState] = useState({
    token: match.params.id,

  });

  const history = useHistory();


  const submitHandler = e => {

    e.preventDefault();
    axios.post('/activate-account', state)
      .then(response => {
        console.log(response.data);
        alert("Account Successfully Activated")

      })
      .catch(error => {
        console.log(error);
        alert(error)
      })
    setState({
      token: '',

    })
  }


  return (

    <React.Fragment>

      <form className="p-4" onSubmit={submitHandler}>


        <input type="hidden" className="form-control" placeholder="Enter token" name="state[token]" value={state.token} onChange={e => setState({ ...state, token: e.target.value })} />

        <button type="submit" className="btn btn-primary btn-block mt-4">Activate Account</button>

      </form>

    </React.Fragment>
  );
}

export default Home;