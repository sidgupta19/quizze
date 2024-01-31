import { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/QUIZZIE.png';
import { Button } from '../../components/ui';
import Modal from '../../components/ui/Modal';
import useModal from '../../hooks/useModal';
import QuizModalContent from './QuizModalContent';
import styles from './styles/Navigation.module.css';
import { AuthContext } from '../../store/authContext';

export const ModalContext = createContext({
  isOpen: false,
  toggleModal: () => {},
});

export default function Naviagtion() {
  const { isOpen, toggleModal } = useModal();
  const { user, logout } = useContext(AuthContext);

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal }}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={logo} alt="logo" />
        </div>

        <div className={styles.navs}>
          <Link to="/">
            <Button
              variant="ghost"
              style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/analytics">
            <Button
              variant="ghost"
              style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
            >
              Analytics
            </Button>
          </Link>
          <Button
            onClick={toggleModal}
            variant="ghost"
            style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
          >
            Create Quiz
          </Button>
        </div>

        <div className={styles.button}>
          {user && (
            <Button
              onClick={logout}
              variant="ghost"
              style={{ width: '100%', fontWeight: '600', fontSize: '1.2rem' }}
            >
              LOGOUT
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <Modal toggleModal={toggleModal}>
          <QuizModalContent />
        </Modal>
      )}
    </ModalContext.Provider>
  );
}
