import { useCallback, useEffect, useState } from 'react';
import StatsCard from '../StatsCard';
import Trendings from './Trendings';
import styles from './styles/index.module.css';

export default function Dashboard() {
  const [stats, setStats] = useState({});

  const fetchStats = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('userToken');
      if (!accessToken) {
        throw new Error('Access token not available');
      }

      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + 'users/stats',
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Couldn't fetch data");
      }

      const resObj = await res.json();

      return resObj;
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchStats().then((data) => setStats(data.data.stats));
  }, [fetchStats]);

  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <StatsCard
          color={'#FF5D01'}
          number={stats.totalQuizzesAndPolls}
          text="Quiz created"
        />
        <StatsCard
          color={'#60B84B'}
          number={stats.totalQuestions}
          text="Questions created"
        />
        <StatsCard
          color={'#5076FF'}
          number={stats.totalImpressions}
          text="Total Impressions"
        />
      </div>

      <Trendings />
    </div>
  );
}
