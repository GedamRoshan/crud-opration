
import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addMember, editMember } from "../Features/Members/memberSlice";
import { makeStyles } from "@mui/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import uuid from "react-uuid";
import { useTranslation } from "react-i18next";
  
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
  fName: string;
  lName: string;
  email: string;
  state: string;
  gender: string;
}

function AddMember() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const members = useSelector((state: any) => state?.memberlist);
  const editId = location?.pathname.split("/")?.[2];
  
  console.log("location",location)
  console.log("editId",editId)
  
  const editData = members?.filter((item: any) => item?.id === editId);
  const { t, i18n } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email address").required(t("Please enter valid email address")),
    fName: Yup.string().required(t("Please enter firstname")),
    lName: Yup.string().required(t("Please enter lastname")),
    state: Yup.string().required(t("Please enter state")),
    gender: Yup.string().required(t("Please select gender")),
  });

  const initiData = {
    fName: editData?.[0]?.fName,
    lName: editData?.[0]?.lName,
    email: editData?.[0]?.email,
    state: editData?.[0]?.state,
    gender: editData?.[0]?.gender,
  };

  const onSubmit = async (values: MyValues) => {
    const data = {
      id: editId ? editId : uuid(),
      fName: values.fName,
      lName: values.lName,
      email: values.email,
      state: values.state,
      gender: values.gender,
    };
    if (editId) {
      await dispatch(editMember(data));
    } else {
      await dispatch(addMember(data));
    }
    navigation("/memberdetails");
  };
  const formik: FormikProps<MyValues> = useFormik<MyValues>({
    initialValues: initiData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit,
  });
  console.log("formik", formik);
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
          {editId ? t("Update Member") : t("Add Member")}
        </Typography>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              fullWidth
              error={formik.touched.fName && formik.errors.fName ? true : false}
              id="outlined-basic"
              label={t("First Name")}
              variant="outlined"
              helperText={formik.touched.fName && formik.errors.fName}
              inputProps={{
                type: "text",
                name: "fName",
                id: "fname",
                value: formik.values.fName,
                onChange: formik.handleChange,
              }}
            />

            <TextField
              error={formik.touched.lName && formik.errors.lName ? true : false}
              id="outlined-basic"
              label={t("Last Name")}
              variant="outlined"
              helperText={formik.touched.lName && formik.errors.lName}
              inputProps={{
                type: "text",
                name: "lName",
                id: "lname",
                value: formik.values.lName,
                onChange: formik.handleChange,
              }}
            />
          </div>
          <div>
            <TextField
              error={formik.touched.email && formik.errors.email ? true : false}
              id="outlined-basic"
              label={t("Email")}
              variant="outlined"
              helperText={formik.touched.email && formik.errors.email}
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
              label={t("State")}
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
            <label className={classes.grnder}>{t("Gender")}</label>
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
                label={t("Female")}
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label={t("Other")}
              />
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender ? (
              <Typography style={{ color: "red", fontSize: 12 }}>
                
               {t("Please Select Gender")}
              </Typography>
            ) : null}{" "}
            <div className={classes.submitBtn}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => formik.handleSubmit()}
              >
                {editId ? t("Update") : t("Submit")}
              </Button>
            </div>
          </FormControl>
        </Box>
      </CardContent>
    </div>
  );
}

export default AddMember;
