import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Button } from 'react-toolbox/lib/button';
ReactDOM.render(<App />,         <Button label="Hello World!" />,document.getElementById('root'));
registerServiceWorker();
