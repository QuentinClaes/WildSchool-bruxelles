import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import UpdateLike from './UpdateLike';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginTop: '10px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({ Article }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          Article.author.SuperAvatar && <Avatar alt="Remy Sharp" src={Article.author.SuperAvatar} /> ||
          <Avatar aria-label="recipe" className={classes.avatar}>
            {Article.author.name[0]}
          </Avatar>
        }
        title={Article.author.name + " " + Article.author.givenName}
      />
      <CardMedia
        className={classes.media}
        image={Article.thumbnail}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {Article.title}
        </Typography>
        
        <Typography variant="body1" color="textPrimary" component="p">
          {Article.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <UpdateLike ID={Article.id} Like={Article.like}/>
      </CardActions>
    </Card>
  );
}