import React, { Component } from "react";

function handleClick(params) {
  var page = params[Math.floor(Math.random() * params.length)]
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
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h6 className="border-bottom border-gray pb-2 mb-0">{this.state.comic.name}</h6>
        <div className="mb-0 pt-2">
          {this.state.comic.episodes.map((episode, j) => (
            <p key={j} onClick={(e) => handleClick(episode.pages)} className="btn btn-primary" style={{margin:5}}>Chapter {episode.no}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Comic;
