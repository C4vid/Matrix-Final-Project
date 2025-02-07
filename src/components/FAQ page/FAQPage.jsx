import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import HomeNavbar from '../home/HomeNavbar';

const FAQPage = () => {
  return (
  <>
  <HomeNavbar/>
    <Container className="mt-5">
      <h2 className="mb-4">Frequently Asked Questions</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Are there any financing options available for furniture purchases?</Accordion.Header>
          <Accordion.Body>
          Yes, we offer various financing options for our customers. We work with financial partners to provide you with a payment plan that suits your needs.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Do you offer eco-friendly furniture?</Accordion.Header>
          <Accordion.Body>
          Yes, our furniture options are made from eco-friendly materials. We prioritize sustainable furniture production to help create a healthy environment for our customers.          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Is there a way to track the delivery of my furniture?</Accordion.Header>
          <Accordion.Body>
          Yes, we provide a tracking system for your furniture delivery process. You can track the delivery status through our online platform.          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
    </>

  );
};

export default FAQPage;