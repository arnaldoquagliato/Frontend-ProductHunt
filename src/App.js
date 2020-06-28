import React from 'react';

import './components/style.css' 

import Header from './components/Header'
import Routes from './routes.js'

const App = () => (
  <div className = "App">
    <Header />
    <Routes/>
  </div>
)

export default App;
