import React, { useContext } from 'react';
import {
    Container,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import background from "../../assets/network.jpg";
import { Context } from '../../controllers/context_provider'
import ResetPassword from '../../components/reset_password/reset_password'
import { useParams } from "react-router-dom";

function ResetPasswordScreen() {
    const { token } = useParams();
    const { resetPassword } = useContext(Context);
    
    const dispatchResetPassword = async (token, password) => {
        await resetPassword(token, password);
    }

    return (
        <Container
            fluid
            style={{backgroundImage: `url(${background}` }}
            className={styles.loginBackground}
        >
            <Col className={styles.login}>
            <ResetPassword
                    token={token}
                    resetPassword={dispatchResetPassword}
                    registerUrl={"/register"}
                    loginUrl={"/login"}
                />
            </Col>
        </Container>
    );
};

export default ResetPasswordScreen;
