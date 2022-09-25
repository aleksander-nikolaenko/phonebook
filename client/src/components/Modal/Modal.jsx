import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ active, setActive, children }) => {
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      setActive(false);
    }
  };
  return createPortal(
    <div
      className={
        active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${styles.modal__content} ${styles.active}`
            : `${styles.modal__content}`
        }
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.node,
};
