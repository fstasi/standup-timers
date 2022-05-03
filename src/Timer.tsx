import React, { useState, useEffect, useCallback } from 'react';
import { timer } from './utils';

export function Timer({
    name, time
  }: timer): React.ReactElement {

    const [isRunning, setIsRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        if(isRunning && timeElapsed < time) {
          setTimeElapsed(timeElapsed + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    });

    const toDoubleDigit = (num: number): string => {
      return num < 10 ? `0${num}` : num.toString();
    };

    const remainingTime = useCallback((time, timeElapsed) => {
      
      
      const remSeconds = time - timeElapsed;

      const remMinutes = Math.floor(remSeconds / 60);

      return `${toDoubleDigit(remMinutes)}:${toDoubleDigit(remSeconds % 60)}`;
      
    }, []);

    return (
        <a
          onClick={() => setIsRunning(!isRunning)}
          className={`timer ${isRunning ? 'timer--active' : ''}`}
        >
          <div className="timer__elapsed" style={{width: `${timeElapsed/time*100}%`}} />
          <div className="timer__text">{name} <span className="timer__time">{remainingTime(time, timeElapsed)}</span></div>
        </a>
      );
  }