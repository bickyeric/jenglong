import React, { Component } from 'react';
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

const queries = gql`
  query findComics($keyword: String!) {
    comics(name: $keyword){
      id
      name
    }
  }
`;

function Row(params) {
  return (
  <div>{params.comic.name}</div>
  )
}

function Results(params) {
  const { loading, error, data } = useQuery(queries, { variables: { keyword: params.search } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.comics.map((comic, i) => (
        <Row key={i} comic={comic}/>
      ))}
    </div>
  );
}

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
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        {this.state.keyword === '' ? <Header/> : ''}
        <main role="main" className="inner cover">
          {this.state.keyword === '' ? <h1 className="cover-heading">Nyari komik????</h1> : ''}
          <br/>
          <input type="text" className="form-control" onKeyPress={this.handleEnter} />
          {this.state.keyword !== '' ? <Results search={this.state.keyword}/> : ''}
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
