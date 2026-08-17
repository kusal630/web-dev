import { Link } from 'react-router-dom';
import { menuData } from '../data/menuData.js';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="navbar__crest">SNUC</span>
          <p>
            Shiv Nadar University Chennai
            <br />
            <small>Rajiv Gandhi Salai (OMR), Kalavakkam</small>
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {menuData
            .filter((item) => item.path !== '/')
            .map((item) => (
              <Link key={item.label} to={item.path}>
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
      <p className="footer__legal">&copy; {new Date().getFullYear()} Shiv Nadar University Chennai. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
