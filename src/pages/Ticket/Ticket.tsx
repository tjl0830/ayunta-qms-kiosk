import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import UpperNavBar from "../../components/UpperNavBar/UpperNavBar";
import LowerNavBar from "../../components/LowerNavBar/LowerNavBar";
import background from "../../assets/background.jpg";
import styles from "./Ticket.module.css";

function Ticket() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Set a timer to navigate to the welcome page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Navigate to the Welcome page after 5 seconds
    }, 8000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]); // The effect depends on the navigate function

  return (
    <div className={styles.TicketPage}>
      <img
        className={styles.Background}
        src={background}
        alt="DLSUD background"
      />

      <header className={styles.Header}>
        <UpperNavBar />
      </header>

      <main className={styles.MainContent}>
        <h1 className={styles.TicketHeading}>
          Your queuing ticket has been successfully printed!
        </h1>
        <p className={styles.TicketDescription}>
          Using the indicated transaction ID below the queuing number, you can
          track the queue’s progress at{" "}
          <a href="https://www.dlsud.com" className={styles.TicketLink}>
            www.dlsud.com
          </a>
          .
        </p>
      </main>

      <footer className={styles.Footer}>
        <LowerNavBar />
      </footer>
    </div>
  );
}

export default Ticket;
