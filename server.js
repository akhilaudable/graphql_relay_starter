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

  // setup webpack-dev-server
const compiler = webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  },
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
});

 appServer = new WebpackDevServer(compiler, devServerOptions);
appServer.use('/', express.static(path.resolve(__dirname, 'public')));

appServer.listen(APP_PORT, '127.0.0.1', () => {
  console.log(`App is running on http://localhost:${APP_PORT}`);
});

}

function startServers(callback) {
  // Shut down the appServers
  if (appServer) {
    appServer.listeningApp.close();
  }
    startAppServer();
}

startServers();
