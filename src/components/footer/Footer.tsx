import styles from './Footer.module.css';
import { version } from '../../../package.json';

export default function Footer() {
  return (
    <footer className={styles['container']}>
      <small>PASS THE BATON</small>
      <small>v{version}</small>
    </footer>
  );
}
