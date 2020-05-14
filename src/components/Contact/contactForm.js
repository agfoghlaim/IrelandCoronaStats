import React from 'react';

const ContactForm = ({ formData, classes, handleSubmit, handleChange, showErrorText }) => {
  const renderSpan = (name) => {
    if (showErrorText && !formData[name].valid) {
      return (
        <span
          className={
            !formData[name].valid
              ? `${classes.formError} ${classes.show}`
              : classes.formError
          }
        >
          Enter {`${name}`}
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <form
      // method="post"
      // name="contact-stats"
      // id="contact-stats"
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <div className={classes.gridTwo}>
        <div className={classes.inputSection}>
          <label htmlFor="name">Name</label>
          <input
            style={{
              border: `${
                !formData.name.valid
                  ? '0.2rem solid var(--covidPink)'
                  : '0.2rem solid var(--covidGreen)'
              }`,
            }}
            onChange={(e) => handleChange(e, 'name')}
            value={formData.name.value}
            name="name"
            type="text"
            placeholder="Name"
          />
          {renderSpan('name')}
        </div>
        <div className={classes.inputSection}>
          <label htmlFor="email">Email</label>
          <input
            style={{
              border: `${
                !formData.email.valid
                  ? '0.2rem solid var(--covidPink)'
                  : '0.2rem solid var(--covidGreen)'
              }`,
            }}
            type="email"
            onChange={(e) => handleChange(e, 'email')}
            name="email"
            value={formData.email.value}
            placeholder="Email"
          />
          {renderSpan('email')}
        </div>
      </div>

      <div className={classes.inputSection}>
        <label htmlFor="msg">Message</label>
        <textarea
          style={{
            border: `${
              !formData.msg.valid
                ? '0.2rem solid var(--covidPink)'
                : '0.2rem solid var(--covidGreen)'
            }`,
          }}
          onChange={(e) => handleChange(e, 'msg')}
          name="msg"
          value={formData.msg.value}
          placeholder="..."
        ></textarea>
        {renderSpan('msg')}
      </div>

      <div className={classes.inputSection}>
        <button className={classes.formBtn}>Send</button>
      </div>
    </form>
  );
};

export default ContactForm;
