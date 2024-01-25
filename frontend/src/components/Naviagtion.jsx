import { Link } from 'react-router-dom';
import logo from '../assets/QUIZZIE.png';
import styles from './styles/Navigation.module.css';
import { Button } from '../components/ui';

export default function Naviagtion() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles.navs}>
        <Link to="/admin">
          <Button
            variant="ghost"
            style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
          >
            Dashboard
          </Button>
        </Link>
        <Link to="/admin/analytics">
          <Button
            variant="ghost"
            style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
          >
            Analytics
          </Button>
        </Link>
        <Link>
          <Button
            variant="ghost"
            style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
          >
            Create Quiz
          </Button>
        </Link>
      </div>

      <div className={styles.button}>
        <Button
          variant="ghost"
          style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
}
