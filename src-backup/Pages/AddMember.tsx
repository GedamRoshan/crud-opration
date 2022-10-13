import {
  Box,
  Card,
  CardContent,
  FormControl,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMember } from "../Features/Counters/counterSlice";
import { makeStyles } from "@mui/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const useStyles = makeStyles({
  maincontent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "50%",
  },
  addmember: {
    textAlign: "center",
  },
  grnder: {
    color: "black",
    fontWeight: "600",
    margin: "5px",
  },
  formcontrol: {
    width: "100%",
  },
  submitBtn: {
    margin: "5px",
    width: "100%",
  },
  radioBtn: {
    margin: "5px",
  },
  Icon: {
    color: "#1976d2",
  },
});

function AddMember() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [state, setState] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [fNameError, setFNameError] = useState<boolean>(false);
  const [lNameError, setLNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [stateError, setStateError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);

  const onHandlefname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (firstName) {
      setFNameError(false);
    }
    setFirstName(e.target.value);
  };

  const onHandlelname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (lastName) {
      setLNameError(false);
    }
    setLastName(e.target.value);
  };

  const onHandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (email) {
      setEmailError(false);
    }
    setEmail(e.target.value);
  };

  const onHandleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (state) {
      setStateError(false);
    }
    setState(e.target.value);
  };

  const onHandlegender = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gender) {
      setGenderError(false);
    }
    setGender(e.target.value);
  };

  console.log("firstname", firstName);

  const onSubmit = async () => {
    if (
      firstName !== undefined &&
      lastName !== undefined &&
      email !== undefined &&
      state !== undefined &&
      gender !== undefined
    ) {
      const data = {
        fname: firstName,
        lname: lastName,
        email: email,
        state: state,
        gender: gender,
      };
      console.log("data", data);
      const result = await dispatch(addMember(data));
      if (result.payload) {
        navigation("/userDetails");
      }
    } else {
      if (firstName === undefined) {
        setFNameError(true);
      }
      if (lastName === undefined) {
        setLNameError(true);
      }
      if (email === undefined) {
        setEmailError(true);
      }
      if (state === undefined) {
        setStateError(true);
      }
      if (gender === undefined) {
        alert("please Select Gender");
      }
    }
  };
  return (
    <div className={classes.maincontent}>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          className={classes.addmember}
        >
          <div>
            <PersonAddIcon fontSize="large" className={classes.Icon} />
          </div>
          Add Member
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              error={fNameError}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              onChange={onHandlefname}
            />

            <TextField
              error={lNameError}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              onChange={onHandlelname}
            />
          </div>
          <div>
            <TextField
              error={emailError}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={onHandleEmail}
            />

            <TextField
              error={stateError}
              id="outlined-basic"
              label="State"
              variant="outlined"
              onChange={onHandleState}
            />
          </div>
          <FormControl className={classes.formcontrol}>
            <label className={classes.grnder}>Gender</label>
            <RadioGroup
              className={classes.radioBtn}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={onHandlegender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <div className={classes.submitBtn}>
              <Button fullWidth variant="contained" onClick={onSubmit}>
                {" "}
                Submit
              </Button>
            </div>
          </FormControl>
        </Box>
      </CardContent>
    </div>
  );
}

export default AddMember;
