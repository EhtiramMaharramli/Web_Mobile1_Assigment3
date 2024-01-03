import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      subject,
      email,
      message,
    };

    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form is submitted without a problem !');
        
        setSubject('');
        setEmail('');
        setMessage('');

        console.log('Form data : ', { subject, email, message });
      } else {
        console.error('Form submission is failed.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="contact-ctr">
      <form onSubmit={handleSubmit} className="contact-frm">
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
