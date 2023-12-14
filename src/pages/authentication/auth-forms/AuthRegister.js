import { useEffect, useState } from 'react';
import React from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from 'actions/auth';
import PropTypes from 'prop-types';
// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  // FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = ({ register, isAuthenticated }) => {
  const [language, setLanguage] = React.useState('English');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    password: ''
  });
  const { firstname, lastname, company, email, password } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    register(formData);
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleChange_l = (e) => setLanguage(e.target.value);
  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          company: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname-login"
                  type="firstname"
                  value={firstname}
                  name="firstname"
                  onChange={handleChange}
                  placeholder="John"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="lastname-signup"
                  type="lastname"
                  value={lastname}
                  name="lastname"
                  onChange={handleChange}
                  placeholder="Doe"
                  inputProps={{}}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="company-signup">Company</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="company-signup"
                  value={company}
                  name="company"
                  onChange={handleChange}
                  placeholder="Demo Inc."
                  inputProps={{}}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <FormControl sx={{ m: 1, minWidth: 120, marginTop: '30px' }} size="small">
                  <InputLabel id="demo-select-small-label">Select Language</InputLabel>
                  <Select labelId="demo-select-small-label" id="demo-select-small" value={language} label="Age" onChange={handleChange_l}>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Chinese">Chinese</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="email-login"
                  type="email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  placeholder="demo@company.com"
                  inputProps={{}}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-signup">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                  inputProps={{}}
                />
              </Stack>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                By Signing up, you agree to our &nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Terms of Service
                </Link>
                &nbsp; and &nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Privacy Policy
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                  Create Account
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="caption">Sign up with</Typography>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <FirebaseSocial />
            </Grid>
          </Grid>
        </form>
      </Formik>
    </>
  );
};
AuthRegister.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(AuthRegister);
