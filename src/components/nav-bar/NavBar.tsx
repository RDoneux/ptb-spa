import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav>
      <ul className={styles['container']}>
        <li>
          <NavLink to="/contact">CONTACT</NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/events">EVENTS</NavLink>
        </li>
      </ul>
    </nav>
  );
}
