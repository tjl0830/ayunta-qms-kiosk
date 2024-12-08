import styles from "./LowerNavBar.module.css";

function LowerNavBar() {
  return (
    <div className={styles.bottomNavBar}>
      <div className={styles.overlapGroup}>
        <p className={styles.textWrapper}>
          Office of the University Registrar QMS
        </p>
      </div>
    </div>
  );
}

export default LowerNavBar;
