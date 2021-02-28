import React from "react";
import { Table } from "./Table/Table";
import logo from "./assets/logo-stackoverflow.png";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  layout: {
    padding: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.layout}>
      <h1>
        Welcome to the Ugly{" "}
        <img src={logo} width="250" alt="Stack Overflow's logo" />
      </h1>
      <Table />
    </main>
  );
};

export default App;
