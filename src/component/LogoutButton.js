import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const USER = 'user';
const JWT = 'jwt';
const LOGOUT_PATH = '/';

function LogoutButton() {
    const history = useHistory();
    var login = localStorage.getItem(USER);
    const logout = () => {
        localStorage.removeItem(USER);
        localStorage.removeItem(JWT);
        history.push(LOGOUT_PATH);
    }

    return (
        <Form>
            <Form.Group id='logout-form'>
                <Form.Label id='label-logout' column sm="5">{login}</Form.Label>

                <Button id='logout-btn' variant="dark" onClick={logout}>Logout</Button>

            </Form.Group>
        </Form>
    );
}

export default LogoutButton
