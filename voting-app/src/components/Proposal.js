import React, { useContext } from 'react'
import Web3 from 'web3'
import { Web3Context } from './Web3Context'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import LoadingButton from './LoadingButton'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Clock, ExclamationCircle } from 'react-bootstrap-icons'

const Proposal = ({ proposal, id }) =>
{
    // convert bytes32 to string
    const name = Web3.utils.hexToUtf8(proposal.name);
    const startDate = new Date(proposal.startDate * 1000).toLocaleDateString('en-US');
    const endDate = new Date(proposal.endDate * 1000).toLocaleDateString('en-US');
    const currentTime = Math.floor(Date.now() / 1000);

    const { currentAccount, contract, information } = useContext(Web3Context);
    const ended = (proposal.closed === true || currentTime > proposal.endDate);

    const vote = async (choice) =>
    {
        try
        {
            await contract.methods.vote(id, choice).send({ from: currentAccount });
        }
        catch (e)
        {
            console.log(e);
        }
    }

    const close = async () =>
    {
        try
        {
            await contract.methods.close(id).send({ from: currentAccount });
        }
        catch (e)
        {
            console.log(e);
        }
    }

    return (
        <Card style={{ width: '18rem' }} bg={ended ? 'dark' : ''} text={ended ? 'white' : ''} className="m-3">
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {name}
                <Badge as="div" pill variant="danger">
                    {ended
                        ? <><Clock style={{ verticalAlign: 'bottom' }} /> Ended</>
                        : <><ExclamationCircle style={{ verticalAlign: 'bottom' }} /> {endDate}</>}
                </Badge>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Vote count: {proposal.voteCount}
                </Card.Text>

                {information.userVotes.includes(id) ? (
                    <Button variant="secondary" size="lg" block disabled>VOTED !</Button>
                ) : (
                    <>
                        <LoadingButton variant="outline-success" action={vote} parameters="1" block>Yes !</LoadingButton>
                        <LoadingButton variant="outline-danger" action={vote} parameters="2" block>No !</LoadingButton>
                    </>
                )}
            </Card.Body>
            <Card.Footer>
                <Container className="p-0" fluid>
                    <Row>
                        <Col md={8}><small>Started on: {startDate}</small></Col>
                        {!ended && (
                            <Col style={{ textAlign: 'right' }}><LoadingButton variant="danger" size="sm" action={close}>Close</LoadingButton></Col>
                        )}
                    </Row>
                </Container>
            </Card.Footer>
        </Card>
    );
}

export default Proposal