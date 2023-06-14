import React from "react";
import "../styles/spinner.css";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loading-spinner"></div>
    </div>
  );
}
