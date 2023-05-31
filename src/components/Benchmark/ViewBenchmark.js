import React, { useState } from "react";
import classes from "./ViewBenchmark.module.css";
import Card from "../UI/Card/Card";
import Pagination from "../UI/Pagination/Pagination";

export default function ViewBenchmark(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentShownData = props.benchmarks.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(props.benchmarks.length / recordsPerPage);

  let benchmarkData = (
    <>
      <span />
      <p>Looks like there are no benchmarks, try adding some!</p>
      <span />
    </>
  );

  if (currentShownData.length > 0) {
    benchmarkData = currentShownData.map((benchmark) => (
      <li key={benchmark.id}>
        <table>
          <tbody>
            <tr>
              <th>
                <h3>Game</h3>
              </th>
              <th>
                <h3>User Specs</h3>
              </th>
              <th>
                <h3>Benchmark Data</h3>
              </th>
            </tr>
            <tr>
              <td>
                <h4>{benchmark.selectedGame}</h4>
              </td>
              <td>
                <p>CPU: {benchmark.selectedCPU}</p>
                <p>RAM: {benchmark.selectedRAM}</p>
                <p>GPU:{benchmark.selectedGPU}</p>
              </td>
              <td>
                <p>AVERAGE FPS: {benchmark.avgFPS}</p>
                <p>1% LOW: {benchmark.onePercentLow}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    ));
  }

  return (
    <Card>
      <ul className={classes.benchmark}>{benchmarkData}</ul>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Card>
  );
}
