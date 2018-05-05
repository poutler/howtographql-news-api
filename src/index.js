const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    }
  },

  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink(
        {
          data: {
            url: args.url,
            description: args.description
          }
        },
        info
      );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: "https://eu1.prisma.sh/public-leafduke-410/hackernews-node/dev",
    secret: "supersecret",
    debug: true
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
