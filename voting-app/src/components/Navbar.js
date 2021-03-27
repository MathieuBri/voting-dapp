import React, { useContext, useState } from 'react'
import { Web3Context } from './Web3Context'
import Web3 from 'web3'
import ModalAction from './ModalAction'

import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

const Navbar = () =>
{
    const [show, setShow] = useState(false);
    const { currentAccount, owner, contract } = useContext(Web3Context);

    const createProposal = async (data) =>
    {
        try
        {
            // convert string to bytes32, and get timestamp in seconds
            await contract.methods.create(Web3.utils.asciiToHex(data.name), Math.floor(Date.now() / 1000) + data.endIn * 86400).send({ from: currentAccount });
            setShow(false);
        }
        catch (e)
        {
            console.log(e);
        }
    }

    return (
        <Nav className="navbar navbar-fixed-top justify-content-between navbar-dark bg-dark shadow mb-5">
            <p className="navbar-brand my-auto">Voting App</p>

            {currentAccount === owner ? (
                <div className="justify-content-center">
                    <Button className="btn btn-success" onClick={() => setShow(true)}>
                        Create proposal
                    </Button>
                    <ModalAction state={show} handleClose={() => setShow(false)} action={createProposal} />
                </div>
            ) : <></> }

            <ul className="navbar-nav flex-row">
                <li className="nav-item text-white">{currentAccount}</li>
            </ul>
        </Nav>
    );
}

export default Navbar