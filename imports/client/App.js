import { connect } from 'react-apollo';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

// mutation - createPost
function generateMutationObject() {
  return {
    mutation: gql`
      mutation addPost($title: String, $text: String) {
        createPost(title: $title, text: $text) {
          title,
          text
        }
   }`,
    variables: {
      title:  faker.lorem.sentence(), // pass mocks data
      text: faker.lorem.paragraphs() // pass mocks data
    }
  };
};

// onClick - mutation - refetch
function dispatchPostMutation(mutation, refetch) {
  return mutation().then(() => {
    if (refetch) {
      return refetch();
    }
  });
}

// app component
function App ({ data, mutations }) {

  // posts
  const posts = data && data.posts;

  // mutations
  const createPost = mutations.createPost;

  // refetch query
  const refetch = data && data.refetch;

  return (
      <div className="row">
        <div className="small-12 medium-12 large-12 columns">
          <h1>MY BLOG</h1>
          <button onClick={function() {return dispatchPostMutation(createPost, refetch); }} className="small button">
            Add New Post (MOCK DATA)
          </button>
          <hr></hr>
            {_.map(posts, (post, index) => {
              return (
                <div key={index}>
                  <h3>{post.title}</h3>
                  <p>{post.text}</p>
                  <hr></hr>
                </div>
              );
            })}
          </div>
      </div>
    );
  };

// query posts
function mapQueriesToProps() {
    return {
      data: {
        query: gql`
            {
              posts {
                  title
                  text
              },
            }
          `,
          forceFetch: true
      }
    };
  };

// mutation - createPost
function mapMutationsToProps() {
  return {
    createPost: generateMutationObject
  };
};

// connect
const AppData = connect({mapQueriesToProps, mapMutationsToProps})(App);

export default AppData;
