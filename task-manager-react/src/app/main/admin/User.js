import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync, faLock, faLockOpen} from "@fortawesome/fontawesome-free-solid";
import {userService} from "../../service/user.service";

const User = (props) => {
    return (
        <div className="shadow-sm">
            <Container>
                <Row className={props.user.locked ? "mt-3 pt-3 bg-light-red" : "mt-3 pt-3"}>
                    <Col sm={4}><i className="font-weight-bold">Email: </i> {props.user.email}</Col>
                    <Col sm={3}><i className="font-weight-bold">First name: </i> {props.user.firstName}</Col>
                    <Col sm={3}><i className="font-weight-bold">Last name: </i> {props.user.lastName}</Col>
                    <Col sm={1} className="mb-1"><Button onClick={userService.resetOne(props.user.email)} variant="outline-info" title="Reset user password"><FontAwesomeIcon icon={faSync}/></Button></Col>
                    {(props.user.locked) ?
                        <Col sm={1} className="mb-3"><Button onClick={userService.unlockOne(props.user.email)} variant={"outline-success"}><FontAwesomeIcon icon={faLockOpen}/></Button></Col>:
                        <Col sm={1} className="mb-3"><Button onClick={userService.lockOne(props.user.email)} variant={"outline-warning"}><FontAwesomeIcon icon={faLock}/></Button></Col>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default User;