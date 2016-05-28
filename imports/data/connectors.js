import Sequelize from 'sequelize';

// create new connection and db
const db = new Sequelize('blog', 'root', 'root', {
    host: 'localhost', 
    dialect: 'mariadb'
});

// post table
const PostModel = db.define('posts', {
  title: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
});

// insert initial data
db.sync({ force: true }).then(() => {
      return PostModel.create({
        title: `Hello world!`,
        text: 'some sentences',
      });
});

// posts model
const Posts = db.models.posts;

export { Posts };
