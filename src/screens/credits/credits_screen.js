import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Row,
    Col,
    Form
} from 'react-bootstrap';
import styles from './styles.module.css';
import { Context } from '../../controllers/context_provider'
import ButtonLoad from '../../components/button_load/button_load'

function CreditsScreen() {
    const { 
        getUsers
    } = useContext(Context);

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [credit, setCredit] = useState([]);

    const [requesting, setRequesting] = useState(false);

    
    useEffect(() => {
        async function init() {
            try {
                const jsonData = await getUsers();
                var x = document.getElementById("usersSelect");
                var listItems = '<option selected="selected" value="0">- Select -</option>';
 
                let option = document.createElement("option");
                option.text = "--Seleccione--";
                option.value = "";
                x.add(option);
         
                for (var i = 0; i < jsonData.length; i++) {
                        let option = document.createElement("option");
                        option.text = jsonData[i].email;
                        option.value = jsonData[i]._id;
                        x.add(option);
                }

                setUsers(listItems);

            } catch (e) {

            }
        }
        
        init();
    }, [getUsers]);

    const userSelect = (event) => {
        setUser(event.target.value);
    }

    const onCreditSet = (event) => {
        setCredit(event.target.value);
    }

    const buttonEnabled = () => {
        return !requesting;
    }

    const { assignCredits } = useContext(Context);

    const dispatchAssignCredits = async () => {
        await assignCredits(user, credit);
    }
    
    return (
        <Container
            fluid
            className={"py-4"}
        >
            <Row className={[styles.surface, "mx-auto"]}>
                <Form className={styles.form}>
                    <Form.Label className={[styles.title, "h3"]}>
                        Asignar Créditos
                    </Form.Label>
                    <Container>
                        <Form.Row>
                            <Col
                                xl={8} lg={8} md={8} sm={8} xs={12}
                            >
                            <Form.Control
                                
                                as="select"
                                className={styles.options}
                                onChange={userSelect}
                                id="usersSelect"
                                >
                            </Form.Control>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col
                                    xl={8} lg={8} md={8} sm={8} xs={12}
                                >
                                <Form.Control
                                    type="number"
                                    className={styles.controlBox}
                                    placeholder="Creditos"
                                    onChange={onCreditSet}
                                    />
                            </Col>
                            <Col
                                    xl={4} lg={4} md={4} sm={4} xs={12}
                                    className={styles.centered}
                                >
                                    <ButtonLoad
                                        variant="primary"
                                        type="button"
                                        onClick={dispatchAssignCredits}
                                        disabled={!buttonEnabled()}
                                        className={styles.centered}
                                        loading={requesting}
                                    >
                                        Asignar
                                    </ButtonLoad>
                            </Col>

                        </Form.Row>
                    </Container>
                </Form>
            </Row>

        </Container>
    );
};

export default CreditsScreen;
