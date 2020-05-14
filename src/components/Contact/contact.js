import React, { useState } from 'react';
import Layout from '../layout';
import classes from './contact.module.css';
import ContactForm from './contactForm';
import  {contactUtil} from '../../util-functions';
const { encode, validate } = contactUtil;


const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      fieldName: 'name',
      value: '',
      type: 'text',
      placeholder: 'name',
      valid: false,
      rules: {
        required: true,
        min: 2,
        max: 50,
      },
    },
    email: {
      fieldName: 'email',
      value: '',
      type: 'email',
      placeholder: 'email',
      valid: false,
      rules: {
        required: true,
        min: 6,
        max: 50,
        isProbablyEmail: true,
      },
    },
    msg: {
      fieldName: 'msg',
      value: '',
      type: 'textarea',
      placeholder: '...',
      valid: false,
      rules: {
        required: true,
        min: 2,
        max: 700,
      },
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const clearForm = () => {
    const copy = { ...formData };

    for (let i in copy) {
      copy[i].value = '';
      copy[i].valid = false;
    }
    setFormData(copy);
  };
  const handleChange = (e, id) => {
    setShowErrorText(false);
    const copy = { ...formData };
    const relevantField = { ...copy[id] };
    relevantField.value = e.target.value;
    relevantField.valid = validate(relevantField.value, relevantField.rules);
    copy[id] = relevantField;

    let formValid = true;
    for (let i in copy) {
      formValid = copy[i].valid && formValid;
    }
    setFormIsValid(formValid);
    setFormData(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      setShowErrorText(true);
      return;
    }
    setSubmitted(false);
    setFailed(false);
    const data = {};
    for (let key in formData) {
      data[key] = formData[key].value;
    }
   
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact-stats', ...data }),
    })
      .then(() => {
        setSubmitted(true);
        clearForm();
      })
      .catch((error) => {
        // console.log('Error: ', error);
        setFailed(true);
      });
  };

  // put this in index.html...
  // <!-- A little help for the Netlify post-processing bots -->
  // <form name="contact-stats" netlify netlify-honeypot="bot-field" hidden>
  //   <input type="text" name="name" />
  //   <input type="email" name="email" />
  //   <textarea name="msg"></textarea>
  // </form>

  return (
    <Layout>
      <section className={classes.section}>
        <ContactForm
          formData={formData}
          classes={classes}
          showErrorText={showErrorText}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />

        {submitted ? <p className={classes.formSuccess}>Thank You!</p> : null}
        {failed ? (
          <p className={classes.formFail}>Something went wrong.</p>
        ) : null}
      </section>
    </Layout>
  );
};

export default Contact;
