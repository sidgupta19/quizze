import styles from './styles/Modal.module.css';

export default function Modal({ children, setIsOpen }) {
  return (
    <div className={styles.container}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.backdrop}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
