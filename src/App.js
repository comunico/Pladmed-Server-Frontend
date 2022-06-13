import React, { useContext } from 'react';
import LoginScreen from './screens/login/login_screen'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomeScreen from './screens/home/home_screen'
import OperationsScreen from './screens/operations/operations_screen'
import AccountScreen from './screens/account/account_screen'
import RegisterScreen from './screens/register/register_screen'
import ForgotPassScreen from './screens/forgotpass/forgot_pass_screen'
import ResetPassScreen from './screens/resetpass/reset_pass_screen'
import AssignCreditsScreen from './screens/credits/credits_screen'
import { Context } from './controllers/context_provider'
import Navigation from './components/navigation/navigation'
import Footer from './components/footer/footer'

const AuthRoute = ({ component: Component, ...args }) => {
    const { logged } = useContext(Context);

    return (
        <Route
            {...args}
            render={ props =>
                logged() ?
                (<Component {...props} />) : (<Redirect to={{pathname: "/login"}} />)
            } 
        />
    )
}

const NoAuthRoute = ({ component: Component, ...args }) => {
    const { logged } = useContext(Context);

    return (
        <Route
            {...args}
            render={ props =>
                !logged() ?
                (<Component {...props} />) : (<Redirect to={{pathname: "/"}} />)
            } 
        />
    )
}

function App() {
    const { logged, logout } = useContext(Context);

    return (
        <React.Fragment>
            <Router>
                <Navigation logged={logged()} logout={logout}/>
                    <Switch>
                        <NoAuthRoute exact path="/login" component={LoginScreen} />
                        <NoAuthRoute exact path="/register" component={RegisterScreen} />
                        <NoAuthRoute exact path="/forgot-password" component={ForgotPassScreen} />
                        <NoAuthRoute exact path="/reset-password/:token" component={ResetPassScreen} />
                        <AuthRoute
                            exact path="/"
                            component={HomeScreen}
                        />
                        <AuthRoute
                            exact path="/operations"
                            component={OperationsScreen}
                        />
                        <AuthRoute
                            exact path="/users/me"
                            component={AccountScreen}
                        />
                        <AuthRoute
                            exact path="/assign_credits"
                            component={AssignCreditsScreen}
                        />
                        <AuthRoute
                            component={() => "404 not found"}
                        />
                    </Switch>
                <Footer logged={logged()}/>
            </Router>
        </React.Fragment>
    )
}

export default App;
