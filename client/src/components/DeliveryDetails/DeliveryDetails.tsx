import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CheckOutBtn from '../Cart/CheckOutBtn';
import "./DeliveryDetails.css"

function DeliveryDetails() {
  return (
    <div className="delivery-container container mt-5">
      <Form className="">
        <h3 className="mb-4">Delivery Details</h3>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Control placeholder="Address" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control placeholder="City" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Control placeholder="Zip code" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Control placeholder="Country" />
          </Form.Group>
        </Row>
        <CheckOutBtn/>
      </Form>
    </div>
  );
}

export default DeliveryDetails;
