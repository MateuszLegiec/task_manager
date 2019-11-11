import React, {Component} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";
import User from "./User";
import {userService} from "../../service/user.service";
import NewUserModal from "./NewUser.modal";

class Admin extends Component {

    state = {
        value: '',
        showModal: false,
        searchText: '',
        searchStatus: '',
    };

    handleChange(event){this.setState({value: event.target.value});};
    openModal = () => {this.setState({showModal: true});};
    closeModal = () => {this.setState({showModal: false});};

    render() {
        return (
            <Container>
                <NewUserModal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                />
                <Col sm={12}>
                    <Button onClick={this.openModal} variant="outline-primary" className="mt-5 w-100">Add user <FontAwesomeIcon icon={faPlus}/></Button>
                    <Form.Control type="text" placeholder="Find user..." className="w-100 mt-5" value={this.state.value} onChange={e => this.handleChange(e)}/>
                    {userService.getAll()
                        .filter(user => user.email.includes(this.state.value) || user.firstName.includes(this.state.value) || user.lastName.includes(this.state.value))
                        .sort((a,b) => a.locked > b.locked)
                        .map(user => <User key={user.email} user={user}/>)
                    }
                </Col>
            </Container>
        );
    }
}
export default Admin;
