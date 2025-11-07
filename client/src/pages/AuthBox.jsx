import React, { useState, useEffect, useContext } from "react";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { API } from "../service/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // Import AuthContext

const CenteredContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
`;

const FormBox = styled(Box)`
  width: 400px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled("img")`
  width: 150px;
  margin-bottom: 20px;
`;

const ToggleMessage = styled(Typography)`
  margin-top: 15px;
  text-align: center;
  color: #555;
`;

const ToggleButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  margin-left: 5px;
  padding: 0;
  min-width: auto;
`;

const ErrorText = styled(Typography)`
  color: #ff6161;
  font-size: 13px;
  margin-top: 5px;
  text-align: left;
`;

function AuthBox() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Destructure login from context

  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrors({});
    setInputs({ email: "", password: "", name: "" });
  }, [isLogin]);

  const validateLogin = () => {
    const errs = {};
    if (!inputs.email) errs.email = "Email is required";
    if (!inputs.password) errs.password = "Password is required";
    return errs;
  };

  const validateSignup = () => {
    const errs = {};
    if (!inputs.name) errs.name = "Name is required";
    if (!inputs.email) errs.email = "Email is required";
    if (!inputs.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleLogin = async () => {
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await API.authenticateLogin({
        email: inputs.email,
        password: inputs.password,
      });
      sessionStorage.setItem("token", response.token);

      // Update user context immediately to avoid blink
      login({ token: response.token });

      setLoading(false);
      navigate("/home");
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Login failed!",
      });
      setLoading(false);
    }
  };

 const handleSignup = async () => {
  const validationErrors = validateSignup();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }
  setLoading(true);
  try {
    await API.userSignup({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    });
    setLoading(false);
    // alert("Signup successful! Please login.");
    setIsLogin(true);
    setInputs({ name: "", email: "", password: "" });  // Clear form after signup
    setErrors({});
  } catch (error) {
    setLoading(false);
    setErrors({
      general: error.response?.data?.message || "Signup failed!",
    });
  }
};


  return (
    <CenteredContainer>
      <FormBox>
        <Logo src="/name.png" alt="Logo" />
        {errors.general && <ErrorText>{errors.general}</ErrorText>}

        {isLogin ? (
          <>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              margin="normal"
              type="email"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              margin="normal"
              type="password"
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleLogin}
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <ToggleMessage>
              Don't have an account?
              <ToggleButton
                onClick={() => {
                  setIsLogin(false);
                  setErrors({});
                }}
              >
                Sign Up
              </ToggleButton>
            </ToggleMessage>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              margin="normal"
              type="email"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              margin="normal"
              type="password"
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleSignup}
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <ToggleMessage>
              Already have an account?
              <ToggleButton
                onClick={() => {
                  setIsLogin(true);
                  setErrors({});
                }}
              >
                Login
              </ToggleButton>
            </ToggleMessage>
          </>
        )}
      </FormBox>
    </CenteredContainer>
  );
}

export default AuthBox;
