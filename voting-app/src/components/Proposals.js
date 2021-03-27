import React, { useMemo, useState, useContext } from 'react'
import { Web3Context } from './Web3Context'
import Proposal from './Proposal'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

const Proposals = () =>
{
    const { information } = useContext(Web3Context);
    const [closed, setClosed] = useState(false);
    const currentTime = Math.floor(Date.now() / 1000);

    const proposals = useMemo(
        () => information.proposals.reduce((response, proposal, id) => {
            id = { id: id };
            if (proposal.closed === true || currentTime > proposal.endDate) response.closed.push({ ...proposal, ...id });
            else response.opened.push({ ...proposal, ...id });

            return response;
        }, { opened: [], closed: [] }),
        [currentTime, information.proposals]
    );

    return (
        <>
            <h1 className="text-center">Proposals</h1>
            <div className="text-center mt-3">
                <ToggleButtonGroup type="radio" name="proposals" defaultValue={0}>
                    <ToggleButton value={0} variant="outline-secondary" onClick={() => setClosed(false)}>Opened</ToggleButton>
                    <ToggleButton value={1} variant="outline-secondary" onClick={() => setClosed(true)}>Ended</ToggleButton>
                </ToggleButtonGroup>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                {closed 
                    ? proposals.closed.map(proposal => <Proposal proposal={proposal} key={proposal.id} />)
                    : proposals.opened.map(proposal => <Proposal proposal={proposal} key={proposal.id} />)}
            </div>
        </>
    );
}

export default Proposals