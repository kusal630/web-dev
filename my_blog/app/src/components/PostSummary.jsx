import { Link } from 'react-router-dom';

export default function PostSummary({ post }) {
  const excerpt =
    post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content;

  return (
    <article className="post-card">
      <h2>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h2>
      <p className="meta">
        By {post.author} - {new Date(post.createdAt).toLocaleString()}
        {post.archived && <span className="badge">Archived</span>}
      </p>
      <p>{excerpt}</p>
    </article>
  );
}