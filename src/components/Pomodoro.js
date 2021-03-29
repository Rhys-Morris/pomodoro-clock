import React, { useState, useEffect } from "react";

const Pomodoro = (props) => {
  const [timer, setTimer] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [workTime, setWorkTime] = useState(5);
  const [breakTime, setBreakTime] = useState(3);

  const toggleActive = () => {
    if (isCompleted) setIsCompleted(false);
    setIsActive(!isActive);
  };

  const formattedMinutes = (time) => {
    const minutes = Math.floor(time / 60);
    return String(minutes).length === 1 ? `0${minutes}` : minutes;
  };

  const formattedSeconds = (time) => {
    const seconds = time % 60;
    return String(seconds).length === 1 ? `0${seconds}` : seconds;
  };

  const resetTimer = () => {
    setOnBreak(false);
    setIsActive(false);
    setTimer(workTime);
    setIsCompleted(false);
  };

  const changeWorkInterval = (e) => {
    setWorkTime(e.target.value);
    if (!onBreak) setTimer(workTime);
  };

  const changeBreakInterval = (e) => {
    setBreakTime(e.target.value);
    if (onBreak) setTimer(workTime);
  };

  useEffect(() => {
    let decrementClock;

    // Timer completed
    if (timer === 0) {
      if (!onBreak) {
        setIsActive(false);
        setIsCompleted(true);
        setOnBreak(true);
        setTimer(workTime);
      } else {
        setIsActive(false);
        setIsCompleted(true);
        setOnBreak(false);
        setTimer(breakTime);
      }
    }

    if (isActive) {
      decrementClock = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(decrementClock);
  }, [isActive, isCompleted, timer, onBreak, breakTime, workTime]);

  return (
    <div className="pomodoro-box">
      <h3>{onBreak ? "Rest and recuperate!" : "Let's get to work!"}</h3>
      <p>{`${formattedMinutes(timer)}:${formattedSeconds(timer)}`}</p>
      <button onClick={toggleActive} id="clock-control">
        {isActive ? "Stop" : "Start"}
      </button>
      <button onClick={resetTimer}>Reset</button>
      Break
      <input
        disabled={isActive}
        id="break-toggle"
        type="range"
        max="55"
        min="15"
        onChange={changeBreakInterval}
      />
      Work
      <input
        disabled={isActive}
        id="work-toggle"
        type="range"
        max="55"
        min="15"
        onChange={changeWorkInterval}
      />
    </div>
  );
};

export default Pomodoro;
