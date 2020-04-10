import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './redux/actions';
import {
    CircularProgress,
    Grid,
    Cell,
    Card,
    TextField,
    FontIcon,
    CardTitle,
    CardText,
    CardActions,
    Button
} from 'react-md';
import geocore from '../../images/geocore.png';
import {USER_ROLES} from './constants/Users';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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

    const doLogin = (e) => {
        e.preventDefault();

        // if (!username || !password) {
        //     setError('Invalid Username/Password');
        //     return;
        // }
        //
        // props.actions.login(username, password);
    };

    return (
        <Grid className="authentication-page"
              stacked={true} >
            <Cell align="middle" size={4} className="authentication-container">
                <form action="">
                    <Card>
                        <CardTitle title={null}>
                            <img src={geocore} alt=""/>
                        </CardTitle>

                        <CardText className="authentication-page-body">
                            <h3>LOGIN</h3>

                            {
                                error
                                    ? <p className="error">{error}</p>
                                    : null

                            }

                            <TextField
                                placeholder="Username"
                                fullWidth={true}
                                className="md-cell md-cell--10 md-cell--bottom"
                                onChange={(value, e) => {
                                    setUsername(value);
                                    if (error) {
                                        setError('');
                                    }
                                    e.preventDefault();
                                }}
                                value={username}
                                required
                                leftIcon={<FontIcon>account_circle</FontIcon>}
                            />

                            <TextField
                                placeholder="Password"
                                type="password"
                                fullWidth={true}
                                className="md-cell md-cell--10 md-cell--bottom"
                                onChange={(value, e) => {
                                    setPassword(value);
                                    if (error) {
                                        setError('');
                                    }
                                    e.preventDefault();
                                }}
                                value={password}
                                required
                                passwordIcon={<FontIcon>remove_red_eye</FontIcon>}
                                leftIcon={<FontIcon>lock</FontIcon>}
                            />
                        </CardText>

                        <CardActions className="authentication-page-footer">
                            {
                                props.authentication.loginPending
                                    ? <Button className="loading-btn"
                                              icon
                                              disabled={true}
                                              onClick={null}
                                              flat><CircularProgress centered={true} indeterminate/></Button>
                                    : <Button className="md-cell md-cell--10 md-cell--bottom"
                                        onClick={doLogin}
                                        type="submit"
                                        primary
                                        raised>Login</Button>
                            }

                        </CardActions>
                    </Card>
                </form>
            </Cell>
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