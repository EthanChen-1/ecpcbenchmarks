import React, { useEffect, useRef } from "react";
import classes from "./AddBenchmarkForm.module.css";
import Button from "../UI/Button/Button";

const INTEL_CPU_LIST = ["i9 13900K", "i7 13700K", "i5 13600K", "i3 13100"];
const RYZEN_CPU_LIST = [
  "Ryzen 7950X",
  "Ryzen 7800X3D",
  "Ryzen 7700X",
  "Ryzen 7600X",
];

const RAM_LIST = [
  "DDR5-6000MHz",
  "DDR5-5600MHz",
  "DDR5-5200MHz",
  "DDR5-4800MHz",
];

const NVIDIA_GPU_LIST = ["RTX 4090", "RTX 4080", "RTX 4070Ti", "RTX 4070"];
const AMD_CPU_LIST = ["Radeon 7900XTX", "Radeon 7900XT"];

export default function AddBenchmarkForm(props) {
  const selectedGameRef = useRef("");
  const selectedCPURef = useRef("");
  const selectedRAMRef = useRef("");
  const selectedGPURef = useRef("");
  const avgFPS = useRef("");
  const onePercentLow = useRef("");

  useEffect(() => {
    selectedGameRef.current.value = "Counter Strike";
    selectedCPURef.current.value = "i9 13900K";
    selectedRAMRef.current.value = "DDR5-6000MHz";
    selectedGPURef.current.value = "RTX 4090";
    avgFPS.current.value = "0";
    onePercentLow.current.value = "0";
    return;
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = {
      selectedGame: selectedGameRef.current.value,
      selectedCPU: selectedCPURef.current.value,
      selectedRAM: selectedRAMRef.current.value,
      selectedGPU: selectedGPURef.current.value,
      avgFPS: avgFPS.current.value,
      onePercentLow: onePercentLow.current.value,
      dateSubmitted: new Date(),
    };
    try {
      const response = await fetch(
        "https://ecpc-gaming-benchmark-default-rtdb.firebaseio.com/benchmarks.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const data = await response.json();
      props.setBenchmarks((prev) => {
        return [...prev, { id: data.name, ...formData }];
      });
    } catch (err) {
      console.log(err.message);
    }
    selectedGameRef.current.value = "Counter Strike";
    selectedCPURef.current.value = "i9 13900K";
    selectedRAMRef.current.value = "DDR5-6000MHz";
    selectedGPURef.current.value = "RTX 4090";
    avgFPS.current.value = "0";
    onePercentLow.current.value = "0";
    props.onCloseBenchmarkForm();
  };

  return (
    <>
      <form className={classes.formControl} onSubmit={formSubmitHandler}>
        <label>Game:</label>
        <select ref={selectedGameRef}>
          <option value="Counter Strike">Counter Strike</option>
          <option value="World of Warcraft">World of Warcraft</option>
          <option value="Valorant">Valorant</option>
        </select>
        <label>CPU:</label>
        <select ref={selectedCPURef}>
          {INTEL_CPU_LIST.map((cpu) => {
            return (
              <option key={cpu} value={cpu}>
                {cpu}
              </option>
            );
          })}
          {RYZEN_CPU_LIST.map((cpu) => {
            return (
              <option key={cpu} value={cpu}>
                {cpu}
              </option>
            );
          })}
        </select>
        <label>RAM:</label>
        <select ref={selectedRAMRef}>
          {RAM_LIST.map((ram) => (
            <option key={ram} value={ram}>
              {ram}
            </option>
          ))}
        </select>
        <label>GPU:</label>
        <select ref={selectedGPURef}>
          {NVIDIA_GPU_LIST.map((gpu) => (
            <option key={gpu} value={gpu}>
              {gpu}
            </option>
          ))}
          {AMD_CPU_LIST.map((gpu) => (
            <option key={gpu} value={gpu}>
              {gpu}
            </option>
          ))}
        </select>
        <label>Average FPS</label>
        <input
          type="number"
          ref={avgFPS}
          min="0"
          defaultValue={avgFPS.current.value}
        />
        <label>1% Lows</label>
        <input
          type="number"
          ref={onePercentLow}
          min="0"
          defaultValue={onePercentLow.current.value}
        />
        <Button type="submit">Submit</Button>{" "}
        <Button onClick={props.onCloseBenchmarkForm}>Cancel</Button>
      </form>
    </>
  );
}
