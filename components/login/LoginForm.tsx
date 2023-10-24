"use client";
import { validateSchema } from "@/utils/validations/validationLoginForm";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { authAPI } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAuth } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export interface FormValues {
  username: string;
  password: string;
  message: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
  message: "",
};

enum Severity {
  WARNING = "warning",
  SUCCESS = "success",
}

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [validInfo, setvalidInfo] = useState({
    color: Severity.WARNING,
    message: "",
  });

  const fetchLogin = async (values: FormValues) => {
    try {
      const { data } = await authAPI.logIn(values);
      if (data) {
        dispatch(setAuth(true));
        setvalidInfo({ color: Severity.SUCCESS, message: data.message });
        router.push("/");
      }
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        const message = error?.response?.data.error;
        setvalidInfo({ message: message, color: Severity.WARNING });
      }
    }
  };

  const handleSubmit = (values: FormValues) => {
    setLoading(true);
    setTimeout(() => {
      fetchLogin(values);
      setLoading(false);
    }, 1000 * 2);
  };

  return (
    <Grid container>
      <Grid item sm={6} xs={12}>
        <Paper>
          <Box m={5} p={3}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validateSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => {
                return (
                  <Form className="py-10">
                    <Typography variant="h5">{"Welcome to Space X"}</Typography>
                    <TextField
                      label="Name"
                      name="username"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={<ErrorMessage name="username" />}
                      error={Boolean(errors.username) && touched.username}
                      required
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="password" />}
                      error={Boolean(errors.password) && touched.password}
                    />
                    <div className="pt-5">
                      <Button variant="outlined" type="submit" fullWidth>
                        {loading ? "Loading..." : "Submit"}
                      </Button>
                      {validInfo.message && (
                        <div className="pt-5">
                          <Alert severity={validInfo.color}>
                            {validInfo.message}
                          </Alert>
                        </div>
                      )}
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={3} xs={false}></Grid>
    </Grid>
  );
}
