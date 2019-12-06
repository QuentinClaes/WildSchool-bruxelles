import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import RecipeReviewCard from '../components/ArticleCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 100,
    paddingBottom: 1000,
    backgroundColor: "#FCFAF5",
  },
  title:{
    fontFamily: "Garamond",
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


const GET_DOGS = gql`
query ($skip: Int!){
  articles (first: 3, skip: $skip){
    id
    content
    title
    like
    thumbnail
    createdAt
    author {
      id
      name
      givenName
      email
      SuperAvatar
    }
  }
  NumberOfArticles: articles {
    id
  }
}
`

const Home = () => {
  const [spacing, setSpacing] = React.useState(2);
  const [SKIP, setSKIP ] = React.useState(0)
  const [First, setFirst ] = React.useState(3)
  const classes = useStyles();

function BackSkip() {
  if (SKIP >0) {
    setSKIP(SKIP - 1)
  }
}

function NextSKip() {
  let Max = data.NumberOfArticles.length - First
  if (SKIP < Max) {
    setSKIP(SKIP + 1)
  }
}

  const { data, error, loading } = useQuery(GET_DOGS, {
    variables: { skip: SKIP },
  });
  if (loading) {
    return null;
  };
  if (error) {
    return <div>Error! {error.message}</div>;
  };
  return (
    <React.Fragment>
      {/* <h1 className={classes.title}>Hello Wild School</h1> */}
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {data.articles.map(article => (
            <Grid item>
              <RecipeReviewCard Article={article}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
      <Grid container justify="center" spacing={spacing}>
            <ButtonGroup color="default" aria-label="outlined primary button group">
              <Button onClick={() => BackSkip()}>Back</Button>
              <Button onClick={() => NextSKip()}>Next</Button>
            </ButtonGroup>
            </Grid>
          </Grid>
    </Grid>
    </React.Fragment>
  )
}

export default Home
