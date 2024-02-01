import { Tab } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';

import logo from '../../assets/QUIZZIE.png';
import { Button } from '../../components/ui';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from './styles/index.module.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/authContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#fff',
            color: 'black',
          },
        }}
      />
      <div className={styles.image}>
        <img src={logo} alt="logo" />
      </div>

      <Tab.Group>
        <Tab.List className={styles.tabs}>
          <Tab as="div" className={styles.tab}>
            {({ selected }) => (
              <Button type="button" variant={selected ? '' : 'ghost'}>
                Signup
              </Button>
            )}
          </Tab>
          <Tab as="div" className={styles.tab}>
            {({ selected }) => (
              <Button type="button" variant={selected ? '' : 'ghost'}>
                Login
              </Button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <SignupForm />
          </Tab.Panel>
          <Tab.Panel>
            <LoginForm />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
