import { ref, set, get } from "firebase/database";
import { database } from "./Firebase.ts"; // Adjust this path as necessary

/**
 * Resets the queueCounter in the Firebase database daily.
 * Checks the last reset date and resets the counter if the date is not today.
 */
export const resetQueueCounterDaily = async () => {
    try {
        const resetDateRef = ref(database, "queueCounterResetDate");
        const queueCounterRef = ref(database, "queueCounter");

        // Fetch the last reset date from Firebase
        const snapshot = await get(resetDateRef);
        const lastResetDate = snapshot.exists() ? snapshot.val() : null;

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        if (lastResetDate !== today) {
            // Reset queue counter to 0 and update the reset date
            await set(queueCounterRef, 0);
            await set(resetDateRef, today);

            console.log("Queue counter has been reset for today.");
        } else {
            console.log("Queue counter is already up-to-date.");
        }
    } catch (error) {
        console.error("Error resetting queue counter:", error);
    }
};

export default resetQueueCounterDaily;