import { useCallback, useEffect, useState } from 'react';
import formatDate from '../../../utils/formatDate';
import styles from './styles/Analytics.module.css';
import { Icon } from '@iconify/react';

export default function Analytics() {
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizes = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('userToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + 'users/pollsAndQuizzes',
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        }
      );

      if (!res.ok) {
        throw new Error("Could't fetch data");
      }

      const resData = await res.json();
      return resData;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchQuizes().then((data) => setQuizzes(data.data.docs));
  }, [fetchQuizes]);

  useEffect(() => console.log(quizzes), [quizzes]);

  return (
    <div>
      <h1>Quiz Analysis</h1>

      <table className={styles.table}>
        <tr>
          <th>S.No</th>
          <th>Quiz name</th>
          <th>Created on</th>
          <th>Impression</th>
          <th></th>
          <th></th>
        </tr>
        {quizzes?.map((el, index) => (
          <tr key={el._id}>
            <td>{index + 1}</td>
            <td>{el.name}</td>
            <td>{formatDate(el.createdAt)}</td>
            <td>{el.impressions}</td>
            <td className={styles.icons}>
              <Icon icon="mingcute:edit-line" />
              <Icon icon="mingcute:delete-2-line" />
              <Icon icon="mingcute:share-2-line" />
            </td>
            <td>Question with analysis</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
