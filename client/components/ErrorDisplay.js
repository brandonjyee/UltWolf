// import React from 'react';
// import { connect } from 'react-redux';

// const ErrorDisplay = ({ err }) => {
//   return err ? <div>Error: {err}</div> : '';
// };

// const mapStateToProps = ({ err }) => ({ err });

// export default connect(mapStateToProps)(ErrorDisplay);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import amber from '@material-ui/core/colors/amber';
import { connect } from 'react-redux';
import { clearErr } from '../store/err';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  backgroundColor: amber[700],
});

class ErrorDisplay extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    console.log('in errordisplay -> componentdidmount');
    if (this.props.err) {
      this.setState({ open: true });
    }
  }

  componentDidUpdate() {
    console.log('in errordisplay -> componentdidupdate');
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
    console.log('errordisplay -> handleClose');
    this.props.clearErr();
    // if (reason === 'clickaway') {
    //   return;
    // }

    // this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const hasMsg = this.props.err;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={hasMsg}
          autoHideDuration={11000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.err}</span>}
          action={[
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

ErrorDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ err }) => ({ err });
const mapDispatchToProps = dispatch => ({
  clearErr: () => dispatch(clearErr()),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorDisplay)
);
