import { useState } from 'react';
import { Button, Input } from '../../components/ui';
import Options from './Options';
import Timer from './Timer';
import styles from './styles/Question.module.css';

export default function Question({
  question,
  quizType,
  setIsOpen,
  updateQuestion,
}) {
  const optionsType = [
    { id: 0, name: 'text', label: 'Text' },
    { id: 1, name: 'image', label: 'Image' },
    { id: 2, name: 'textAndImage', label: 'Text And Image' },
  ];

  const getType = () => {
    const type = optionsType.find(
      (options) => options.name === question.optionType
    );
    return type;
  };

  const [selectedOption, setSelectedOption] = useState(getType);

  return (
    <>
      <Input
        placeholder={quizType == 'quiz' ? 'Quiz question' : 'Poll question'}
      />

      <div className={styles.optionsTypeGroup}>
        <p>Option Type</p>

        <div className={styles.optionsType}>
          {optionsType.map((type) => (
            <div key={type.id}>
              <input
                type="radio"
                value={type.name}
                onChange={() => setSelectedOption(type)}
                checked={selectedOption.id === type.id}
                id={type.id}
              />
              <label htmlFor={type.id}>{type.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <Options selectedOption={selectedOption} />
        <Timer />
      </div>

      {/* NO ACTION REQUIRED */}
      <div className={styles.actions}>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button variant="primary">Create Quiz</Button>
      </div>
    </>
  );
}
