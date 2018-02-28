import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { Container } from 'reactstrap';

class App extends Component {

  render() {
    return (
      <div>
        <Container fluid>
          <Header />
          <Main />
        </Container>
      </div>
    );
  }
}

export default App;
