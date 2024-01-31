import { Tab } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuid } from 'uuid';
import { Button } from '../../components/ui';
import Options from './Options';
import QuestionCreator from './QuestionCreator';
import Timer from './Timer';
import styles from './styles/QuizCreator.module.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ModalContext } from './Naviagtion';

const defaultQuiz = (name, type, actions, defaultData) => {
  console.log('defaultData:', defaultData);

  if (actions === 'update') {
    return defaultData;
  }

  return {
    category: type,
    name: name,
    timer: null,
    questions: [
      {
        _id: uuid(),
        question: '',
        optionsType: 'text',
        options: [{ text: '' }, { text: '' }],
        answer: 0,
      },
    ],
  };
};

export default function QuizCreator({
  quizName,
  quizType,
  defaultData,
  actions,
}) {
  const [quiz, setQuiz] = useImmer(() =>
    defaultQuiz(quizName, quizType, actions, defaultData)
  );
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { toggleModal } = useContext(ModalContext);

  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  const getQuestion = (state, id) => {
    const question = state.questions.find((question) => question._id == id);

    if (!question) {
      throw new Error('Question not found');
    }

    return question;
  };

  const handleQuestionChange = (id, val) => {
    console.log('name change request on:', id);
    setQuiz((draft) => {
      const question = getQuestion(draft, id);
      question.question = val;
    });
  };

  const addQuestion = () => {
    console.log('add Question');
    const defaultQuestion = {
      _id: uuid(),
      question: '',
      optionsType: 'text',
      options: [{ text: '' }, { text: '' }],
      answer: 0,
    };

    setQuiz((draft) => {
      draft.questions.push(defaultQuestion);
    });

    setSelectedTabIndex(quiz.questions.length);
  };

  const deleteQuestion = (id, index) => {
    console.log(id);
    setQuiz((draft) => {
      draft.questions = draft.questions.filter((q) => q._id !== id);
    });

    setSelectedTabIndex(index - 1);
  };

  const resetOptions = (id, type) => {
    setQuiz((draft) => {
      const question = getQuestion(draft, id);
      if (type == 'text') {
        question.options = [{ text: '' }, { text: '' }];
      } else if (type == 'image') {
        question.options = [{ image: '' }, { image: '' }];
      } else {
        question.options = [
          { text: '', image: '' },
          { text: '', image: '' },
        ];
      }
    });
  };

  const handleOptionsTypeChange = (id, type) => {
    setQuiz((draft) => {
      const question = getQuestion(draft, id);
      question.optionsType = type;
    });

    resetOptions(id, type);
  };

  const addOption = (id, type) => {
    setQuiz((draft) => {
      const question = getQuestion(draft, id);

      let option;

      if (type == 'text') {
        option = { text: '' };
      } else if (type == 'image') {
        option = { image: '' };
      } else {
        option = { text: '', image: '' };
      }

      question.options.push(option);
    });
  };

  const deleteOption = (id, index) => {
    console.log(index);
    setQuiz((draft) => {
      const question = getQuestion(draft, id);
      question.options.splice(index, 1);
    });
  };

  const handleAnswerChange = (id, index) => {
    setQuiz((draft) => {
      const question = getQuestion(draft, id);
      question.answer = index;
    });
  };

  const handleOptionChange = (id, index, type, val) => {
    setQuiz((draft) => {
      const question = getQuestion(draft, id);
      question.options[index][type] = val;
    });
  };

  const setTimer = (time) => {
    setQuiz((draft) => {
      draft.timer = time;
    });
  };

  const navigate = useNavigate();

  const createOrUpdateQuiz = useCallback(async () => {
    let updatedQuiz = { ...quiz };

    // remove _id property from default quiz when creating a new quiz
    if (actions !== 'update') {
      const updatedQuestions = quiz.questions.map((el) => ({
        question: el.question || '',
        optionsType: el.optionsType,
        options: el.options || [],
        answer: el.answer || 0,
      }));

      updatedQuiz.questions = updatedQuestions;
    }

    const resource = quiz.category === 'quiz' ? 'quizzes/' : 'polls/';
    const accessToken = localStorage.getItem('userToken');
    console.log(accessToken);

    if (!accessToken) {
      return navigate('/auth');
    }

    let url = import.meta.env.VITE_BACKEND_URL + resource;

    if (actions === 'update') {
      console.log(quiz._id);

      url = import.meta.env.VITE_BACKEND_URL + resource + quiz._id;
    }

    try {
      const res = await fetch(url, {
        method: actions === 'update' ? 'PATCH' : 'POST',
        body: JSON.stringify(updatedQuiz),
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      });

      console.log(res);

      if (!res.ok) {
        const errJSON = await res.json();
        console.log(errJSON);
        throw new Error(errJSON.message);
      }

      console.log('success');
      toast.success('Successfully created quiz');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [quiz, navigate, actions]);

  return (
    <div>
      <Tab.Group
        selectedIndex={selectedTabIndex}
        onChange={setSelectedTabIndex}
      >
        <Tab.List className={styles.list}>
          <div className={styles.tabs}>
            {quiz.questions.map((q, index) => (
              <Tab as="div" key={q._id}>
                {({ selected }) => (
                  <div className={selected ? styles.selectedTab : styles.tab}>
                    {actions !== 'update' && index >= 1 && (
                      <button
                        onClick={() => deleteQuestion(q._id, index)}
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

            {actions !== 'update' && quiz.questions.length < 5 && (
              <button onClick={addQuestion} className={styles.addButton}>
                <Plus />
              </button>
            )}
          </div>
          <p>Max 5 questions</p>
        </Tab.List>
        <Tab.Panels>
          {quiz.questions.map((q) => (
            <Tab.Panel key={q.id}>
              <QuestionCreator
                question={q}
                handleQuestionChange={handleQuestionChange}
                quizType={quizType}
                handleOptionsTypeChange={handleOptionsTypeChange}
              >
                <Options
                  actions={actions}
                  question={q}
                  deleteOption={deleteOption}
                  addOption={addOption}
                  handleAnswerChange={handleAnswerChange}
                  handleOptionChange={handleOptionChange}
                />
                {quizType !== 'poll' && (
                  <Timer quiz={quiz} setTimer={setTimer} />
                )}
              </QuestionCreator>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <div className={styles.actions}>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button variant="primary" onClick={createOrUpdateQuiz}>
          {actions === 'update' ? 'Update' : 'Create'} quiz
        </Button>
      </div>
    </div>
  );
}
