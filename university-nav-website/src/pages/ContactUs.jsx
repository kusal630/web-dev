import { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

function ContactUs() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real deployment this would call an API. For this demo,
    // it simply confirms receipt in the UI.
    setSubmitted(true);
  };

  return (
    <div className="section-page">
      <p className="section-page__eyebrow">Contact Us</p>
      <h1>Reach the right office the first time.</h1>

      <div className="contact-grid">
        <div className="contact-info">
          <div>
            <h2>General enquiries</h2>
            <p>info@snuchennai.edu.in &middot; +91 44 2345 6789</p>
          </div>
          <div>
            <h2>Admissions office</h2>
            <p>admissions@snuchennai.edu.in &middot; Mon&ndash;Fri, 9am&ndash;5pm</p>
          </div>
          <div>
            <h2>Campus address</h2>
            <p>Shiv Nadar University Chennai, Rajiv Gandhi Salai (OMR), Kalavakkam, Chengalpattu (Dt.), Tamil Nadu &ndash; 603 110</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn--primary">
            Send message
          </button>

          {submitted && (
            <p className="contact-form__success" role="status">
              Thanks, {form.name || 'there'} &mdash; we&rsquo;ll reply to {form.email} shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
