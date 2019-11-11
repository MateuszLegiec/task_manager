import {Col, Container, Row} from "react-bootstrap";
import React from "react";

const Comment = (props) => {
    return (
        <div className="shadow-sm rounded p-3">
            <Container>
                <Row>
                    <Col sm={2}><small>{props.comment.date}</small></Col>
                    <Col sm={2}><small>{props.comment.user}</small></Col>
                    <Col sm={{span: 10, offset:1}} className="mt-2">{props.comment.description}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Comment;