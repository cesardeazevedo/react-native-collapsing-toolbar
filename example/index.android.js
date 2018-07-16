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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import {
  AppBarLayout,
  CoordinatorLayout,
  CollapsingToolbarLayout,
  CollapsingParallax,
} from 'react-native-collapsing-toolbar'

import NestedScrollView from 'react-native-nested-scroll-view'

const data = Array(20).fill().map((_, index) => ({key: index.toString()}))

const HEADER_HEIGHT = 250
const { width, height } = Dimensions.get('window')

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

  captureAppBarRef = (ref) => {
    this.appBar = ref
  }

  handleActionSelected = (action) => {
    return action === 0 ? this.appBar.show()
         : action === 1 ? this.appBar.hide()
         : null
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

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor='#512DA8' />
        <View style={styles.statusBar} />
        <CoordinatorLayout>
          <AppBarLayout
            ref={this.captureAppBarRef}
            onOffsetChanged={this.handleOffsetChanged}
            style={styles.appbar}>
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
              <Icon.ToolbarAndroid
                iconColor='white'
                onActionSelected={this.handleActionSelected}
                actions={[{ title: 'Show' }, { title: 'Hide' }]}
                navIconName={'md-menu'}
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
    height: height - HEADER_HEIGHT,
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
