import React from 'react';

export const ContactForm = () => {
  return (
    <form className='contact-form'>
      <div>
        <label htmlFor='name'>NAME: *</label>
        <br />
        <input type='text' className='form-input-field' name='name' size='40' />
        <br />
        <label htmlFor='email'>EMAIL: *</label>
        <br />
        <input
          type='text'
          className='form-input-field'
          name='email'
          size='40'
        />
        <br />
        <label htmlFor='message'>HOW CAN WE HELP YOU?: *</label>
        <br />
        <textarea
          type='textarea'
          className='form-input-field'
          name='message'
          rows='8'
          cols='38'
        />
      </div>
      <div>
        <button className='form-input-button'>RESET</button>
        <button className='form-input-button'>SUBMIT</button>
      </div>
      <span style={{ fontSize: '15px' }}>
        Note: If you are having difficulties with our contact us form above,
        send us an email to info@bemoacademicconsulting.com (copy & paste the
        email address)
      </span>
    </form>
  );
};

export default ContactForm;
