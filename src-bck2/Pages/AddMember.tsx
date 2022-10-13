import {
  Box,
  CardContent,
  FormControl,
  Button,
  FormControlLabel,
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
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

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

interface MyValues {
  firstname: string;
  lastname: string;
  email: string;
  state: string;
  gender: string;
}

function AddMember() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("please enter email"),
    firstname: Yup.string().required("please enter firstname"),
    lastname: Yup.string().required("please enter lastname"),
    state: Yup.string().required("please enter state"),
    gender: Yup.string().required("please select gender"),
  });

  const formik: FormikProps<MyValues> = useFormik<MyValues>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      state: "",
      gender: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const data = {
        fname: values.firstname,
        lname: values.lastname,
        email: values.email,
        state: values.state,
        gender: values.gender,
      };

      const result: any = await dispatch(addMember(data));
      if (result.payload) {
        navigation("/memberdetails");
      }
    },
  });



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
              error={
                formik.touched.firstname && formik.errors.firstname
                  ? true
                  : false
              }
              fullWidth
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              helperText={formik.touched.firstname && formik.errors.firstname}
              inputProps={{
                type: "text",
                name: "firstname",
                id: "fname",
                value: formik.values.firstname,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
              }}
            />

            <TextField
              error={
                formik.touched.lastname && formik.errors.lastname ? true : false
              }
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              helperText={formik.touched.lastname && formik.errors.lastname}
              inputProps={{
                type: "text",
                name: "lastname",
                id: "lname",
                value: formik.values.lastname,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
              }}
            />
          </div>
          <div>
            <TextField
              error={formik.touched.email && formik.errors.email ? true : false}
              id="outlined-basic"
              label="Email"
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              inputProps={{
                type: "email",
                name: "email",
                id: "email",
                value: formik.values.email,
                onChange: formik.handleChange,
              }}
            />

            <TextField
              error={formik.touched.state && formik.errors.state ? true : false}
              id="outlined-basic"
              label="State"
              variant="outlined"
              helperText={formik.touched.state && formik.errors.state}
              inputProps={{
                type: "text",
                name: "state",
                id: "state",
                value: formik.values.state,
                onChange: formik.handleChange,
              }}
            />
          </div>

          <FormControl className={classes.formcontrol}>
            <label className={classes.grnder}>Gender</label>
            <RadioGroup
              className={classes.radioBtn}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={formik.values.gender}
              onChange={(e) =>
                formik.setFieldValue("gender", e.currentTarget.value)
              }
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
            {formik.touched.gender && formik.errors.gender ? (
              <Typography style={{ color: "red", fontSize: 12 }}>
                {" "}
                Please Select Gender{" "}
              </Typography>
            ) : null}

            <div className={classes.submitBtn}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => formik.handleSubmit()}
              >
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
