import React from "react";
import classes from "./Header.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

export default function Header() {
  return (
    <Card>
      <header className={classes.container}>
        <section>
          <h1>ECPC Game Benchmark</h1>
          <nav>
            <ul>
              <li>
                <Button type="button">Example Button</Button>
              </li>
              <li>
                <Button type="button">Example Button 2</Button>
              </li>
            </ul>
          </nav>
        </section>
      </header>
    </Card>
  );
}
