import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { login, clearErrors } from '../../actions/userActions';
import {useAlert} from 'react-alert';
import Alert from '@mui/material/Alert';
import '../../App.css'; // Import your CSS file for styling

// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';

const Login = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

 

  useEffect(() => {
    if (isAuthenticated) {
      setShowSuccessAlert(true); // Set the state to show the success alert
      setTimeout(() => {
        setShowSuccessAlert(false); // Hide the success alert after some time (e.g., 3 seconds)
        navigate('/products'); // Redirect to '/products' after hiding the alert
      }, 2000);
    }
  }, [isAuthenticated, navigate]);

 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };


  return (
    <Fragment>
      <MetaData title={'Login'} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {error && (
            <Alert severity="error" onClose={() => dispatch(clearErrors())}>
              {error}
            </Alert>
          )}

          {/* Check if the success alert state is true and display the Alert component */}
          

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email: </label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password: </label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>

                {showSuccessAlert && (
            <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
              Successfully logged in!
            </Alert>
          )}
              </form>
              
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
