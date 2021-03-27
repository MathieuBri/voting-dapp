import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import LoadingButton from './LoadingButton'

const ModalAction = ({ state, handleClose, action }) =>
{
    const [name, setName] = useState('');
    const [endIn, setEndIn] = useState(1);

    return (
        <>
            <Modal show={state} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new proposal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Proposal name</Form.Label>
                            <Form.Control type="text" placeholder="Name..." onChange={e => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End proposal in (days)</Form.Label>
                            <Form.Control type="number" placeholder="Number of days..." defaultValue={endIn} onChange={e => setEndIn(e.target.value)} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <LoadingButton variant="primary" action={action} parameters={{ name, endIn }} disableState={name.trim() === ''}>Create</LoadingButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAction