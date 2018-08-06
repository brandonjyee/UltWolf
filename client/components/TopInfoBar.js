import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { cardImageMap } from './helper';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
  },
});

const TopInfoBar = props => {
  const { classes } = props;
  return (
    <Card>
      <CardContent>
        <Paper id="top-info-bar" className={classes.root} elevation={1}>
            <div id="cards-in-play">
              Cards in Play:
              {props.allCards.map(card => {
                return (
                  <img
                    key={card.id}
                    className="all-cards"
                    src={cardImageMap[card.role]}
                  />
                );
              })}
            </div>
            <div>Action Order: Werewolf -> Seer -> Robber -> Troublemaker</div>
        </Paper>
        <Paper id="announcer-bar" className={classes.root} elevation={1}>
            <div>Announcer:</div>
            <div>msg</div>
        </Paper>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ allCards = [] }) => ({ allCards });

export default withStyles(styles)(connect(mapStateToProps)(TopInfoBar));
