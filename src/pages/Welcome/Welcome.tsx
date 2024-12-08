import UpperNavBar from "../../components/UpperNavBar/UpperNavBar";
import LowerNavBar from "../../components/LowerNavBar/LowerNavBar";
import styles from "./Welcome.module.css";
import background from "../../assets/background.jpg";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function from useNavigate

  const handleStartClick = () => {
    // Use navigate to programmatically route to the transaction page
    navigate("/transaction");
  };

  return (
    <main className={styles.WelcomePage}>
      <div className={styles.Content}>
        <img
          className={styles.Background}
          src={background}
          alt="dlsud-background"
        />
        <UpperNavBar />

        <div className={styles.WelcomeMessage}>
          <p className={styles.Header}>Welcome to the Ayuntamiento Building</p>
          <p className={styles.Subheading}>
            To continue, press the ‘Start’ button below.
          </p>
        </div>

        <button
          className={styles.Button}
          type="button"
          onClick={handleStartClick}
        >
          <span>Start</span>
        </button>

        <LowerNavBar />
      </div>
    </main>
  );
};

export default Welcome;
