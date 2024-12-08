import React, { Component } from 'react';
import Table from './Table';
import AuthForm from './AuthForm'; // Импортируем AuthForm
import Form from './Form'; // Импортируем Form

class App extends Component {
    state = {
        characters: [],
        isAuth: false, // Флаг, указывающий, авторизован ли пользователь
    };

    removeCharacter = index => {
        const { characters } = this.state;

        this.setState({
            characters: characters.filter((character, i) => i !== index)
        });
    }

    handleSubmit = character => {
        this.setState({ characters: [...this.state.characters, character] });
    }

    // Метод для обновления состояния авторизации
    setAuth = (isAuth) => {
        this.setState({ isAuth });
    }

    render() {
        const { characters, isAuth } = this.state;

        return (
            <div className="container">
                <h1>React Tutorial</h1>
                {isAuth ? (
                    <>
                        <p>Add a character with a name and a job to the table.</p>
                        <Table
                            characterData={characters}
                            removeCharacter={this.removeCharacter}
                        />
                        <h3>Add New</h3>
                        <Form handleSubmit={this.handleSubmit} />
                    </>
                ) : (
                    // Отображаем форму аутентификации, передаем метод setAuth
                    <AuthForm setAuth={this.setAuth} />
                )}
            </div>
        );
    }
}

export default App;