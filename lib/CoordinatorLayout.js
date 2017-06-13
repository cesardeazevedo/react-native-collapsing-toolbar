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
      <CTLCoordinatorLayoutAndroid {...this.props} />
    )
  }
}

const CTLCoordinatorLayoutAndroid = requireNativeComponent('CTLCoordinatorLayoutAndroid', CoordinatorLayout)

export default CoordinatorLayout
