import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastName: '',
            sex: '',
            _id: '',
            users: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }


    addUser(e) {
        e.preventDefault();
        if (this.state._id) {
            fetch(`/api/users/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    lastName: this.state.lastName,
                    sex: this.state.sex
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    window.M.toast({ html: 'Tarea actualizada' });
                    this.setState({ _id: '', name: '', lastName: '', sex: '' });
                    this.fetchUsers();
                });
        } else {
            fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({ html: 'Usuario guardado' });
                    this.setState({ name: '', lastName: '', sex: '' });
                    this.fetchUsers();
                })
                .catch(err => console.error(err));
        }

    }

    deleteUser(id) {
        if (confirm('¿Seguro que quieres eliminarlo?')) {
            fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Usuario eliminado' });
                    this.fetchUsers();
                });
        }
    }

    editUser(id) {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    name: data.name,
                    lastName: data.lastName,
                    sex: data.sex,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => {
                this.setState({ users: data });
                console.log(this.state.users);
            });
    }

    render() {
        return (
            <div>
                {/* NAVIGATION COMPONENT*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">React CRUD</a>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addUser}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Nombre" required/>
                                            </div>
                                        </div><div className="row">
                                            <div className="input-field col s12">
                                                <input name="lastName" onChange={this.handleChange} value={this.state.lastName} type="text" placeholder="Apellido" required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="sex" onChange={this.handleChange} value={this.state.sex} type="text" placeholder="Sexo" required/>
                                            </div>
                                        </div>


                                        <button type="submit" className="btn light-blue darken-4">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Sexo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(user => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.sex}</td>
                                                    <td>
                                                        <button onClick={() => this.deleteUser(user._id)} className="btn light-blue darken-4">
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button onClick={() => this.editUser(user._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;