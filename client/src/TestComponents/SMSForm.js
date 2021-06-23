import { useState } from 'react';

const SMSForm = () => {
  const [ to, setTo ] = useState('');
  const [ body, setBody ] = useState('');
  const [ submitting, setSubmitting ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    fetch('http://localhost:3001/api/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({to, body})
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setTo('');
        setBody('');
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
      console.log(data);
    });
  }

  return (
    <form className="sms-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="to">To:</label>
        <input
           type="tel"
           name="to"
           id="to"
           value={to}
           onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea 
          name="body" 
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button type="submit" disabled={submitting}>
        Send message
      </button>
    </form>
  );
}
 
export default SMSForm;