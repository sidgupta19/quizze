import { Toaster } from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom';
import Naviagtion from './Naviagtion';
import styles from './styles/index.module.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../store/authContext';

export default function AdminLayout() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      console.log('navigate');
      navigate('/auth');
    }
  }, [user, navigate, isLoading]);

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
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.main}>
          <div className={styles.navigation}>
            <Naviagtion />
          </div>
          <div className={styles.outlet}>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
