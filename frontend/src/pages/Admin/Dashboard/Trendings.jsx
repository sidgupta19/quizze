import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import styles from './styles/Trendings.module.css';
import formatDate from '../../../utils/formatDate';

export default function Trendings() {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    const accessToken = localStorage.getItem('userToken');

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + 'users/trendings',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Couldn't fetch list");
      }

      const resJson = await res.json();
      return resJson;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchList().then((data) => setList(data.data.docs));
  }, [fetchList]);

  const copyLink = (id, type) => {
    const url = new URL(window.location.href);
    url.pathname = '';

    // Get the modified URL
    const modifiedUrl = url.href;
    navigator.clipboard.writeText(`${modifiedUrl}user/${type}/${id}`);
    toast.success('URL copied to clipboard');
  };

  return (
    <div className={styles.container}>
      <h2>Trending Quizzes</h2>

      <div className={styles.quizCards}>
        {list?.map((el) => (
          <div
            type="button"
            onClick={() => copyLink(el._id, el.category)}
            key={el._id}
            className={styles.card}
          >
            <div>
              <p className={styles.name}>{el.name}</p>
              <div className={styles.impressions}>
                <p>{el.impressions}</p>
                <Icon style={{ fontSize: '1.5rem' }} icon="iconoir:eye" />
              </div>
            </div>
            <p className={styles.date}>
              Created on: {formatDate(el.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
