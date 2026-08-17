import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuData } from '../data/menuData.js';
import DropdownMenu from './DropdownMenu.jsx';

function Navbar() {
  // Which top-level menu's dropdown is currently open (by label), or null.
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Close any open dropdown / mobile panel whenever the route changes,
  // and whenever the user clicks outside the nav.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setOpenMenu(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleMenu = (label) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setMobileOpen(false)}>
          <span className="navbar__crest">SNUC</span>
          <span className="navbar__wordmark">
            SNUC <em>Chennai</em>
          </span>
        </NavLink>

        <button
          type="button"
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__menu ${mobileOpen ? 'navbar__menu--open' : ''}`}>
          <ul className="navbar__list">
            {menuData.map((item) => {
              const hasDropdown = Boolean(item.dropdown && item.dropdown.length);
              const isOpen = openMenu === item.label;

              return (
                <li
                  key={item.label}
                  className="navbar__item"
                  onMouseEnter={() => hasDropdown && setOpenMenu(item.label)}
                  onMouseLeave={() => hasDropdown && setOpenMenu(null)}
                >
                  <div className="navbar__link-row">
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>

                    {hasDropdown && (
                      <button
                        type="button"
                        className={`navbar__caret ${isOpen ? 'navbar__caret--open' : ''}`}
                        aria-label={`${item.label} submenu`}
                        aria-expanded={isOpen}
                        onClick={() => toggleMenu(item.label)}
                      >
                        &#9662;
                      </button>
                    )}
                  </div>

                  {hasDropdown && (
                    <DropdownMenu
                      items={item.dropdown}
                      isOpen={isOpen}
                      onLinkClick={() => setMobileOpen(false)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
