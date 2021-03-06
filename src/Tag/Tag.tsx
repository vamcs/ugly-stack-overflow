import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  tag: {
    border: "1px solid #363b3d",
    borderRadius: "3px",
    backgroundColor: "#e8a066",
    padding: "2px 4px",
    color: "#363b3d",
    margin: "2px",
    display: "flex",
    alignItems: "center",
    width: "auto",
  },
});

export const Tag: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.tag}>{children}</div>;
};
