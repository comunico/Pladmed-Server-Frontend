import React, { useState, useRef } from 'react';
import {
    Form,
    Col,
} from 'react-bootstrap';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ErrorMessage from '../error_message/error_message'
import ButtonLoad from '../button_load/button_load'

    const initialPasswordState = "";

function ResetPassword(props) {
    const [password, setPassword] = useState(initialPasswordState);
    const [repassword, setRepassword] = useState(initialPasswordState);
    const [loading, setLoading] = useState(false);

    const errorResetPassword = useRef(null)
    const validResetPassword = useRef(null)

    const resetPassword = async () => {
        errorResetPassword.current.hide();
        validResetPassword.current.hide();
        setLoading(true);

        try {
            await props.resetPassword(props.token, password);
            validResetPassword.current.display();
            setPassword(initialPasswordState);
            setRepassword(initialPasswordState);
            setLoading(false);
    
        } catch (e) {
            errorResetPassword.current.display();
            setLoading(false);
        }
    }

    const onPasswordSet = (event) => {
        setPassword(event.target.value);
    }
    const onRepasswordSet = (event) => {
        setRepassword(event.target.value);
    }

    const resetPasswordEnabled = () => {
        return (password.length > 0 && password === repassword) && (!loading);
    }

    return (
        <Form className={styles.form}>
            <Form.Label className={[styles.title, "h4"]}>
                Reset de Password
            </Form.Label>
            <Form.Control
                type="password"
                className={styles.controlBox}
                placeholder="Contraseña..."
                onChange={onPasswordSet}
            />
            <Form.Control
                type="password"
                className={styles.controlBox}
                placeholder="Repita la Contraseña..."
                onChange={onRepasswordSet}
            />
            <ErrorMessage
                ref={validResetPassword}
                styles={styles.info}
                message="Se realizó correctamente el cambio de password"
            />
            <ErrorMessage
                ref={errorResetPassword}
                styles={styles.error}
                message="No se realizó correctamente el cambio de password"
            />
            <ButtonLoad
                variant="primary"
                type="button"
                block
                className={styles.button}
                onClick={resetPassword}
                disabled={!resetPasswordEnabled()}
                loading={loading}
            >
                Enviar email
            </ButtonLoad>
            <Form.Row className={styles.formExtra}>
                <Col className={styles.login}>
                    <Link to={props.loginUrl}>Regresar a Login</Link>
                </Col>
                <Col className={styles.register}>
                    <Link to={props.registerUrl}>Registrate aquí</Link>
                </Col>
            </Form.Row>
        </Form>
    );
};

ResetPassword.propTypes = {
    token: PropTypes.string.isRequired,
    loginUrl: PropTypes.string.isRequired,
    registerUrl: PropTypes.string.isRequired 
}

export default ResetPassword;
