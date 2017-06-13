import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

class CollapsingToolbarLayout extends Component {
  static propTypes = {
    ...ViewPropTypes,
    title: PropTypes.string,
    titleEnable: PropTypes.bool,
    height: PropTypes.number,
    scrimVisibleHeightTrigger: PropTypes.number,
    scrimAnimationDuration: PropTypes.number,
    contentScrimColor: PropTypes.string,
    collapsedTitleTextColor: PropTypes.string,
    collapsedTitleGravity: PropTypes.string,
    collapsedTitleTypeface: PropTypes.string,
    statusBarScrimColor: PropTypes.string,
    expandedTitleColor: PropTypes.string,
    expandedTitleMargin: PropTypes.shape({
      start: PropTypes.number,
      top: PropTypes.number,
      end: PropTypes.number,
      bottom: PropTypes.number,
    }),
    expandedTitleMarginStart: PropTypes.number,
    expandedTitleMarginTop: PropTypes.number,
    expandedTitleMarginEnd: PropTypes.number,
    expandedTitleMarginBottom: PropTypes.number,
    expandedTitleGravity: PropTypes.string,
    expandedTitleTypeface: PropTypes.string,
    scrollFlags: PropTypes.number,
  };

  render() {
    return (
      <CTLCollapsingToolbarLayout {...this.props} />
    )
  }
}


const CTLCollapsingToolbarLayout = requireNativeComponent('CTLCollapsingToolbarLayout', CollapsingToolbarLayout)

export default CollapsingToolbarLayout
