import { Button, Input } from '../../components/ui';
import styles from './styles/Starter.module.css';

export default function Starter({
  quizType,
  setQuizType,
  setIsOpen,
  setIsStarted,
}) {
  return (
    <>
      <Input placeholder="Quiz name" />
      <div className={styles.buttons}>
        <p>Quiz type</p>
        <Button
          variant={quizType == 'quiz' ? 'primary' : ''}
          onClick={() => setQuizType('quiz')}
        >
          Q & A
        </Button>
        <Button
          variant={quizType == 'poll' ? 'primary' : ''}
          onClick={() => setQuizType('poll')}
        >
          Poll quizType
        </Button>
      </div>

      <div className={styles.actions}>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button variant="primary" onClick={() => setIsStarted(true)}>
          Continue
        </Button>
      </div>
    </>
  );
}
