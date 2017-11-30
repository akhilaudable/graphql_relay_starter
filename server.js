import config from './webpack.config';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

let graphQLServer;
let appServer;

function startAppServer(callback) {
  // Serve the Relay app

  const compiler = webpack(config);
  appServer = new WebpackDevServer(compiler, {
   contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    publicPath: '/js/',
    stats: {colors: true}  //
  });

  // Serve static resources
  appServer.use('/', express.static(path.resolve(__dirname, 'public')));
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
    if (callback) {
      callback();
    }
  });
}

// function startGraphQLServer(callback) {
//   // Expose a GraphQL endpoint
//   clean('./data/schema');
//   const {Schema} = require('./data/schema');
//   const graphQLApp = express();
//   graphQLApp.use('/', graphQLHTTP({
//     graphiql: true,
//     pretty: true,
//     schema: Schema,
//   }));
//   graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
//     console.log(
//       `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
//     );
//     if (callback) {
//       callback();
//     }
//   });
// }


function startServers(callback) {
  // Shut down the servers
  if (appServer) {
  appServer.listeningApp.close();
  }
  if (graphQLServer) {
  graphQLServer.close();
}

//  startGraphQLServer(handleTaskDone);
let doneTasks = 0;
function handleTaskDone() {
  doneTasks++;
  if (doneTasks === 2 && callback) {
    callback();
  }
}
  startAppServer(handleTaskDone);
}



startServers();
