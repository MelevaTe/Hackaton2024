import React, { useContext, useState } from 'react';
import cl from './LogInSignIn.module.css';
import companyLogo from '../../static/imgs/oggetto-logo_tonal-hor-eng_tonal-hor-eng.png';
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import OgButton from "../UI/ogButton/OgButton";
import OgInput from "../UI/ogInput/OgInput";
import { changeHandler } from '../../utils/changeHandler';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState({ username: false, password: false });

    const { store } = useContext(Context);

    const isFormInvalid = hasError.username || hasError.password;

    return (
        <div className={cl.login__container}>
            <img className={cl.form__image} src={companyLogo} alt='logo' />
            <form
                className={cl.my_form}
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!isFormInvalid) {
                        store.login(username, password);
                    }
                }}
            >
                <p className={cl.errorName}>{store?.isNotValidate}</p>
                <OgInput
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(event) => changeHandler(event, setUsername, setHasError, "username")}
                    placeholder="Логин"
                    style={{borderColor: hasError.username ? "red" : null}}
                />
                <OgInput
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => changeHandler(event, setPassword, setHasError, "password")}
                    placeholder="Пароль"
                    style={{borderColor: hasError.password ? "red" : null}}
                />
                <div className={cl.form__btns__container}>
                    <OgButton disabled={isFormInvalid}>
                        Войти
                    </OgButton>
                </div>
            </form>
            <hr className={cl.SignInLogIn__hr} />
            <div>
                <p>Нет аккаунта? <Link
                    className={cl.links}
                    to="/register">Создать аккаунт</Link></p>
            </div>
        </div>
    );
};

export default observer(Login);