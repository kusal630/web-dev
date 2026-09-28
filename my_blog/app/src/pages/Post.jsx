import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const API = 'http://localhost:3000/api/posts';

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API}/${id}`)
      .then(async (res) => {
        if (res.status === 404) throw new Error('Post not found');
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setForm({ title: data.title, author: data.author, content: data.content });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const updated = await res.json();
      setPost(updated);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleArchive = async () => {
    const res = await fetch(`${API}/${id}/archive`, { method: 'PATCH' });
    if (res.ok) setPost(await res.json());
  };

  const deletePost = async () => {
    if (!window.confirm('Delete this post permanently?')) return;
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (res.ok) navigate('/');
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="error">{error} - <Link to="/">back home</Link></p>;
  if (!post) return null;

  return (
    <section>
      {editing ? (
        <form onSubmit={saveEdit} className="form">
          <h2>Edit Post</h2>
          <label>
            Title
            <input name="title" value={form.title} onChange={update} required />
          </label>
          <label>
            Author
            <input name="author" value={form.author} onChange={update} />
          </label>
          <label>
            Content
            <textarea name="content" rows={8} value={form.content} onChange={update} required />
          </label>
          {error && <p className="error">{error}</p>}
          <div className="row">
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p className="meta">
            By {post.author} - Created {new Date(post.createdAt).toLocaleString()} - Updated{' '}
            {new Date(post.updatedAt).toLocaleString()}
            {post.archived && <span className="badge">Archived</span>}
          </p>
          <div className="content">{post.content}</div>
          <div className="row">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button className="secondary" onClick={toggleArchive}>
              {post.archived ? 'Unarchive' : 'Archive'}
            </button>
            <button className="danger" onClick={deletePost}>Delete</button>
          </div>
        </>
      )}
    </section>
  );
}