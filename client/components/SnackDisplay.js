import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { clearMsgs } from '../store/msgDisplay';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SnackDisplay extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    console.log('in snackdisplay -> componentdidmount');
    const msgs = this.props.msgDisplay;
    if (msgs.length > 0) {
      this.setState({ open: true });
    }
  }

  componentDidUpdate() {
    console.log('in snackdisplay -> componentdidupdate');
    // const msgs = this.props.msgDisplay;
    // if (msgs.length > 0) {
    //   this.setState({ open: true });
    // }
  }

  // handleClick = () => {
  //   this.setState({ open: true });
  // };

  handleClose = (event, reason) => {
    // Update redux store to clear msgs
    console.log('snackdisplay -> handleClose');
    this.props.clearMsgs();
    // if (reason === 'clickaway') {
    //   return;
    // }

    // this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const hasMsg = this.props.msgDisplay.length > 0;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={hasMsg}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.msgDisplay[0]}</span>}
          action={[
            // <Button
            //   key="undo"
            //   color="secondary"
            //   size="small"
            //   onClick={this.handleClose}
            // >
            //   UNDO
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SnackDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ msgDisplay }) => ({ msgDisplay });
const mapDispatchToProps = dispatch => ({
  clearMsgs: () => dispatch(clearMsgs()),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SnackDisplay)
);
