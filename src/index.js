import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

library.add(faCheckSquare, faCoffee, faSearch)

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.arumba.xyz/query'
  }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
