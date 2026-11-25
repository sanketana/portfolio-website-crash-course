// [PASTE · step 8] React's memory for this island — ask: what four states can the form be in?
import { useState } from 'react';

export default function ContactForm({ action }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // [INVESTIGATE · step 8] Send the form in the background, like the AJAX slide — predict: does the page reload?
  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch(action, {
        method: 'POST',
        body: new FormData(event.target),
        headers: { Accept: 'application/json' },
      });
      setStatus(response.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  // [TYPE · step 8] What the visitor sees once the message has gone
  if (status === 'sent') {
    return <p className="sent">Thanks, your message is on its way. I reply within two working days.</p>;
  }

  // [INVESTIGATE · step 8] Your plain form, rewritten in React — spot the four differences from ContactFormBasic.astro
  return (
    <form action={action} method="POST" onSubmit={handleSubmit} className="contact">
      <label>Name <input name="name" required /></label>
      <label>Email <input type="email" name="email" required /></label>
      <label>Message <textarea name="message" rows={4} required /></label>
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>
      {/* [TYPE · step 8] What the visitor sees if sending fails */}
      {status === 'error' && <p className="error">Something went wrong. Please try again in a minute.</p>}
    </form>
  );
}
