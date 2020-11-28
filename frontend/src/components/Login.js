import React from 'react'
import { Link } from 'react-router-dom';

const Login = (props) => {
    const { onLogin } = props;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!email || !password) {
            console.log('error');
            return;
        }
        onLogin(password, email);
        resetForm();
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3 className="login__title">Вход</h3>
            <input
                className="login__field"
                type="text"
                name="email"
                minLength="6"
                placeholder="Email"
                value={email}
                onChange={evt => setEmail(evt.target.value)}
                required />
            <input
                className="login__field"
                type="password"
                name="password"
                minLength="6"
                placeholder="Password"
                value={password}
                onChange={evt => setPassword(evt.target.value)}
                required />
            <button className="login__button" type="submit">Войти</button>
            <Link className="login__link" to="/sign-up"> Регистрация</Link>
        </form>
    )
}

export default Login;
