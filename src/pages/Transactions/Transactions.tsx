import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpperNavBar from "../../components/UpperNavBar/UpperNavBar";
import LowerNavBar from "../../components/LowerNavBar/LowerNavBar";
import TransactionButton from "../../components/TransactionButton/TransactionButton";
import styles from "./Transactions.module.css";

// Firebase imports
import { database } from "../../Firebase/Firebase"; // Update path as necessary
import { ref, push, runTransaction, get } from "firebase/database"; // Import necessary Firebase methods

let prevQueueNumber = ""; // stores the previous queue number to display/print for the user
let prevUniqueID = ""; // stores the previous unique ID to display/print for the user

interface Service {
  id: number;
  name: string;
}

const Transactions: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Services array with IDs assigned to each service
  const services: Service[] = [
    { id: 1, name: "Document Request and Claiming" },
    { id: 2, name: "Submission of Records" },
    { id: 3, name: "Evaluation" },
    { id: 6, name: "Registration" },
    { id: 7, name: "ID Card Application" },
    { id: 8, name: "Document Submission" },
    { id: 10, name: "Student Clearance and Portal" },
    { id: 11, name: "Releasing of Checks" },
    { id: 12, name: "Assessment and Invoice" },
    { id: 14, name: "Cashier" },
  ];

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsPopupVisible(true);
  };

  const closePopup = () => setIsPopupVisible(false);

  const proceedToQueuing = async (serviceId: number) => {
    if (serviceId === 14) {
      serviceId = await greedyCounter(); // Dynamically assign the counter with the least queue
    }

    setIsLoading(true);
    setIsPopupVisible(false);
    addToQueue(serviceId);

    setTimeout(() => {
      navigate("/generation", {
        state: {
          queueNumber: prevQueueNumber,
          uniqueID: prevUniqueID,
          serviceId: serviceId,
        },
      });
    }, 3000);
  };

  const addToQueue = (serviceId: number) => {
    
    const queueRef = ref(database, `counters/${serviceId}/queue`);

    generateQueueNumber(serviceId)
      .then((queueNumber) => {
        const trackingId = generateUniqueId(); // Generate the unique identifier for tracking

        console.log("Adding to queue:", queueNumber); // Debugging log

        push(queueRef, {
          queueNumber: queueNumber,
          trackingId: trackingId, // Store the tracking ID here
        })
          .then(() => {
            console.log("Queue entry added successfully");
          })
          .catch((error) => {
            console.error("Failed to add queue entry:", error);
          });
      })
      .catch((error) => {
        console.error("Error generating queue number:", error);
      });
  };

  const generateQueueNumber = (serviceId: number): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const queueCounterRef = ref(database, `queueCounter`);
      runTransaction(queueCounterRef, (currentCounter) => {
        if (currentCounter === null) {
          currentCounter = 0;
        }
        const newCounter = currentCounter + 1;
        return newCounter;
      })
        .then((result) => {
          const queueNumber = `${serviceId}-${result.snapshot
            .val()
            .toString()
            .padStart(4, "0")}`;
          prevQueueNumber = queueNumber; // Debugging log
          console.log(prevQueueNumber);
          resolve(queueNumber);
        })
        .catch((error) => {
          console.error("Transaction failed unexpectedly!", error);
          reject(error);
        });
    });
  };

  const generateUniqueId = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let uniqueId = "";
    for (let i = 0; i < 6; i++) {
      uniqueId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    prevUniqueID = uniqueId;
    console.log(prevUniqueID); // Debugging log
    return uniqueId;
  };

  const greedyCounter = async (): Promise<number> => {
    try {
      const counters = [14, 15, 16]; // List of counters to check
      const queueLengths: { [key: number]: number } = {};
  
      // Retrieve queue lengths for each counter
      for (const counter of counters) {
        const queueRef = ref(database, `counters/${counter}/queue`);
        const snapshot = await get(queueRef); // Fetch queue data
  
        // Count the number of entries in the queue
        queueLengths[counter] = snapshot.exists()
          ? Object.keys(snapshot.val()).length
          : 0;
      }
  
      console.log("Queue lengths:", queueLengths); // Debugging log
  
      // Find the counter with the least people
      let minQueue = Infinity;
      let selectedCounter = counters[0];
      for (const counter of counters) {
        if (queueLengths[counter] < minQueue) {
          minQueue = queueLengths[counter];
          selectedCounter = counter;
        }
      }
  
      return selectedCounter;
    } catch (error) {
      console.error("Error in greedyCounter:", error);
      return 14; // Fallback to default counter in case of error
    }
  };


  return (
    <div className={styles.TransactionPage}>
      <UpperNavBar />
      <main className={styles.TransactionSection}>
        <h2 className={styles.TransactionHeader}>Select Your Service</h2>
        <div className={styles.TransactionButtons}>
          {services.map((service) => (
            <TransactionButton
              key={service.id}
              ServiceName={service.name} // Displaying the name of the service
              OnClick={() => handleServiceClick(service.name)} // Passing service name
            />
          ))}
        </div>
      </main>
      <LowerNavBar />

      {isPopupVisible && !isLoading && (
        <div className={styles.PopupBackground}>
          <div className={styles.Popup}>
            <h2>You have selected: {selectedService}</h2>
            <p>Are you sure this is your desired transaction?</p>
            <div className={styles.PopupButtons}>
              <button className={styles.PopupButton} onClick={closePopup}>
                NO, choose another service
              </button>
              <button
                className={styles.PopupButton}
                onClick={() =>
                  proceedToQueuing(
                    services.find((service) => service.name === selectedService)
                      ?.id || 0
                  )
                }
              >
                YES, proceed to queuing
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className={styles.LoadingBackground}>
          <div className={styles.LoadingContainer}>
            <p className={styles.LoadingMessage}>
              Generating your queuing number. Please wait...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
