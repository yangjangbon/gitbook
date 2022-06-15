import './assets/css/App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Timer from './pages/Timer';
import Commit from './pages/Commit';


const App = () => {
	return (
		<div className='App'>
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/gitbook" element={<Home/>}> </Route>
          <Route path="/timer/:title" element={<Timer/>}> </Route>
          <Route path="/commit/:title" element={<Timer/>}> </Route>
        </Routes>
      </BrowserRouter>
      </header>
		</div>
	);
}
export default App;
