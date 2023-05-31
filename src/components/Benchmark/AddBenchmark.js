import React, { useState } from "react";
import classes from "./AddBenchmark.module.css";
import Card from "../UI/Card/Card";
import AddBenchmarkForm from "./AddBenchmarkForm";
import Button from "../UI/Button/Button";

export default function AddBenchmark(props) {
  const [showBenchmark, setShowBenchmark] = useState(false);
  const showBenchmarkFormHandler = () => {
    setShowBenchmark(true);
  };

  const onCloseBenchmarkForm = () => {
    setShowBenchmark(false);
  };
  return (
    <Card>
      <section className={classes.background}>
        <header className={classes.title}>
          <h1>Add a New Benchmark</h1>
        </header>
        {showBenchmark && (
          <AddBenchmarkForm
            setBenchmarks={props.setBenchmarks}
            onCloseBenchmarkForm={onCloseBenchmarkForm}
          />
        )}
        {!showBenchmark && (
          <Button onClick={showBenchmarkFormHandler}>Add Benchmark</Button>
        )}
      </section>
    </Card>
  );
}
