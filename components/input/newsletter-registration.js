import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(false);

  const formRef = useRef();
  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const enteredEmail = emailRef.current.value;
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
      ){
      setIsInvalid(true);
      return;
    }
    const registrationBody = {
      email: enteredEmail,
    };
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(registrationBody),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data)=> console.log(data));

    formRef.current.reset();
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler} ref={formRef}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button onClick={registrationHandler}>Register</button>
        </div>
        {isInvalid && <p>Please enter a valid email address!</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
