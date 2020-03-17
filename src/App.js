import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import Comic from './components/Comic';

const queries = gql`
  query findComics($keyword: String!) {
    comics(name: $keyword){
      id
      name
      episodes(first:4){
        no
        pages{
          link
        }
      }
    }
  }
`;

function Results(params) {
  const { loading, error, data } = useQuery(queries, { variables: { keyword: params.search } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.comics.map((comic, i) => (
        <Comic comic={comic} key={i}/>
      ))}
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
  }

  searchComic = e => {
    if (e.key === 'Enter') {
      this.setState({
        keyword: e.target.value
      })
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center" style={{height:"100vh"}}>
        <div className={this.state.keyword === '' ? "d-flex align-items-center" : "d-flex"}>
          <div className="container">
            <h1 className="text-center">Arumba</h1>
            <div class="input-group md-form form-sm form-1 pl-0" style={{height:"2.8em", width:"37em"}}>
              <input type="text" className="shadow-sm form-control" onKeyPress={this.searchComic} style={{height:"2.8em"}}/>
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-text1"><FontAwesomeIcon icon="search" /></span>
              </div>
            </div>
            {this.state.keyword !== '' ? <Results search={this.state.keyword}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
