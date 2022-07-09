import graphql from 'graphql';

const {GraphQLObjectType , GraphQLSchema ,GraphQLString ,GraphQLID, GraphQLInt ,GraphQLList , GraphQLNonNull} =graphql;


const Note = new GraphQLObjectType({
    name:  'Note',
    fields: () => ({
        id: { type: GraphQLID},
        author: { type: GraphQLString},
        description: { type: GraphQLString},
        date: { type: GraphQLString}
    })
})