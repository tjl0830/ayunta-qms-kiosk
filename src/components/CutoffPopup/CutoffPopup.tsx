import React from 'react';
import styles from './CutoffPopup.module.css';

const CutoffPopup: React.FC = () => {
  return (
    <div className={styles.PopupBackground}>
      <div className={styles.Popup}>
        <h2>Office Hours Notice</h2>
        <p>The office is currently closed.</p>
        <p>Operating hours are from 7:00 AM to 4:00 PM only.</p>
        <p>Please come back during office hours.</p>
      </div>
    </div>
  );
};

export default CutoffPopup; 