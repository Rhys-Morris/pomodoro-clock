import React, { useState, useEffect } from "react";

const Pomodoro = (props) => {
  const [timer, setTimer] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);

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
    document.querySelector(".pomodoro").className = "pomodoro pomodoro--work";
    document.querySelector("body").className = "";
    document.title = "Pomodoro Timer";
  };

  const forceBreakActive = () => {
    setOnBreak(true);
    setTimer(breakTime);
    document.querySelector(".pomodoro").className = "pomodoro pomodoro--break";
    document.querySelector("body").className = "body--break";
  };

  const forceWorkActive = () => {
    setOnBreak(false);
    setTimer(workTime);
    document.querySelector(".pomodoro").className = "pomodoro pomodoro--work";
    document.querySelector("body").className = "";
  };

  const changeWorkInterval = (e) => {
    const newTime = e.target.value * 60;
    setWorkTime(newTime);
    if (!onBreak) setTimer(newTime);
  };

  const changeBreakInterval = (e) => {
    const newTime = e.target.value * 60;
    setBreakTime(newTime);
    if (onBreak) setTimer(newTime);
  };

  useEffect(() => {
    let decrementClock;

    // Timer completed
    if (timer === 0) {
      if (!onBreak) {
        setIsActive(false);
        setIsCompleted(true);
        setOnBreak(true);
        setTimer(breakTime);
        document.querySelector(".pomodoro").className =
          "pomodoro pomodoro--break";
        document.querySelector("body").className = "body--break";
      } else {
        setIsActive(false);
        setIsCompleted(true);
        setOnBreak(false);
        setTimer(workTime);
        document.querySelector(".pomodoro").className =
          "pomodoro pomodoro--work";
        document.querySelector("body").className = "";
      }
    }

    if (isActive) {
      decrementClock = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      document.title = `${formattedMinutes(timer)}:${formattedSeconds(
        timer
      )} - Let's get to work!`;
    }
    return () => clearInterval(decrementClock);
  }, [isActive, isCompleted, timer, onBreak, breakTime, workTime]);

  return (
    <div className="pomodoro pomodoro--work">
      <div className="pomodoro__select-active">
        <button
          className="pomodoro__select-active__button"
          onClick={forceWorkActive}
          disabled={isActive}
        >
          Pomodoro
        </button>
        <button
          className="pomodoro__select-active__button"
          onClick={forceBreakActive}
          disabled={isActive}
        >
          Break
        </button>
      </div>
      <h3 className="pomodoro__status">
        {onBreak ? "Rest and recuperate!" : "Let's get to work!"}
      </h3>
      <p className="pomodoro__timer">
        {`${formattedMinutes(timer)}:${formattedSeconds(timer)}`}
      </p>
      <div className="pomodoro__buttons">
        <button className="btn" onClick={toggleActive} id="clock-control">
          {isActive ? "Stop" : "Start"}
        </button>
        <button className="btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
      <div className="pomodoro__ranges">
        <div className="pomodoro__ranges--break">
          <label for="break-toggle">Break Interval</label>
          <input
            disabled={isActive}
            id="break-toggle"
            type="range"
            max="15"
            min="5"
            step="5"
            onChange={changeBreakInterval}
          />
          <span id="break-time">{breakTime / 60} minutes</span>
        </div>
        <div className="pomodoro__ranges--work">
          <label for="work-toggle">Work Interval</label>
          <input
            disabled={isActive}
            id="work-toggle"
            type="range"
            max="45"
            min="25"
            step="5"
            onChange={changeWorkInterval}
          />
          <span id="work-time">{workTime / 60} minutes</span>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
