import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { deleteMember } from "../Features/Members/memberSlice";
import { useTranslation } from "react-i18next";

interface Iprops {
  id: string;
  fName: string;
  lName: string;
  gender: string;
  state: string;
  email: string;
}



export default function MemberDetails() {
  const List = useSelector((state: any) => state?.memberlist);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const onDeleteTap = async (id: number) => {
    await dispatch(deleteMember(id));
  };
  const onEditTap = async (id: string) => {
    navigation(`/editMember/${id}`);
  };
  const { t, i18n } = useTranslation();
  const [lang, setLang] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const language = event.target.value;
    setLang(event.target.value);
    if (language === "En") {
      setLanguage("en");
    } else if (language === "Fr") {
      setLanguage("fr");
    }
  };

  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  return (
    <Card sx={{ minWidth: 275, height: "100%" }}>
      <CardContent>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {t("Member Details")}
        </Typography>
        <FormControl
          sx={{ m: 1, minWidth: 120, display: "flex", float: "right" }}
        >
          <InputLabel id="demo-simple-select-helper-label">
            {t("Language")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={lang}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"En"}>English</MenuItem>
            <MenuItem value={"Fr"}>French</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>{t("First Name")}</TableCell>
                <TableCell align="right">{t("Last Name")}</TableCell>
                <TableCell align="right">{t("Gender")}</TableCell>
                <TableCell align="right">{t("State")}</TableCell>
                <TableCell align="right">{t("Email")}</TableCell>
                <TableCell align="right">{t("Action")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {List.map((item: Iprops, index: number) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.fName}
                  </TableCell>
                  <TableCell align="right">{item.lName}</TableCell>
                  <TableCell align="right">{item.gender}</TableCell>
                  <TableCell align="right">{item.state}</TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      style={{ marginRight: 10 }}
                      onClick={() => onEditTap(item.id)}
                    >
                      {t("Edit")}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => onDeleteTap(index)}
                    >
                      {t("Delete")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={() => {
            navigation("/addMembers");
          }}
          style={{ display: "flex", float: "right", margin: 20 }}
        >
          {t("Add New Member")}
        </Button>
      </CardContent>
    </Card>
  );
}
