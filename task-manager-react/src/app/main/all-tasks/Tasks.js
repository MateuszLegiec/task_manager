import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";
import Task from "./Task";
import NewTaskModal from "./NewTask.modal";
import {taskService} from "../../service/task.service";
import {authService} from "../../service/auth.service";

class Tasks extends Component {

    state = {
        showModal: false,
        searchText: '',
        searchStatus: '',
    };

    handleTextSearch(event){this.setState({searchText: event.target.value});};
    handleSelectSearch(event){this.setState({searchStatus: event.target.value})}
    setModalShow = () => {this.setState({showModal: !this.state.showModal});};

    render() {
        return (
            <Container>
                <Col sm={12}>
                    {authService.getCurrentUser().admin ? <Button variant="outline-primary" className="mt-5 w-100" onClick={this.setModalShow}>Add task <FontAwesomeIcon icon={faPlus}/></Button> : null}
                    <NewTaskModal
                        show={this.state.showModal}
                        onHide={this.setModalShow}
                    />
                    <Row className="mt-5">
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="Find task..." onChange={e => this.handleTextSearch(e)}/>
                        </Col>
                        <Col sm={3}>
                            <Form.Control as="select" onChange={e => this.handleSelectSearch(e)}>
                                <option/>
                                {taskService.getStatuses().map(status => <option key={status}>{status}</option>)}
                            </Form.Control>
                        </Col>
                    </Row>
                    {taskService.getAll()
                        .filter(task => task.title.includes(this.state.searchText) || task.assignedUser.includes(this.state.searchText))
                        .filter(task => task.status.includes(this.state.searchStatus))
                        .sort((a,b) => (a.priority < b.priority))
                        .map(task => <Task key={task.id} task={task} openTask={this.props.openTask}/>)
                    }
                </Col>
            </Container>
        );
    }
}
export default Tasks;
