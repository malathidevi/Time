import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import CSS file
const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isActive && !isPaused) {
        setTimeRemaining(calculateTimeRemaining());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isPaused]);

  function calculateTimeRemaining() {
    const difference = +new Date(targetDate) - +new Date();
    let time = {};

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return time;
  }

  function handleDateChange(event) {
    const newDate = new Date(event.target.value);
    setTargetDate(newDate);
  }

  function startTimer() {
    setIsActive(true);
    setIsPaused(false);
  }

  function pauseTimer() {
    setIsPaused(true);
  }

  function resumeTimer() {
    setIsPaused(false);
  }

  function stopTimer() {
    setTargetDate(new Date());
    setTimeRemaining(calculateTimeRemaining());
    setIsActive(false);
    setIsPaused(false);
  }

  return (
    <div className="countdown-container">
      <h1>Countdown Timer</h1>
      <div className="timer">
        <div>
          <label htmlFor="dateInput">Target Date:</label>
          <input type="datetime-local" id="dateInput" value={targetDate.toISOString().substring(0, 16)} onChange={handleDateChange} />
        </div>
        <div>
          <h2>Time Remaining:</h2>
          <p>{`${timeRemaining.days} days ${timeRemaining.hours} hours ${timeRemaining.minutes} minutes ${timeRemaining.seconds} seconds`}</p>
        </div>
        <div className="buttons">
          {!isActive && !isPaused ? (
            <button onClick={startTimer}>Start</button>
          ) : (
            <>
              <button onClick={pauseTimer} disabled={!isActive || isPaused}>Pause</button>
              <button onClick={resumeTimer} disabled={!isActive || !isPaused}>Resume</button>
              <button onClick={stopTimer}>Stop</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
