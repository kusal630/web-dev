import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:3000/api/posts';

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `API error ${res.status}`);
      }
      const created = await res.json();
      navigate(`/posts/${created._id}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <section>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Title
          <input name="title" value={form.title} onChange={update} required />
        </label>
        <label>
          Author
          <input name="author" value={form.author} onChange={update} placeholder="Anonymous" />
        </label>
        <label>
          Content
          <textarea name="content" rows={8} value={form.content} onChange={update} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Create Post'}
        </button>
      </form>
    </section>
  );
}