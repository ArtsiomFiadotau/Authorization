import React, { Component } from 'react';
import Form from './Form'; // Импортируем компонент Form

class AuthForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            username: '',
            password: '',
            isAuth: false,
            isRegistering: false,
            message: '',
            showForm: false // Флаг для отображения формы
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            message: '' // Сброс сообщения при изменении
        });
    }

    onFormSubmit = event => {
        event.preventDefault();
        const { username, password, isRegistering } = this.state;
    
        if (isRegistering) {
            // Регистрация
            localStorage.setItem(username, password);
            this.setState({ message: 'Регистрация успешна. Вы можете войти.', username: '', password: '' });
        } else {
            // Авторизация
            const savedPassword = localStorage.getItem(username);
            if (savedPassword && savedPassword === password) {
                this.setState({ isAuth: true, showForm: true });
                this.props.setAuth(true); // Обновляем состояние авторизации в App
            } else {
                this.setState({ message: 'Неверный логин или пароль!' });
            }
        }
    }

    toggleMode = () => {
        this.setState(prevState => ({
            isRegistering: !prevState.isRegistering,
            username: '',
            password: '',
            message: ''
        }));
    }

    render() {
        const { username, password, isAuth, isRegistering, message } = this.state;

        if (isAuth) {
            return (
                <Form handleSubmit={(data) => console.log('Form submitted:', data)} />
            ); // Показать форму после успешной авторизации
        }

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor="username">Login</label>
                    <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={this.handleChange} />
                    
                    <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                    <button type="button" onClick={this.toggleMode}>
                        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                    </button>
                    
                    {message && <p>{message}</p>} {/* Отображение сообщения */}
                </form>
            </div>
        );
    }
}

export default AuthForm;