import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

interface ToastProps {
  message: string | null;
}

const EXIT_DURATION_MS = 200;

function Toast({ message }: ToastProps) {
  const [displayMessage, setDisplayMessage] = useState<string | null>(null);
  const [prevMessage, setPrevMessage] = useState<string | null>(null);

  if (message !== prevMessage) {
    setPrevMessage(message);
    if (message) {
      setDisplayMessage(message);
    }
  }

  const visible = message !== null;

  useEffect(() => {
    if (visible || !displayMessage) return;
    const timer = setTimeout(() => setDisplayMessage(null), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [visible, displayMessage]);

  if (!displayMessage) return null;

  return (
    <div className={`${styles.toast} ${visible ? styles.visible : styles.hidden}`}>
      {displayMessage}
    </div>
  );
}

export default Toast
