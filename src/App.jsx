import { useState, useEffect } from "react";
import Options from "./components/Options.jsx";
import Feedback from "./components/Feedback.jsx";
import Notification from "./components/Notification.jsx";
import Description from "./components/Description.jsx";
import styles from "./App.module.css";


const STORAGE_KEY = "feedback-data";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = type => {
    setFeedback(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage =
    totalFeedback > 0
      ? Math.round((feedback.good / totalFeedback) * 100)
      : 0;

  return (
    <div className={styles.container}>
      <h1>Sip Happens Café</h1>
      <Description />
      <Options
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        hasFeedback={totalFeedback > 0}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}

export default App;