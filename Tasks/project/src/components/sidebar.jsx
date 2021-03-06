import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignTask from './assignTask';
import { Button } from 'react-bootstrap';

const Sidebar = () => {

    // const count = 0;
    const sidenav = {
        height: "100%",
        width: "300px",
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        backgroundColor: "#e9ecef",
        overflowX: "hidden",
        paddingTop: "20px"
    }

    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showuser, setShowuser] = useState(false);
    const [showtask, setShowtask] = useState(false);
    const [showModal, setShow] = useState(false);

    const getUser = e => {
        e.preventDefault();
        setShowtask(false);
        // console.log(state);
        axios.get('/users')
            .then(response => {
                console.log('Users')
                console.log(response.data[0].name);
                setUsers(response.data);
                setShowuser(true);
            })
            .catch(error => {
                console.log(error);
            }, [])


    }

    const getTask = e => {
        e.preventDefault();
        // console.log(state);
        setShowuser(false);
        axios.get('/tasks')
            .then(response => {
                console.log('Tasks')
                console.log(response.data);
                setTasks(response.data);
                setShowtask(true);
            })
            .catch(error => {
                console.log(error);
            }, [])


    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = () => setShow(false);


    return (
        <div className="sidenav" style={sidenav}>
            <button className="pl-4 pr-4 ml-5 bg-info" onClick={getUser}><strong>Users</strong></button>
            <button className="pl-4 pr-4 ml-3 mr-2 bg-info" onClick={getTask}><strong>Tasks</strong></button>

            {
                showuser ?
                    <p className="mt-3">{
                        users.map(user => <ul key={user._id}>
                            <li>{user.name}
                            <Button className="btn-shadow-2 ml-4" variant="primary"  onClick={handleShow}  >
                        + Assign Task
                    </Button>
                    <AssignTask user_id={user._id} user_email={user.email} show={showModal} onHide={handleClose} onSubmit={handleSubmit}></AssignTask></li>
                        </ul>)
                    }</p>
                    : (showtask ?
                        <p className="mt-3">{
                            tasks.map(task => <ul key={task._id}>
                                <li>{task.task_name}</li>
                            </ul>)
                        }</p>
                        : null)
            }

        </div>
    );
}

export default Sidebar;