import { useEffect, useState } from 'react';
import PostSummary from '../components/PostSummary.jsx';

const API = 'http://localhost:3000/api/posts';

export default function Archive() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}?archived=true`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading archive...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section>
      <h2>Archived Posts</h2>
      {posts.length === 0 ? (
        <p>No archived posts.</p>
      ) : (
        posts.map((p) => <PostSummary key={p._id} post={p} />)
      )}
    </section>
  );
}