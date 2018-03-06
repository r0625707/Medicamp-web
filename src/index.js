import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyAC-LVJeWkMmtdJ-8XxVqOKKSiVqRMEOX0",
    authDomain: "medicamp-so.firebaseapp.com",
    databaseURL: "https://medicamp-so.firebaseio.com",
    projectId: "medicamp-so",
    storageBucket: "medicamp-so.appspot.com",
    messagingSenderId: "787943796754"
  };
  firebase.initializeApp(config);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
