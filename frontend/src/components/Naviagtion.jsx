import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/QUIZZIE.png';
import { Button } from '../components/ui';
import CreateQuiz from '../pages/CreateQuiz';
import Modal from './ui/Modal';
import styles from './styles/Navigation.module.css';

export default function Naviagtion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            variant="ghost"
            style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
          >
            Create Quiz
          </Button>
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

      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          <CreateQuiz setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
}
