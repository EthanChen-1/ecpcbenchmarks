import React from "react";
import classes from "./Pagination.module.css";

export default function Pagination(props) {
  const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

  const onPageClick = (pg) => {
    return () => props.setCurrentPage(pg);
  };
  return (
    <div className={classes.paginationControl}>
      <nav>
        <ul>
          {pageNumbers.map((pg) => {
            return (
              <li key={pg} onClick={onPageClick(pg)}>
                {pg}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
