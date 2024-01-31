import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';

import { Button } from '../../../components/ui';
import Question from '../Question';
import Timer from '../Timer';
import styles from './styles/index.module.css';

export default function Quiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useImmer([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentQustion = quiz?.questions[index];

  const fetchQuiz = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + 'quizzes/' + quizId
      );

      if (!res.ok) {
        const errJson = res.json();
        throw new Error(errJson.mesage ?? 'Quiz not found');
      }

      const resJson = await res.json();
      setQuiz(resJson.data.quiz);
    } catch (error) {
      setError(error);
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    localStorage.setItem('userScore', null);
    fetchQuiz();
  }, [fetchQuiz]);

  const submitAnswers = useCallback(
    async (results) => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + 'quizzes/attempt/' + quizId,
          {
            method: 'PATCH',
            body: JSON.stringify({ results }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          const resError = await res.json();
          console.log(resError);
          throw new Error('Could not submit answers');
        }

        const resData = await res.json();
        localStorage.setItem(
          'userScore',
          JSON.stringify(resData.data.userResults)
        );
      } catch (error) {
        console.log(error);
      }
    },
    [quizId]
  );

  const handleIndex = () => {
    if (index >= quiz.questions.length - 1) {
      submitAnswers(results).then(() => navigate('/user/quiz/results'));
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const addResult = (result) => {
    setResults((draft) => {
      const index = draft.findIndex(
        (res) => res.questionId == result.questionId
      );

      if (index !== -1) {
        draft[index] = result;
      } else {
        draft.push(result);
      }
    });
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else if (quiz) {
    content = (
      <>
        <div className={styles.meta}>
          <p className={styles.count}>
            {index + 1}/{quiz.questions.length}
          </p>
          {quiz.timer && (
            <Timer
              key={index}
              timer={quiz.timer}
              handleTimerEnd={handleIndex}
            />
          )}
        </div>

        <Question
          key={currentQustion._id}
          addResult={addResult}
          question={currentQustion}
        />

        <Button variant={'primary'} onClick={handleIndex}>
          {index >= quiz.questions.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </>
    );
  }

  return <div className={styles.container}>{content}</div>;
}
