import React from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import LoginForm from './Users/LoginForm'
import UserForm from './Users/UserForm';

class TestComponent extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <div>
            <Col xs="12" sm="12" md="12" lg="12">
              <Jumbotron>
                <h1 className="display-3">Medicamp</h1>
                <p className="lead">Medicamp maakt het gemakkelijk om medische gegevens van kinderen bij te houden voor jeugdverenigingen. Altijd en overal te raadplegen voor leiding met de Medicamp-app!</p>
                <hr className="my-2" />
                <p>Meld je aan met je Medicamp-account of maak een nieuw account aan</p>
                <Row>
                  <Col xs="12" sm="12" md="2" lg="1">
                    <LoginForm />
                  </Col>
                  <Col xs="12" sm="12" md="2" lg="1">
                    <UserForm />
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </div>
        </Row>
        <hr />
      </div>
    );
  }
}

export default TestComponent;
