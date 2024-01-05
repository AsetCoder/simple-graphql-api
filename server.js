import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import 'colors'
import bodyParser from 'body-parser'
import { typeDefs } from './graphql/schema/typeDefs.js'
import { resolvers } from './graphql/resolvers/main.js'


const app = express()
const httpServer = http.createServer(app)
const port = 8080

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
)

await new Promise((resolve) => httpServer.listen(port, resolve))
console.log(`Server ready at port ${port}`.italic.bgGreen)