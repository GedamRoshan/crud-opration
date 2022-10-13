import { TableRow } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cardcontent: {
    display: "flex",
  },
  button: {
    margin: "5px",
  },
});

function Home() {
  const classes = useStyles();

  const navigation = useNavigate();
  return (
    <>
      <CardContent className={classes.cardcontent}>
        <div className={classes.button}>
          <Button variant="contained" onClick={() => navigation("/addMembers")}>
            Add Members
          </Button>
        </div>
        <div className={classes.button}>
          <Button
            variant="contained"
            onClick={() => {
              navigation("/userDetails");
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </>
  );
}

export default Home;
