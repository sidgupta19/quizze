import { useCallback, useEffect, useState } from 'react';
import formatDate from '../../../utils/formatDate';
import styles from './styles/index.module.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Modal from '../../../components/ui/Modal';
import { Button } from '../../../components/ui';
import useModal from '../../../hooks/useModal';
import toast from 'react-hot-toast';
import QuizCreator from '../QuizCreator';

export default function Analytics() {
  const [quizzes, setQuizzes] = useState([]);
  const { isOpen: delteIsOpen, toggleModal: toggleDeletModal } = useModal();
  const { isOpen: editIsOpen, toggleModal: toggleEditModal } = useModal();

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

  const [quizToDelete, setQuizToDelete] = useState(null);

  const handleDelete = (quiz) => {
    toggleDeletModal();
    setQuizToDelete(quiz);
  };

  const confirmDelete = async () => {
    console.log(quizToDelete);
    const category = quizToDelete.category === 'quiz' ? 'quizzes/' : 'polls/';
    const accessToken = localStorage.getItem('userToken');

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + category + quizToDelete._id,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.message || 'Something went wrong');
      }

      toast.success('Successfully deleted');
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (quizToDelete && !delteIsOpen) {
      setQuizToDelete(null);
    }
  }, [delteIsOpen]);

  const [quizToUpdate, setQuizToUpdate] = useState({});

  const handleUpdate = (el) => {
    setQuizToUpdate(el);
    toggleEditModal();
  };

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
              <Icon
                onClick={() => handleUpdate(el)}
                icon="mingcute:edit-line"
              />
              <Icon
                onClick={() => handleDelete(el)}
                icon="mingcute:delete-2-line"
              />
              <Icon icon="mingcute:share-2-line" />
            </td>
            <td>
              <Link to={`/admin/${el.category}/${el._id}`}>
                Question with analysis
              </Link>
            </td>
          </tr>
        ))}
      </table>

      {delteIsOpen && (
        <Modal toggleModal={toggleDeletModal}>
          <div className={styles.modalContent}>
            <h2>Are you confirm you want to delete?</h2>
            <div className={styles.actions}>
              <Button variant="error" onClick={confirmDelete}>
                Confirm Delete
              </Button>
              <Button onClick={toggleDeletModal}>Cancel</Button>
            </div>
          </div>
        </Modal>
      )}

      {editIsOpen && (
        <Modal toggleModal={toggleEditModal}>
          <QuizCreator
            quizType={quizToUpdate.category}
            defaultData={quizToUpdate}
            actions="update"
          />
        </Modal>
      )}
    </div>
  );
}
