import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  AppRegistry,
  ToolbarAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import {
  AppBarLayout,
  CoordinatorLayout,
  CollapsingToolbarLayout,
  CollapsingParallax,
  NestedScrollView,
} from 'react-native-collapsing-toolbar'

const data = Array(20).fill().map((_, index) => ({key: index}))

const HEADER_HEIGHT = 250
const { width } = Dimensions.get('window')

export default class RNCollapsingToolbar extends Component {
  state = {
    icon: null,
    scrollY: new Animated.Value(0),
  };

  componentDidMount() {
    // Load icon from react-native-vector-icons manually
    Icon.getImageSource('md-menu', 24, '#ffffff').then((source) => {
      this.setState({ icon: source })
    })
  }

  handleOffsetChanged = (e) => {
    Animated.event(
      [{ nativeEvent: { offset: this.state.scrollY }}]
    )(e, this.state)
  }

  renderBox(item) {
    return (
      <View style={styles.box} />
    )
  }

  renderScroll(props) {
    return (
      <NestedScrollView {...props} style={styles.nestedScroll} />
    )
  }

  render() {
    const { scrollY, icon } = this.state
    const rotateZ = scrollY.interpolate({
      inputRange:  [0, 100],
      outputRange: ["0deg", "-50deg"],
    })

    // Only render scene when md-menu icon is ready
    return icon && (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor='#512DA8' />
        <View style={styles.statusBar} />
        <CoordinatorLayout>
          <AppBarLayout onOffsetChanged={this.handleOffsetChanged} style={styles.appbar}>
            <CollapsingToolbarLayout
              title='Collapsing Toolbar'
              contentScrimColor='#673AB7'
              expandedTitleColor='white'
              collapsedTitleTextColor='white'
              expandedTitleGravity='BOTTOM'
              scrimVisibleHeightTrigger={100}
              scrimAnimationDuration={400}
              expandedTitleMarginStart={22}
              expandedTitleMarginBottom={22}
              scrollFlags={
                  AppBarLayout.SCROLL_FLAG_SCROLL
                | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED}>
              <CollapsingParallax parallaxMultiplier={0.6}>
                <View collapsable={false} style={styles.parallaxView}>
                  <Image source={require('./images/beer.jpg')} style={styles.image} />
                  <Animated.Image source={require('./images/react.png')} style={[styles.reactImage, {
                    transform: [{ rotateZ }]
                  }]}
                  />
                </View>
              </CollapsingParallax>
              <ToolbarAndroid
                actions={[{title: 'Settings'}]}
              />
            </CollapsingToolbarLayout>
          </AppBarLayout>
          <FlatList
            data={data}
            renderItem={this.renderBox}
            renderScrollComponent={this.renderScroll}
          />
        </CoordinatorLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 550
  },
  appbar: {
    height: HEADER_HEIGHT,
    backgroundColor: 'black',
  },
  nestedScroll: {
    backgroundColor: '#f5f5f5',
  },
  toolbar: {
    height: 56,
  },
  parallaxView: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 2,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width,
    height: HEADER_HEIGHT,
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.65,
  },
  reactImage: {
    width: 80,
    height: 80,
    opacity: 0.8,
  },
  statusBar: {
    height: 24,
  },
});

AppRegistry.registerComponent('RNCollapsingToolbarExample', () => RNCollapsingToolbar);
