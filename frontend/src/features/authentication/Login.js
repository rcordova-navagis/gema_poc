import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './redux/actions';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    InputAdornment,
    Button,
    CircularProgress,
    IconButton,
    Divider
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import geocore from '../../images/geocore.png';
import {USER_ROLES} from './constants/Users';
import {Formik, ErrorMessage} from 'formik';


function Login(props) {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // const loginError = props.authentication.loginError;
    // const user = props.authentication.user;
    // const history = props.history;

    // useEffect(() => {
    //     // console.log('user: ',user);
    //     if (user) {
    //         if (user.rolename === USER_ROLES.DRIVER) {
    //             history.push('/');
    //         } else if (user.rolename === USER_ROLES.DISPATCHER) {
    //             history.push('/');
    //             // history.push('/delivery/manage');
    //         } else {
    //             history.push('/');
    //         }
    //
    //         return;
    //     }
    //
    //     if (loginError && typeof loginError === 'string') {
    //         setError(loginError);
    //     }
    // }, [loginError, user, history]);

    const doLogin = (values, { setSubmitting }) => {
        // if (!values.username || !values.password) {
        //     setError('Invalid Username/Password');
        //     return;
        // }
        setSubmitting(true);

        console.log('doLogin: ',values);

        props.actions.login(values.username, values.password);

        setSubmitting(false);
    };

    return (
        <Grid container
              direction="column"
              className="authentication-page">
            <Grid item
                  container
                  justify="center"
                  xs="6"
                  className="authentication-container">

                <Formik initialValues={{username: '', password: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.username) errors.username = 'Required';
                            if (!values.password) errors.password = 'Required';
                            return errors;
                        }}
                        onSubmit={doLogin}
                >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                }) => (
                    <form action="">
                        <Card>
                            <CardHeader title={<img src={geocore} alt=""/>} />

                            <Divider />

                            <CardContent className="authentication-page-body">


                                <TextField
                                    placeholder="Username"
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <ErrorMessage name="username" component="p"/>

                                <TextField
                                    placeholder="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                        setShowPassword(!showPassword);
                                                    }}
                                                    edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <ErrorMessage name="password" component="p"/>

                            </CardContent>

                            <CardActions className="authentication-page-footer">
                                {
                                    props.authentication.loginPending
                                        ? <CircularProgress disableShrink />
                                        : <Button variant="contained"
                                            onClick={doLogin}
                                            type="submit"
                                            disabled={isSubmitting || props.authentication.loginPending}
                                            color="primary">SIGN IN</Button>
                                }
                            </CardActions>
                        </Card>
                    </form>
                )}
                </Formik>
            </Grid>
        </Grid>
    );
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        authentication: state.authentication,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...actions}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);