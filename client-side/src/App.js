import React from 'react';
import Cors from 'cors';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Route path="/" exact component={Join}></Route>
        <Route path="/chat" component={Chat}></Route>
    </Router>

);

export default App;