import { Link, useParams } from 'react-router-dom';
import { pageContent } from '../data/pageContent.js';

/**
 * One component renders every dropdown-driven section (About Us,
 * Academics, Admissions, Research). Which content it shows is
 * entirely driven by:
 *  - `sectionKey` (a prop passed in from the route in App.jsx), and
 *  - `:subpage` (a route param supplied by React Router)
 * This is the props + React Router half of the assignment: no new
 * component is written per menu item, only new data.
 */
function SectionPage({ sectionKey }) {
  const { subpage } = useParams();
  const section = pageContent[sectionKey];

  if (!section) {
    return <p>Section not found.</p>;
  }

  // /about, /academics, ... with no subpage: show the overview + cards.
  if (!subpage) {
    return (
      <div className="section-page">
        <p className="section-page__eyebrow">{section.title}</p>
        <h1>{section.tagline}</h1>
        <p className="section-page__overview">{section.overview}</p>

        <div className="card-grid">
          {section.subsections.map((sub, index) => (
            <Link to={`/${sectionKey}/${sub.slug}`} className="card" key={sub.slug}>
              <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
              <h2>{sub.title}</h2>
              <p>{sub.summary}</p>
              <span className="card__cta">Read more &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // /about/vision-mission, etc: show a single subsection in detail.
  const sub = section.subsections.find((item) => item.slug === subpage);

  if (!sub) {
    return (
      <div className="section-page">
        <h1>Page not found</h1>
        <p>
          That page doesn&rsquo;t exist under {section.title}.{' '}
          <Link to={`/${sectionKey}`}>Back to {section.title}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="section-page">
      <p className="section-page__breadcrumb">
        <Link to={`/${sectionKey}`}>{section.title}</Link> / {sub.title}
      </p>
      <h1>{sub.title}</h1>
      {sub.body.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <Link to={`/${sectionKey}`} className="btn btn--ghost section-page__back">
        &larr; Back to {section.title}
      </Link>
    </div>
  );
}

export default SectionPage;
