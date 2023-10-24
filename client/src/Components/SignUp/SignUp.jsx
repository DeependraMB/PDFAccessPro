import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./SignUp.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import validationSchema from "./validationSchema";
import { toast } from "react-toastify";
import { FormControl, InputLabel } from "@mui/material";
import { useEffect } from "react";

export default function SignUp() {
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(data, e) {
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5001/user/register/register",
        data
      );

      if (response.data && response.data.success === false) {
        toast.error(response.data.message);
      } else if (response.data && response.data.success === true) {
        toast.success(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <div>
      <div className="signup-page" style={{ paddingTop: "120px" }}>
        <Container
          component="main"
          sx={{
            backgroundColor: "white",
            margin: "0 auto",
            marginTop: "0px",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              marginBottom: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginTop: "25px" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="given-name"
                        fullWidth
                        id="name"
                        label="Name"
                        //autoFocus
                        onBlur={() => trigger("name")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("name");
                        }}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={gender}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="gender"
                          onBlur={() => trigger("gender")}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("gender");
                          }}
                          error={!!errors.gender}
                          fullWidth
                          label="Gender"
                          select // Add select prop to make it a dropdown
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <Typography variant="caption" color="error">
                        {errors.gender.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="phno"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="phno"
                        label="Mobile Number"
                        onBlur={() => trigger("phno")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("phno");
                        }}
                        error={!!errors.phno}
                        helperText={errors.phno ? errors.phno.message : ""}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="d-flex">
                        <TextField
                          {...field}
                          fullWidth
                          id="email"
                          label="Email Address"
                          value={email}
                          autoComplete="email"
                          onBlur={() => trigger("email")}
                          onChange={(e) => {
                            field.onChange(e);
                            setEmail(e.target.value);
                            trigger("email");
                          }}
                          error={!!errors.email}
                          helperText={errors.email ? errors.email.message : ""}
                        />
                       
                      </div>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        onBlur={() => trigger("password")}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("password");
                        }}
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <Grid container justifyContent="center">
              <Grid item className="already">
                <NavLink
                  to="/signin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Already have an account?<span> Sign in </span>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      {/*  */}
    </div>
  );
}
