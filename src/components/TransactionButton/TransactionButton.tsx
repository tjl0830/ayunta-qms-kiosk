import React from "react";
import styles from "./TransactionButton.module.css";

interface TransactionButtonProps {
  ServiceName: string;
  OnClick: (serviceName: string) => void;
}

const TransactionButton: React.FC<TransactionButtonProps> = ({
  ServiceName,
  OnClick,
}) => {
  return (
    <button
      className={styles.ServiceButton}
      onClick={() => OnClick(ServiceName)}
    >
      {ServiceName}
    </button>
  );
};

export default TransactionButton;
