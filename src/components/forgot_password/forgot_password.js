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

function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const errorForgotPassword = useRef(null)
    const validForgotPassword = useRef(null)

    const forgotPassword = async () => {
        errorForgotPassword.current.hide();
        validForgotPassword.current.hide();
        setEmail("");
        setLoading(true);

        try {
            await props.forgotPassword(email);
            validForgotPassword.current.display();
            setEmail("");
            setLoading(false);
    
        } catch (e) {
            errorForgotPassword.current.display();
            setLoading(false);
        }
    }

    const onEmailSet = (event) => {
        setEmail(event.target.value);
    }

    const forgotPasswordEnabled = () => {
        return email.length > 0 && !loading;
    }

    return (
        <Form className={styles.form}>
            <Form.Label className={[styles.title, "h4"]}>
                Complete el email
            </Form.Label>
            <Form.Control
                type="email"
                className={styles.controlBox}
                placeholder="Dirección email..."
                onChange={onEmailSet}
            />
            <ErrorMessage
                ref={validForgotPassword}
                styles={styles.info}
                message="Se envió el mail a la casilla indicada"
            />
            <ErrorMessage
                ref={errorForgotPassword}
                styles={styles.error}
                message="No ha completado el mail correctamente"
            />
            <ButtonLoad
                variant="primary"
                type="button"
                block
                className={styles.button}
                onClick={forgotPassword}
                disabled={!forgotPasswordEnabled()}
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

ForgotPassword.propTypes = {
    loginUrl: PropTypes.string.isRequired,
    registerUrl: PropTypes.string.isRequired 
}

export default ForgotPassword;
