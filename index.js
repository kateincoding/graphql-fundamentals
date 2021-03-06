
// import pkg from 'apollo-server';
// const { ApolloServer, gpl } = pkg;
import { ApolloServer, gql } from 'apollo-server';
// import { gql } from '@apollo/client';
// const { gql, ApolloServer } = require('@apollo/client')
const persons = [
    {
        name: "Kate",
        phone: "473948930",
        street: "hola avenue",
        city: "Lima",
        id: "hdifosfjosf-dfdsf-dfsd"
    },
    {
        name: "Luis",
        phone: "473948930",
        street: "Rainbown avenue",
        city: "Lima",
        id: "hdifosfjosf-dfdsf-dfsd"
    },
    {
        name: "Cale",
        street: "cartier 8",
        city: "Paris",
        id: "hdifosfjosf-dfdsf-dfsd"
    }
]

const typeDefinitions = gql`
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        address: String!
        check: String
        id: ID!
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    // add new campos 
    Person: {
        address: (root) => `${root.street}, ${root.city}`,
        check: () => "midu",
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
