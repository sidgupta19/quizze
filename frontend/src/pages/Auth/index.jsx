import { Tab } from '@headlessui/react';
import logo from '../../assets/QUIZZIE.png';
import { Button } from '../../components/ui';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from './styles/index.module.css';

export default function Auth() {
  return (
    <div className={styles.container}>
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
