import React from 'react';
import Dashboard from './dashboard';
import Sidebar from './sidebar';

const Main = () => {


  const sidenav = {
    height: "100%",
    width: "160px",
    position: "fixed",
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: " #111",
    overflowX: "hidden",
    paddingTop: "20px"
  }

  const main = {
    marginLeft: "160px", /* Same as the width of the sidenav */
    fontSize: "28px", /* Increased text to enable scrolling */
    padding: "0px 10px"
  }

  return (
    <React.Fragment>
      <Sidebar />
      <Dashboard />

    </React.Fragment>


  );
}

export default Main;