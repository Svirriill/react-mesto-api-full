import React from 'react';
import logo from "../images/Vector.svg";
import { BrowserRouter, Route, Switch, Link, useHistory, useLocation } from 'react-router-dom';
import * as auth from './auth';

function Header() {
    const [email, setEmail] = React.useState('');
    const [sign, setSign] = React.useState('');
    const [login, setLogin] = React.useState(false);
    const [loginLink, setLoginLink] = React.useState('/signin');
    const history = useHistory();
    let location = useLocation();

    const onLogin = () => {
        let jwt = localStorage.getItem('token');
        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setEmail(res.email);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    React.useEffect(() => {
        onLogin();
    }, [login]);

    React.useEffect(() => {
        if (location.pathname === '/') {
            setLogin(true);
            setLoginLink('/signin');
            setSign('Выйти');
        } else if (location.pathname === '/signin') {
            setLogin(false);
            setLoginLink('/signin');
            setSign('');
        } else {
            setLoginLink('/signup');
        }
    }, [location.pathname]);

        const onSignOut = () => {
        localStorage.removeItem('token');
        setEmail('');
        history.push('/signin');
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="лого" />
            <BrowserRouter>
                <Switch>
                    <Route>
                        <div className="header__navigation">
                            <p className="header__email">{email}</p>
                            {login ? <p onClick={onSignOut} className="header__sign-out">Выйти</p> : <Link to={loginLink} className="header__sign-out">{sign}</Link>}
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        </header>
    );
}

export default Header;