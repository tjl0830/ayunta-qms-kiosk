import Welcome from "./pages/Welcome/Welcome";
import Transactions from "./pages/Transactions/Transactions";
import resetQueueCounterDaily from "./Firebase/resetQueueCounterDaily";
import Generation from "./pages/Generation/Generation";
import Ticket from "./pages/Ticket/Ticket";
import CutoffPopup from "./components/CutoffPopup/CutoffPopup";
import useCutoffTime from "./hooks/useCutoffTime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";

function App() {
  const isWithinCutoff = useCutoffTime();

  useEffect(() => {
    // Reset the queue counter daily when the website is opened
    resetQueueCounterDaily();
  }, []);

  // Effect to manage body scrolling
  useEffect(() => {
    if (isWithinCutoff) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to ensure scroll is re-enabled
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isWithinCutoff]);

  return (
    <div className={isWithinCutoff ? 'no-scroll' : ''}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      </BrowserRouter>
      {isWithinCutoff && <CutoffPopup />}
    </div>
  );
}

export default App;
