import React from 'react';
import { Accordion, Container, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import HomeNavbar from '../home/HomeNavbar';

const FAQPage = () => {
  const { t } = useTranslation();

  return (
    <>
    <HomeNavbar/>
    <Container className="faqpage my-5">
      <h1 className="mb-4">F.A.Q</h1>
      <div className="d-flex justify-content-between">
        <div className="w-50 me-4">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>{t('faq.questions.0.title')}</Accordion.Header>
              <Accordion.Body>
                {t('faq.questions.0.answer')}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>{t('faq.questions.1.title')}</Accordion.Header>
              <Accordion.Body>
                {t('faq.questions.1.answer')}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>{t('faq.questions.2.title')}</Accordion.Header>
              <Accordion.Body>
                {t('faq.questions.2.answer')}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>{t('faq.questions.3.title')}</Accordion.Header>
              <Accordion.Body>
                {t('faq.questions.3.answer')}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>{t('faq.questions.4.title')}</Accordion.Header>
              <Accordion.Body>
                {t('faq.questions.4.answer')}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="w-50">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{t('form.name')}</Form.Label>
              <Form.Control type="text" placeholder={t('form.namePlaceholder')} style={{ height: '50px' }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('form.email')}</Form.Label>
              <Form.Control type="email" placeholder={t('form.emailPlaceholder')} style={{ height: '50px' }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>{t('form.subject')}</Form.Label>
              <Form.Control type="text" placeholder={t('form.subjectPlaceholder')} style={{ height: '50px' }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDepartment">
              <Form.Label>{t('form.department')}</Form.Label>
              <Form.Select style={{ height: '50px' }}>
                <option>{t('form.businessDepartment')}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicQuestion">
              <Form.Label>{t('form.question')}</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder={t('form.questionPlaceholder')} />
            </Form.Group>
            <Button variant="warning" type="submit" style={{ height: '50px' }}>
              {t('form.submit')}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
    </>
  );
};

export default FAQPage;
