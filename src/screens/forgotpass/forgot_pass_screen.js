import React, { useContext } from 'react';
import {
    Container,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import background from "../../assets/network.jpg";
import { Context } from '../../controllers/context_provider'
import ForgotPassword from '../../components/forgot_password/forgot_password'

function ForgotPassScreen() {
    const { forgotPassword } = useContext(Context);

    const dispatchForgotPassword = async (email) => {
        await forgotPassword(email);
        
    }
    
    return (
        <Container
            fluid
            style={{backgroundImage: `url(${background}` }}
            className={styles.loginBackground}
        >
            <Col className={styles.login}>
            <ForgotPassword
                    forgotPassword={dispatchForgotPassword}
                    registerUrl={"/register"}
                    loginUrl={"/login"}
                />
            </Col>
        </Container>
    );
};

export default ForgotPassScreen;
