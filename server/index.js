const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const loadSchemaSync =  require('@graphql-tools/load').loadSchemaSync;
const GraphQLFileLoader =  require('@graphql-tools/graphql-file-loader').GraphQLFileLoader;
// const addResolversToSchema = require('@graphql-tools/schema').addResolversToSchema;
const path = require("path");
const cors = require('cors');

const schema = loadSchemaSync(path.join(__dirname, 'test.graphql'), { loaders: [new GraphQLFileLoader()] });


// const schemaWithResolvers = addResolversToSchema({
//   schema,
// });
const users = require("./users.js");
const root = {
  users: () => users,
  user: ({id})=>{
    return users.find(user=>user.id===id);
  },
  updateUser: ({id, name})=>{
    const user1 = users.find(user=>user.id===id);
    user1.name = name;
    console.log(user1);
    return user1;
  },
  simpleUpdate: ({data})=>{
    console.log(data)
    return {id:"12", info: data};
  }

}

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  rootValue: root,
}))

app.listen(4000, () => console.log('Listening on 4000'))
