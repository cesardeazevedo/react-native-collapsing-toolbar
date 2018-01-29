import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  UIManager,
  findNodeHandle,
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

const { Constants } = UIManager.CTLAppBarLayout

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

  show = () => {
    UIManager.dispatchViewManagerCommand(
      this.getViewHandle(),
      UIManager.CTLAppBarLayout.Commands.show,
      null
    );
  };

  hide = () => {
    UIManager.dispatchViewManagerCommand(
      this.getViewHandle(),
      UIManager.CTLAppBarLayout.Commands.hide,
      null
    );
  };

  redraw = () => {
    UIManager.dispatchViewManagerCommand(
      this.getViewHandle(),
      UIManager.CTLAppBarLayout.Commands.redraw,
      null
    );
  };

  getViewHandle = () => {
    return findNodeHandle(this.appBarLayout);
  };

  render() {
    return (
      <CTLAppBarLayout
        {...this.props}
        ref={ref => this.appBarLayout = ref}
        onOffsetChanged={this.handleOffsetChanged}
      />
    )
  }
}

const CTLAppBarLayout = requireNativeComponent('CTLAppBarLayout', AppBarLayout)

export default AppBarLayout
