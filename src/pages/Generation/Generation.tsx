import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UpperNavBar from "../../components/UpperNavBar/UpperNavBar";
import LowerNavBar from "../../components/LowerNavBar/LowerNavBar";
import background from "../../assets/background.jpg";
import styles from "./Generation.module.css";

const Generation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queueNumber, setQueueNumber] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null); // To store the service ID
  const [isLoading, setIsLoading] = useState(false);

  const services: { [key: number]: string } = {
    1: "Document Request and Claiming",
    8: "Document Submission",
    11: "Releasing of Checks",
    12: "Assessment and Invoice",
    7: "ID Card Application",
    10: "Student Clearance and Portal",
    2: "Submission of Records",
    3: "Evaluation",
    6: "Registration",
    14: "Cashier",
  };

  // Retrieve queue number, transaction ID, and service ID from location state
  useEffect(() => {
    if (location.state) {
      setQueueNumber(location.state.queueNumber);
      setTransactionId(location.state.uniqueID);
      setServiceId(location.state.serviceId); // Set the serviceId
    }
  }, [location.state]);

  const ProceedToTicket = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/ticket");
    }, 3000);
  };

  return (
    <div className={styles.GenerationPage}>
      <img
        className={styles.Background}
        src={background}
        alt="DLSUD background"
      />
      <UpperNavBar />

      {/* Ticket Details Section */}
      {!isLoading && (
        <div className={styles.Container}>
          <div className={styles.TicketDetails}>
            <h2>QUEUING TICKET</h2>
            <p>
              Your queuing number is:{" "}
              <span className={styles.QueueNumber}>{queueNumber}</span>
            </p>
            <p>
              Transaction ID:{" "}
              <span className={styles.TransactionID}>{transactionId}</span>
            </p>
            <p>
              Proceed to{" "}
              <span className={styles.ServiceName}>
                {services[serviceId || 0]}
              </span>{" "}
              at
              <span className={styles.ServiceID}>
                {" "}
                Counter {serviceId}
              </span>{" "}
              once the number is displayed.
            </p>{" "}
            {/* Display dynamic message based on service ID */}
            <button className={styles.PrintButton} onClick={ProceedToTicket}>
              <span>Print Queuing Ticket</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className={styles.LoadingContainer}>
          <p className={styles.LoadingMessage}>
            Printing your queuing ticket. <br /> Please wait...
          </p>
        </div>
      )}

      <LowerNavBar />
    </div>
  );
};

export default Generation;
