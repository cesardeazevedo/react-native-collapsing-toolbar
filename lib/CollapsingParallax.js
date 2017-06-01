import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

class CollapsingParallax extends Component {
  static propTypes = {
    ...ViewPropTypes,
    parallaxMultiplier: PropTypes.number,
  };

  render() {
    return (
      <RCTCollapsingParallax {...this.props} />
    )
  }
}

const RCTCollapsingParallax = requireNativeComponent('RCTCollapsingParallax', RCTCollapsingParallax)

export default CollapsingParallax
