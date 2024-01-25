import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styles from './styles/AdminLayout.module.css';
import Naviagtion from '../../components/Naviagtion';

export default function AdminLayout() {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <div className={styles.main}>
        <div className={styles.navigation}>
          <Naviagtion />
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
