import { Posts } from './connectors';

// query and mutation
const resolveFunctions = {
  Query: {
    async posts(_, args){
        return Posts.findAll({});
      },
  },
  Mutation: {
  async createPost(_, {title, text}) {
    return Posts.create({
      title: title,
      text: text,
    });
    }
  }
}

export default resolveFunctions;
