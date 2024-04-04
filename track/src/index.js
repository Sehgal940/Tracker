import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import Main from './components/Main'
import Login from './components/Login';
import Register from './components/Register';
import ForgetPass from './components/ForgetPass';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Error from './components/Error';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path={'/'} Component={App}>
        <Route index Component={Login}/>
        <Route path={'login'} Component={Login}/>
        <Route path={'main'} Component={Main}/>
        <Route path={'register'} Component={Register}/>
        <Route path={'forgetpass'} Component={ForgetPass}/>
        <Route path={'*'} Component={Error}/>
        </Route>
      </Routes>
    </Router>
);