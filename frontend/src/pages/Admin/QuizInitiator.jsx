import { useContext } from 'react';

import { Button, Input } from '../../components/ui';
import useInput from '../../hooks/useInput';
import styles from './styles/QuizInitiator.module.css';
import { ModalContext } from './Naviagtion';

export default function QuizInitiator({
  setIsCreatingQuiz,
  quizType,
  setQuizName,
  setQuizType,
}) {
  const { toggleModal } = useContext(ModalContext);
  const inputProps = useInput();

  const handleProceed = () => {
    setIsCreatingQuiz(true);
    setQuizName(inputProps.value);
  };

  return (
    <div>
      <Input {...inputProps} placeholder="Quiz name" />
      <div className={styles.quizType}>
        <p>Quiz Type</p>
        <Button
          variant={quizType == 'quiz' ? 'primary' : ''}
          onClick={() => setQuizType('quiz')}
        >
          Q&A
        </Button>
        <Button
          variant={quizType == 'poll' ? 'primary' : ''}
          onClick={() => setQuizType('poll')}
        >
          Poll
        </Button>
      </div>
      <div className={styles.actions}>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button variant="primary" onClick={handleProceed}>
          Continue
        </Button>
      </div>
    </div>
  );
}
