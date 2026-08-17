import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="section-page">
      <p className="section-page__eyebrow">404</p>
      <h1>That page has moved or never existed.</h1>
      <Link to="/" className="btn btn--primary">
        Back to the home page
      </Link>
    </div>
  );
}

export default NotFound;
