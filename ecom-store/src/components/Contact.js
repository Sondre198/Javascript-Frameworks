import React, { useState } from 'react';
import styles from '../ContactForm.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: ''
  });
  const [errors, setErrors] = useState({});

  // function to validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = 'Your full name must be at least 3 characters long.';
    }
    if (!formData.subject || formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.body || formData.body.length < 3) {
      newErrors.body = 'Message body must be at least 3 characters long.';
    }
    return newErrors;
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log(formData);
      alert('Form submitted successfully!');
      setFormData({ fullName: '', subject: '', email: '', body: '' });
    } else {
      setErrors(formErrors);
    }
  };

  // handle changes to form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  return (
    <div className={styles.contactFormContainer}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.subject && <p className={styles.errorText}>{errors.subject}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Body:</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className={styles.formTextarea}
          />
          {errors.body && <p className={styles.errorText}>{errors.body}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
