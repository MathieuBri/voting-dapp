import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'

const Notification = ({ title, message, defaultShow }) =>
{
    const [show, setShow] = useState(defaultShow);

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide style={{ position: 'absolute', top: '5rem', right: '2rem' }}>
            <Toast.Header>
                <strong className="mr-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}

export default Notification