import { Link } from 'react-router-dom';

const highlights = [
  { label: 'Schools', value: '4' },
  { label: 'PhD programmes', value: '17' },
  { label: 'Campus', value: 'OMR, Chennai' },
  { label: 'Legacy', value: 'Ex-SSN' },
];

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <p className="hero__eyebrow">Shiv Nadar University Chennai</p>
        <h1>
          Built on SSN&rsquo;s legacy, run as an <em>Institution of Eminence</em>.
        </h1>
        <p className="hero__lede">
          Four schools, one research culture: engineering, sciences, management and humanities
          under a single OMR campus. Explore admissions, academics and campus life below.
        </p>
        <div className="hero__actions">
          <Link to="/admissions" className="btn btn--primary">
            Start an application
          </Link>
          <Link to="/academics" className="btn btn--ghost">
            Browse programmes
          </Link>
        </div>
      </section>

      <section className="stats" aria-label="University at a glance">
        {highlights.map((stat) => (
          <div className="stats__card" key={stat.label}>
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
