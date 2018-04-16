import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      logged_in: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  loginOrRegister(is_login, e) {
    e.preventDefault();

    let route = is_login ? '/login' : '/register';

    axios.post(route, {
      email: this.state.email,
      password: this.state.password
    }).then(({ data }) => {
      this.setState({name: data.user.email, logged_in: true});
    });
  }

  componentDidMount = () => {
    this.isAuthenticated();
  }  

  isAuthenticated() {
    axios.get('/isauth')
      .then(({data}) => {
        if ( data.user )
          this.setState({name: data.user.email, logged_in: true});
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Header name={this.state.name} />

        <div className="container">
          {this.state.logged_in ? (
            <h1>Logged in!</h1>
          ) : (
            <div>
              <h2>Register</h2>
              <form className="column">
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={(e) => this.loginOrRegister(false, e)}>Submit</button>
              </form>

              <h2>Login</h2>
              <form className="column">
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={(e) => this.loginOrRegister(true, e)}>Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
