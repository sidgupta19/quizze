import { useState } from 'react';
import { Button, Input } from '../../components/ui';
import styles from './styles/Options.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';

export default function Options({ selectedOption }) {
  const defaultOptions = [
    { value: '', id: uuidv4() },
    { value: '', id: uuidv4() },
  ];
  const [options, setOptions] = useState(defaultOptions);
  const [correctOption, setCorrectOption] = useState(defaultOptions[0]);

  const addOption = () => {
    if (options.length < 4) {
      const newOptions = [...options, { value: '', id: uuidv4() }];
      setOptions(newOptions);
    }
  };

  const removeOption = (id) => {
    if (options.length <= 2) {
      return;
    }

    const option = options.find((opt) => opt.id === id);

    if (option) {
      const updatedOptions = options.filter((opt) => opt.id !== id);
      setOptions(updatedOptions);
    }
  };

  return (
    <div className={styles.optionsGroup}>
      <div className={styles.options}>
        {options.map((option, index) => (
          <div key={option.id}>
            <input
              type="radio"
              name="options"
              onChange={() => setCorrectOption(option)}
              checked={correctOption.id === option.id}
              id={option.id}
            />
            <label htmlFor={option.id}>
              <Input
                placeholder={selectedOption.name == 'image' ? 'Image' : 'Text'}
              />
              {selectedOption.name == 'textAndImage' && (
                <Input placeholder="Image url" />
              )}
            </label>
            {index >= 2 && (
              <Icon
                onClick={() => removeOption(option.id)}
                style={{
                  fontSize: '1.5rem',
                  color: 'red',
                  cursor: 'pointer',
                }}
                icon="mingcute:delete-2-line"
              />
            )}
          </div>
        ))}
      </div>
      {options.length < 4 && <Button onClick={addOption}>Add Option</Button>}
    </div>
  );
}
