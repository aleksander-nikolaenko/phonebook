import { Audio } from 'react-loader-spinner';

import styles from './LoaderPage.module.css';

const LoaderPage = () => {
  return (
    <div className={styles.wrapper}>
      <Audio
        color="#1976d2"
        height="80"
        width="80"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default LoaderPage;
