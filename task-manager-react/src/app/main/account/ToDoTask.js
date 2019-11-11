import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import {priorityIcon} from "../util/PriorityIcon.mapper";

const ToDoTask = (props) => {
        return (
            <div className="shadow-sm hover cursor-pointer" onClick={() => props.openTask(props.task.id)}>
                <Container>
                    <Row className="mt-3 pt-2 pb-2">
                        <Col sm={3}><i className="font-weight-bold">Title: </i> {props.task.title}</Col>
                        <Col sm={4}><i className="font-weight-bold">Creation date: </i> {props.task.creationDate}</Col>
                        <Col sm={3}><i className="font-weight-bold">Deadline: </i> {props.task.deadline}</Col>
                        <Col sm={2} className="text-center">{priorityIcon(props.task.priority)}</Col>
                    </Row>
                </Container>
            </div>
        );
};

export default ToDoTask;