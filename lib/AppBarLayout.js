import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  UIManager,
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

const { Constants } = UIManager.RCTAppBarLayout

class AppBarLayout extends Component {
  static propTypes = {
    ...ViewPropTypes,
    height: PropTypes.number,
    onOffsetChanged: PropTypes.func,
  };

  static SCROLL_FLAG_SNAP = Constants.SCROLL_FLAG_SNAP;
  static SCROLL_FLAG_SCROLL = Constants.SCROLL_FLAG_SCROLL;
  static SCROLL_FLAG_ENTER_ALWAYS = Constants.SCROLL_FLAG_ENTER_ALWAYS;
  static SCROLL_FLAG_EXIT_UNTIL_COLLAPSED = Constants.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED;
  static SCROLL_FLAG_ENTER_ALWAYS_COLLAPSED = Constants.SCROLL_FLAG_ENTER_ALWAYS_COLLAPSED;

  handleOffsetChanged = (e) => {
    const { onOffsetChanged } = this.props
    onOffsetChanged && onOffsetChanged(e)
  }

  render() {
    return (
      <RCTAppBarLayout
        {...this.props}
        onOffsetChanged={this.handleOffsetChanged}
      />
    )
  }
}

const RCTAppBarLayout = requireNativeComponent('RCTAppBarLayout', AppBarLayout)

export default AppBarLayout
