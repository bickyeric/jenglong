import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

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

function handleClick(params) {
  var page = params[Math.floor(Math.random() * params.length)]
  console.log(page.link)
  window.open(page.link, "_blank")
}

function Results(params) {
  const { loading, error, data } = useQuery(queries, { variables: { keyword: params.search } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      {data.comics.map((comic, i) => (
        <div key={i} className="card" style={{width: "37em"}}>
          <div className="card-body">
            <h5 className="card-title">{comic.name}</h5>
            {comic.episodes.map((episode, j) => (
              <p key={j} onClick={(e) => handleClick(episode.pages)} className="btn btn-primary">Episode {episode.no}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
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
      <div className="d-flex justify-content-center" style={{height:"100vh"}}>
        <div className={this.state.keyword === '' ? "d-flex align-items-center" : "d-flex"}>
          <div className="container">
            <h1 className="text-center">Arumba</h1>
            <div class="input-group md-form form-sm form-1 pl-0" style={{height:"2.8em", width:"37em"}}>
              <input type="text" className="shadow-sm form-control" onKeyPress={this.handleEnter} style={{height:"2.8em"}}/>
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
