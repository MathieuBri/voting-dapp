import React from 'react'
import { Web3ContextProvider } from './components/Web3Context'

// components
import Navbar from './components/Navbar'
import Proposals from './components/Proposals'

import 'bootstrap/dist/css/bootstrap.min.css';

function App()
{
  return (
    <Web3ContextProvider>
      <div className="app">
        <Navbar />
        <Proposals />
      </div>
    </Web3ContextProvider>
  );
}

export default App;