import { Oval } from 'react-loader-spinner';

import styles from './LoaderButton.module.css';

export const LoaderButton = () => {
  return (
    <div className={styles.wrapper}>
      <Oval
        ariaLabel="loading-indicator"
        height={24}
        width={24}
        strokeWidth={8}
        color="white"
        secondaryColor="white"
      />
    </div>
  );
};
