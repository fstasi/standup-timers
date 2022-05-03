import React, { useState, useEffect } from "react";
import { ParamKeyValuePair, useSearchParams } from "react-router-dom";
import { Timer } from "./Timer";
import { timer } from "./utils";

export function App(): React.ReactElement {
  const [timers, setTimers] = useState<timer[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    try {
      const qsTimers = [...searchParams];
      setTimers(qsTimers.map(timer => ({time: parseInt(timer[1]), name: timer[0]})));
    } catch (e) {
      setTimers([]);
    }
  }, [setTimers]);

  const addTimer = (timer: timer): void => {
    updateTimers([...timers, timer]);
  };

  const updateTimers = (newTimers: timer[]): void => {
    setTimers(newTimers);
    const timersArray: ParamKeyValuePair[] = newTimers.map(t => ([t.name, t.time.toString()]));
    setSearchParams(timersArray, {replace: true});
  };

  return (
    <>
      <h2>Tooling Timers</h2>
      <div>
        {timers.map((t, i) => (
          <Timer name={t.name} time={t.time} key={i} />
        ))}
      </div>
    </>
  );
}
