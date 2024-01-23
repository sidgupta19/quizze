import styles from './styles/Button.module.css';

export default function Button({
  children = 'button',
  type = 'submit',
  style,
  variant,
}) {
  const buttonVariant = variant ? styles[variant] : '';

  return (
    <button
      style={{ ...style }}
      className={`${styles.button} ${buttonVariant}`}
      type={type}
    >
      {children}
    </button>
  );
}
