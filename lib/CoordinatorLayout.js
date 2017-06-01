import React, { Component } from 'react'
import {
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

class CoordinatorLayout extends Component {
  static propTypes = {
    ...ViewPropTypes,
  };

  render() {
    return (
      <RCTCoordinatorLayout {...this.props} />
    )
  }
}

const RCTCoordinatorLayout = requireNativeComponent('RCTCoordinatorLayoutAndroid', CoordinatorLayout)

export default CoordinatorLayout
