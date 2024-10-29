import React, { useState, ChangeEvent, FormEvent } from 'react';
import './contact.scss';

// Definerar strukturen för input values
interface InputValues {
  Email: string;
  Name: string;
  Message: string;
}

// Form-componenten
const Form: React.FC = () => {
  const [inputValues, setInputValues] = useState<InputValues>({
    Email: '',
    Name: '',
    Message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');

  const { Email, Name, Message } = inputValues;

  // Hanterar förändring för input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Limit the message to 500 words
    if (name === 'Message') {
      const wordCount = value.split(/\s+/).filter((word) => word.length > 0).length;
      if (wordCount <= 500) {
        setInputValues((prev) => ({
          ...prev,
          [name]: value,
        }));
        setMessageError('');
      } else {
        setMessageError('Message cannot exceed 500 words.');
      }
    } else {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Hanterar form-submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setFormSubmitted(true);
  };

  return (
    <>
      {!formSubmitted ? (
        <>
          <form onSubmit={handleSubmit} className="contact-form">
            <article className="contact-input-field">
              <label htmlFor="name">Ditt namn:</label>
              <input
                type="text"
                id="name"
                name="Name"
                value={Name}
                onChange={handleChange}
                required
              />
            </article>
            <article className="contact-input-field">
              <label htmlFor="email">Din epost-adress:</label>
              <input
                type="email"
                id="email"
                name="Email"
                value={Email}
                onChange={handleChange}
                required
              />
            </article>
            <article className="contact-input-message">
              <label htmlFor="message">Meddelande:</label>
              <textarea
                id="message"
                name="Message"
                value={Message}
                onChange={handleChange}
                required
              />
              {messageError && <p className="error-message">{messageError}</p>}
            </article>
            <button type="submit" className="contact-send-button">Skicka in</button>
          </form>
        </>
      ) : (
        <article className="contact-form-info">
          <p>Hej, {Name}! <br/>
		  Tack för att du kontaktar oss på Monsterbio<br/>
		  Vi återkommer till dig så fort vi kan</p>
        </article>
      )}
    </>
  );
};

// Contact-component
const Contact: React.FC = () => {
  return (
    <section>
      <article className='contact-container'>
        <h1 className='contact-title'>Kontakta oss</h1>
        <p className='contact-text'>
          Vår toppmoderna biograf finns i Gränbystadens Galleria precis intill E4:an. <br/>
          Alltid 4 timmars fri parkering och utanför biografen stannar både lokal- och regionalbussar.<br/>
          <br/>
          Behöver du hjälp med något? <br/>
          Ring oss på: <a href="tel:5555555555" className='contact-text-a'>018-100000</a> eller använd formuläret nedan<br/>
        </p>
      </article>
      <div className='form-container'>
        <Form />
      </div>
    </section>
  );
};

export default Contact;
