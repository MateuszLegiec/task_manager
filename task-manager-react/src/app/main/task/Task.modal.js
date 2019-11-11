import {Button, Col, Modal, Row, Form} from "react-bootstrap";
import React, {Component} from "react";
import {taskService} from "../../service/task.service";
import Comment from "./Comment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";
import {priorityIcon} from "../util/PriorityIcon.mapper";
import {userService} from "../../service/user.service";

class TaskModal extends Component {

    state = {
        task: taskService.get(this.props.taskId),
        comments: taskService.getComments(this.props.taskId),
        statuses: taskService.getStatuses(),
        commentText: '',
        users: userService.getAll()
    };

    addComment(){taskService.addComment(this.state.task.id,this.state.commentText);};
    updateTask(event){
        let form = event.currentTarget;
        event.preventDefault();
        const changes = {
            assignedUser: form.assignedUser[form.assignedUser.selectedIndex].getAttribute('data-key'),
            status:  form.status[form.status.selectedIndex].getAttribute('data-key')
        };
        taskService.update(this.props.taskId,changes)
    }
    handleChange = (e) => {this.setState({commentText: e.target.value})};

    render() {
        return (
            <Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.state.task.title}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={(event) => this.updateTask(event)}>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <p><span className="font-weight-bold">Creation date: </span>{this.state.task.creationDate}</p>
                                <p><span className="font-weight-bold">Deadline: </span>{this.state.task.deadline}</p>
                                <p><span className="font-weight-bold">Ordered by: </span>{this.state.task.orderedBy}</p>
                                <p><span className="font-weight-bold">Assigned user: </span>
                                    <Form.Group controlId="assignedUser">
                                        <Form.Control size="sm" as="selectUser" className="w-75" defaultValue={this.state.task.assignedUser}>
                                            <option/>
                                            {
                                                this.state.users
                                                    .filter(user => !user.locked)
                                                    .map(user => <option value={user.email} key={user.email} data-key={user.email}>{user.firstName} {user.lastName} ({user.email})</option>)
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </p>
                            </Col>
                            <Col sm={6}>
                                <p><span className="font-weight-bold ml-3">Priority: </span>{priorityIcon(this.state.task.priority)} priority</p>
                                <p><span className="font-weight-bold ml-3">Status: </span>
                                    <Form.Group controlId="status">
                                        <Form.Control size="sm" as="select" className="ml-3 w-50" defaultValue={this.state.task.status}>
                                            <option/>
                                            {
                                                this.state.statuses
                                                    .map(status => <option data-key={status} value={status} key={status}>{status}</option>)
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </p>
                            </Col>
                        </Row>
                        <p>
                            <div className="m-5">{this.state.task.description}</div>
                        </p>
                        <Row className="justify-content-center">
                            <Col sm={10}>
                                <h4>Comments</h4>
                                {this.state.comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
                                <Row className="mt-5">
                                    <Col sm={11}><Form.Control as="textarea" rows="2" onChange={e => this.handleChange(e)} /></Col>
                                    <Col sm={1}><Button size="sm" variant="outline-primary" onClick={this.addComment}><FontAwesomeIcon icon={faPlus}/></Button></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    };
}
export default TaskModal;