import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostSummary from '../components/PostSummary.jsx';

const API = 'http://localhost:3000/api/posts';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}?archived=false`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">Error: {error} - is the API server running?</p>;

  return (
    <section>
      <h2>Latest Posts</h2>
      {posts.length === 0 ? (
        <p>
          No posts yet - <Link to="/create">create the first one!</Link>
        </p>
      ) : (
        posts.map((p) => <PostSummary key={p._id} post={p} />)
      )}
    </section>
  );
}