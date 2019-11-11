import React, {Component} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {userService} from "../service/user.service";

class FirstLogin extends Component {

    state = {
        error: '',
        password: '',
        confirmedPassword: ''
    };

    handlePasswordChange(e){this.setState({password: e.target.value})}
    handlePasswordConfirmedPasswordChange(e){this.setState({confirmedPassword: e.target.value})}
    tryChangePassword(){
        this.setState({error: userService.changePassword(this.state.password, this.state.confirmedPassword)});
    };

    render() {
        return (
            <Container className="mt-5 pt-5">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        {(this.state.error ? <Alert variant="danger">{this.state.error}</Alert> : null)}
                        <Form>
                            <Form.Group>
                                <Form.Label column={this.state.password}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" onChange={(e) => this.handlePasswordChange(e)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label column={this.state.confirmedPassword}>Confirmed password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" onChange={(e) => this.handlePasswordConfirmedPasswordChange(e)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={() => this.tryChangePassword()} className="w-100 mt-3">
                                Change
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default FirstLogin;