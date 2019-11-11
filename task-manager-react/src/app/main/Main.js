import React, {Component} from 'react';
import {Tab, Row, Col, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser , faTasks , faCog} from '@fortawesome/fontawesome-free-solid';
import Admin from "./admin/Admin";
import Tasks from "./all-tasks/Tasks";
import Account from "./account/Account";
import {authService} from "../service/auth.service";
import TaskModal from "./task/Task.modal";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskId: null,
            showModal: false
        };
        this.openModal = this.openModal.bind(this)
    }


    openModal(taskId){
        this.setState({
            showModal: true,
            taskId: taskId
        })
    };

    closeModal = () => {this.setState({showModal: false, taskId: null});};

    render() {
        return (
            <div>
                <TaskModal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    taskId={this.state.taskId}
                />
                <Tab.Container id="left-tabs-example">
                    <Row>
                        <Col xs={3} sm={2} lg={1} className="mt-5">
                            <Nav variant="pills" className="flex-column" id="side">
                                <Nav.Item className="m-3">
                                    <Nav.Link eventKey="account" className="text-center"><FontAwesomeIcon
                                        icon={faUser}/></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="m-3">
                                    <Nav.Link eventKey="tasks" className="text-center"><FontAwesomeIcon
                                        icon={faTasks}/></Nav.Link>
                                </Nav.Item>
                                {authService.getCurrentUser().admin ?
                                    <Nav.Item className="m-3">
                                        <Nav.Link eventKey="admin" className="text-center"><FontAwesomeIcon
                                            icon={faCog}/></Nav.Link>
                                    </Nav.Item>
                                    : null
                                }
                            </Nav>
                        </Col>
                        <Col xs={9} sm={10} lg={11}>
                            <Tab.Content>
                                <Tab.Pane eventKey="account">
                                    <Account openTask={this.openModal}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="tasks">
                                    <Tasks openTask={this.openModal}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="admin">
                                    <Admin/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
};
export default Main;