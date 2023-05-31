import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddBenchmark from "./components/Benchmark/AddBenchmark";
import ViewBenchmark from "./components/Benchmark/ViewBenchmark";

function App() {
  const [benchmarks, setBenchmarks] = useState([]);

  const getBenchmarks = useCallback(async () => {
    try {
      const response = await fetch(
        "https://ecpc-gaming-benchmark-default-rtdb.firebaseio.com/benchmarks.json"
      );
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const data = await response.json();

      for (const benchmarkKey in data) {
        setBenchmarks((prev) => {
          return [...prev, { ...data[benchmarkKey], id: benchmarkKey }];
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    getBenchmarks();
    return;
  }, [getBenchmarks, setBenchmarks]);

  return (
    <React.Fragment>
      <Header />
      <AddBenchmark setBenchmarks={setBenchmarks} />
      <ViewBenchmark benchmarks={benchmarks} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
