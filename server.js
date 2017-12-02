import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

let graphQLServer;
let appServer;

function startAppServer() {
const compiler = webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(APP_PORT, '127.0.0.1', () => {
  console.log(`App is running on http://localhost:${APP_PORT}`);
});

}

function startServers(callback) {
  // Shut down the servers
  if (appServer) {
    appServer.listeningApp.close();
  }
    startAppServer();
}

startServers();
