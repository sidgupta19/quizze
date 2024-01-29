import { useState } from 'react';
import { Button } from '../../components/ui';
import styles from './styles/Timer.module.css';

export default function Timer() {
  const timerOptions = [
    { id: 0, value: null, name: 'OFF' },
    { id: 1, value: 5, name: '5sec' },
    { id: 2, value: 10, name: '10sec' },
  ];
  const [timer, setTimer] = useState(timerOptions[0]);

  return (
    <div className={styles.timer}>
      <p>Timer</p>
      <div className={styles.timerButtons}>
        {timerOptions.map((el) => (
          <div key={el.id} className="">
            <Button
              variant={timer.id == el.id ? 'error' : ''}
              onClick={() => setTimer(el)}
            >
              {el.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
