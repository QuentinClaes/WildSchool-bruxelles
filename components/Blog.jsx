import gql from 'graphql-tag';
import React from 'react';

const GET_DOGS = gql`
query {
  users {
    id
    name
  }
}
`

const Blog = () => {
  return (
    <div>
      <p>hello</p>
    </div>
  )
}

export default Blog