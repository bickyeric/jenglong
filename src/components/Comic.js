import React, { Component } from "react";

function handleClick(params) {
  var page = params[Math.floor(Math.random() * params.length)]
  console.log(page.link)
  window.open(page.link, "_blank")
}

class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: props.comic
    }
  }

  render() {
    return (
      <div className="card" style={{width: "37em"}}>
        <div className="card-body">
          <h5 className="card-title">{this.state.comic.name}</h5>
          {this.state.comic.episodes.map((episode, j) => (
            <p key={j} onClick={(e) => handleClick(episode.pages)} className="btn btn-primary" style={{margin:5}}>Chapter {episode.no}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Comic;
