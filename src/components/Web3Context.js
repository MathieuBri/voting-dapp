import React, { useState, useEffect } from 'react'
import Votingabi from '../contracts/Voting.json'
import Web3 from 'web3'

const Web3Context = React.createContext(['', {}, '', []]);

const Web3ContextProvider = (props) =>
{
    const [currentAccount, setCurrentAccount] = useState('');
    const [contract, setContract] = useState({});
    const [owner, setOwner] = useState('');

    const [information, setInformation] = useState({ proposals: [], userVotes: [] });

    useEffect(() =>
    {
        loadWeb3();
        loadInfo();
    }, []);

    const loadWeb3 = async () =>
    {
        if (window.ethereum)
        {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else
        {
            console.warn('No ethereum detected');
        }
    }

    const loadInfo = async () =>
    {
        const web3 = window.web3;
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0].toLowerCase());

        const chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }), 16);
        const networkData = Votingabi.networks[chainId];
        if (networkData)
        {
            const voting = new web3.eth.Contract(Votingabi.abi, networkData.address);
            setContract(voting);

            let _owner = await voting.methods.owner().call();
            setOwner(_owner.toLowerCase());

            let info = await voting.methods.getProposalsAndUserVotes().call();
            setInformation({ proposals: info[0], userVotes: info[1] });

            // handle new proposal
            voting.events.CreateProposal((error, result) =>
            {
                if (!error)
                {
                    setInformation(prevState => ({
                        proposals: [...prevState.proposals, result.returnValues.proposal],
                        userVotes: prevState.userVotes
                    }));
                }
            });

            // handle new vote
            voting.events.UserVote((error, result) =>
            {
                if (!error)
                {
                    setInformation(prevState => ({
                        proposals: prevState.proposals,
                        userVotes: [...prevState.userVotes, result.returnValues.proposal]
                    }));
                }
            });

            // handle close proposal
            voting.events.Close((error, result) =>
            {
                if (!error)
                {
                    // add new proposal to state
                    setInformation(prevState =>
                    {
                        let proposals = [...prevState.proposals];
                        let proposal = { ...proposals[result.returnValues.proposal], closed: true };

                        proposals[result.returnValues.proposal] = proposal;

                        return { proposals: proposals, userVotes: prevState.userVotes };
                    });
                }
            });
        }
        else
        {
            // display toast
            console.warn('no contract');
        }
    }

    return (
        <Web3Context.Provider value={{currentAccount, contract, owner, information}}>
            {props.children}
        </Web3Context.Provider>
    );
};

export { Web3Context, Web3ContextProvider }