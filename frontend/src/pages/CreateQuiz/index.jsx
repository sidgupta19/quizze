import { Tab } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles/index.module.css';

import Question from './Question';
import Starter from './Starter';

function DefaultQuestion() {
  this.id = uuidv4();
  this.question = '';
  this.optionType = 'text';
  this.options = [
    {
      id: uuidv4(),
      text: '',
    },
    {
      id: uuidv4(),
      text: '',
    },
  ];

  this.answer = this.options[0];
}

const defaultQuestions = [new DefaultQuestion()];

export default function CreateQuiz({ setIsOpen }) {
  const [quizType, setQuizType] = useState('quiz');
  const [isStarted, setIsStarted] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [questions, setQuestions] = useImmer(defaultQuestions);

  const addQuestion = useCallback(() => {
    if (questions.length >= 5) {
      return;
    }

    const question = new DefaultQuestion();
    setQuestions((draft) => {
      draft.push(question);
    });
  }, []);

  const removeQuestion = useCallback((id, index) => {
    setQuestions((draft) => {
      const data = draft.filter((q) => q.id !== id);
      return data;
    });

    setSelectedTabIndex(index - 1);
  }, []);

  const updateQuestion = useCallback((question) => {
    const index = questions.findIndex((q) => q.id === question.id);

    if (index !== -1) {
      setQuestions((draft) => draft[index] == question);
    }
  }, []);

  return (
    <div>
      {!isStarted ? (
        <Starter
          quizType={quizType}
          setQuizType={setQuizType}
          setIsOpen={setIsOpen}
          setIsStarted={setIsStarted}
        />
      ) : (
        <Tab.Group
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
        >
          <Tab.List className={styles.list}>
            <div className={styles.tabs}>
              {questions.map((q, index) => (
                <Tab as="div" key={q.id}>
                  {({ selected }) => (
                    <div className={selected ? styles.selectedTab : styles.tab}>
                      {index >= 1 && (
                        <button
                          onClick={() => removeQuestion(q.id, index)}
                          className={styles.cross}
                        >
                          <X size={16} />
                        </button>
                      )}
                      {index + 1}
                    </div>
                  )}
                </Tab>
              ))}

              {questions.length < 5 && (
                <button onClick={addQuestion} className={styles.addButton}>
                  <Plus />
                </button>
              )}
            </div>
            <p>Max 5 questions</p>
          </Tab.List>

          <Tab.Panels>
            {questions.map((q) => (
              <Tab.Panel key={q.id}>
                <Question
                  updateQuestion={updateQuestion}
                  quizType={quizType}
                  question={q}
                  setIsOpen={setIsOpen}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
}
