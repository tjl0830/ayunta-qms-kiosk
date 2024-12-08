import { useState, useEffect } from 'react';

const useCutoffTime = () => {
  const [isWithinCutoff, setIsWithinCutoff] = useState(false);

  useEffect(() => {
    const checkCutoffTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      // Cut-off is between 4 PM (16:00) and 7 AM (7:00)
      const isCutoffTime = hours >= 16 || hours < 7;
      
      // Log for debugging
      console.log(`Time check: ${hours}:${minutes}:${seconds} - Cutoff: ${isCutoffTime}`);
      
      setIsWithinCutoff(isCutoffTime);
    };

    // Check immediately on mount
    checkCutoffTime();

    // Check every 10 seconds
    const interval = setInterval(checkCutoffTime, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return isWithinCutoff;
};

export default useCutoffTime; 