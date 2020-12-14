import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const main = {
    marginLeft: "340px", /* Same as the width of the sidenav */
    fontSize: "28px", /* Increased text to enable scrolling */
    padding: "0px 10px",

  }

  const [usercount, setUsercount] = useState();
  const [taskcount, setTaskcount] = useState();

  useEffect(() => {
    axios.get('/user-count')
      .then(response => {
        // console.log(response.data);
        setUsercount(response.data);
        // setShow(true);
      })
      .catch(error => {
        console.log(error);
      }, [])
  })

  useEffect(() => {
    axios.get('/task-count')
      .then(response => {
        // console.log(response.data);
        setTaskcount(response.data);
        // setShow(true);
      })
      .catch(error => {
        console.log(error);
      }, [])
  })

  return (
    <div style={main}>
      <div className="row mt-5">
        <div className="col-lg-5 ml-5 mr-5" >

          <div className="card box-shadow2 bg-info mb-5">
            <div className="d-inline-block ml-4 pt-3 mt-2 pb-2 mb-2">
              <p>User Count: <strong>{usercount}</strong></p>
            </div>
          </div>

        </div>
        <div className="col-lg-5 ml-5 mr-5" >

          <div className="card box-shadow2 bg-info mb-5">
            <div className="d-inline-block ml-4 pt-3 mt-2 pb-2 mb-2">
              <p>Task Count: <strong>{taskcount}</strong></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );


}

export default Dashboard;