import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <h1 style={{margin:0, paddingTop: 10, textAlign: "center"}}>TODOABLE</h1>
      <Dashboard />
    </div>
  );
}

export default hot(module)(App);