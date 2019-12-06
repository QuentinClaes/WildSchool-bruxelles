import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import gql from 'graphql-tag';
import React from 'react';
import { useMutation } from 'react-apollo-hooks';

const UpdateLikeFromArticle = gql`
  mutation ($id: ID!, $like: Int!){
    updateArticle(where: {
      id: $id
    }, data: {
      like: $like
    }) {
      id
      like
    }
  }
`
const UpdateLike = ({ Like, ID }) => {
  const [toggleMutation] = useMutation(UpdateLikeFromArticle);
  function clickOnButton() {
    toggleMutation({ variables: { id: ID, like: Like + 1 } });
  }
  return (
    <div onClick={() => clickOnButton()}>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
        {Like}
      </IconButton>
    </div>
  )
}
export default UpdateLike
