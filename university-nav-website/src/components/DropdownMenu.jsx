import { NavLink } from 'react-router-dom';

/**
 * DropdownMenu is a pure presentational component: it owns no state
 * of its own and only renders whatever `items` its parent (Navbar)
 * hands it as props. `isOpen` and `onLinkClick` are also props, so
 * the same component works identically on desktop (hover) and
 * mobile (tap).
 */
function DropdownMenu({ items, isOpen, onLinkClick }) {
  return (
    <ul className={`dropdown ${isOpen ? 'dropdown--open' : ''}`} role="menu">
      {items.map((item, index) => (
        <li key={item.path} role="none">
          <NavLink
            to={item.path}
            role="menuitem"
            onClick={onLinkClick}
            className={({ isActive }) =>
              `dropdown__link ${isActive ? 'dropdown__link--active' : ''}`
            }
          >
            <span className="dropdown__index">{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
