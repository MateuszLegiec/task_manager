import React, {Component} from 'react';
import { Col, Container} from "react-bootstrap";
import ToDoTask from "./ToDoTask";
import {taskService} from "../../service/task.service";
import {authService} from "../../service/auth.service";
import OrderedTask from "./OrderedTask";

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: taskService.getAll(),
            value: ''
        };
    }

    render() {
        return (
            <Container>
                <Col sm={12}>
                    <h6 className="text-right m-3">Signed as: {authService.getCurrentUser().firstName} {authService.getCurrentUser().lastName} ( {authService.getCurrentUser().email} )</h6>
                    <h1 className="font-weight-bold mt-4 mb-4">Your tasks</h1>
                    <h4 className="mt-4 ml-1">Assigned to you</h4>
                    {this.state.tasks
                        .filter(task => task.assignedUser.includes(authService.getCurrentUser().email))
                        .sort((a,b) => (a.priority < b.priority))
                        .map(task => <ToDoTask key={task.id} task={task} openTask={this.props.openTask}/>)
                    }
                    <h4 className="mt-4 ml-1">Ordered tasks</h4>
                    {this.state.tasks
                        .filter(task => task.orderedBy.includes(authService.getCurrentUser().email))
                        .sort((a,b) => (a.priority < b.priority))
                        .map(task => <OrderedTask key={task.id} task={task} openTask={this.props.openTask}/>)
                    }
                </Col>
            </Container>
        );
    }
}
export default Account;