import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  handleEnter = e => {
    if (e.key === 'Enter') {
      this.setState({
        keyword: e.target.value
      })
    }
  };

  render() {
    return (
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        {this.state.keyword === '' ? <Header/> : ''}
        <main role="main" class="inner cover">
          {this.state.keyword === '' ? <h1 class="cover-heading">Nyari komik????</h1> : ''}
          <br/>
          <input type="text" className="form-control" onKeyPress={this.handleEnter} />
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
