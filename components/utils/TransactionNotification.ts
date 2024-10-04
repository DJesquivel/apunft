// TransactionNotification.tsx
import React from "react";
import { notification } from "antd";

const TransactionNotification = () => {
  const openNotification = (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description: string
  ) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight", // You can adjust the position
      duration: 3, // Duration in seconds before auto close
    });
  };

  const notifyTransactionSubmitted = () => {
    openNotification(
      "info",
      "Transaction submitted",
      "Your transaction has been submitted successfully."
    );
  };

  const notifyTransactionProcessing = () => {
    openNotification(
      "info",
      "Transaction processing",
      "Your transaction is currently being processed."
    );
  };

  const notifyTransactionSuccess = () => {
    openNotification(
      "success",
      "Transaction success!",
      "Your transaction has been completed successfully."
    );
  };

  const notifyTransactionFailed = () => {
    openNotification(
      "error",
      "Transaction failed",
      "Your transaction has failed. Please try again."
    );
  };

  return {
    notifyTransactionSubmitted,
    notifyTransactionProcessing,
    notifyTransactionSuccess,
    notifyTransactionFailed,
  };
};

export default TransactionNotification;
