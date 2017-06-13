# react-native-collapsing-toolbar

react-native wrapper for [CollapsingToolbarLayout](https://developer.android.com/reference/android/support/design/widget/CollapsingToolbarLayout.html),
easy to integrate with Animated.Event and FlatList out the box.

![collapsing-github](https://cloud.githubusercontent.com/assets/5366959/26673566/b68a1a1e-4693-11e7-9a7b-41227dde0ff3.gif)

[See the example](https://github.com/cesardeazevedo/react-native-collapsing-toolbar/blob/master/example/index.android.js)

## Getting started

`$ npm install react-native-collapsing-toolbar --save`

### Installation

Make sure to add both `react-native-collapsing-toolbar` and `react-native-nested-scroll-view`

MainActivity.java

```diff

+   import com.rnnestedscrollview.RNNestedScrollViewPackage;
+   import com.rncollapsingtoolbar.RNCollapsingToolbarPackage;

    public class MainApplication extends Application implements ReactApplication {

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
+           new RNCollapsingToolbarPackage(),
+           new RNNestedScrollViewPackage()
        );
      }
    }

```

android/app/build.gradle


```diff

    dependencies {
        compile fileTree(dir: "libs", include: ["*.jar"])
        compile "com.android.support:appcompat-v7:23.0.1"
        compile "com.facebook.react:react-native:+"  // From node_modules
+       compile project(':react-native-collapsing-toolbar')
+       compile project(':react-native-nested-scroll-view')
    }

```

android/settings.gradle

```diff

include ':app'

+   include ':react-native-nested-scroll-view'
+   project(':react-native-nested-scroll-view').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-nested-scroll-view/android')

+   include ':react-native-collapsing-toolbar'
+   project(':react-native-collapsing-toolbar').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-collapsing-toolbar/android')


```

# Usage

This package depends of [react-native-nested-scroll-view](https://github.com/cesardeazevedo/react-native-nested-scroll-view), which we already exposes for you.

```jsx

import {
  AppBarLayout,
  CoordinatorLayout,
  CollapsingToolbarLayout,
  CollapsingParallax,
  NestedScrollView,
} from 'react-native-collapsing-toolbar'


render() {
  const HEADER_HEIGHT = 300
  return (
    <CoordinatorLayout>
      <AppBarLayout style={{height: HEADER_HEIGHT, backgroundColor: '#000'}}>
        <CollapsingToolbarLayout
          title='Collapsing Toolbar'
          contentScrimColor='#673AB7'
          expandedTitleColor='#ffffff'
          expandedTitleGravity='BOTTOM'
          scrimAnimationDuration={500}
          expandedTitleMarginStart={22}
          expandedTitleMarginBottom={22}
          scrollFlags={
              AppBarLayout.SCROLL_FLAG_SCROLL
            | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED
            | AppBarLayout.SCROLL_FLAG_SNAP
          }>
          <CollapsingParallax parallaxMultiplier={0.6}>
            <View collapsable={false} style={{height: HEADER_HEIGHT, justifyContent: 'center' }}>
              <Text>Some Custom Text Inside the Parallax</Text>
            </View>
          </CollapsingParallax>
          <ToolbarAndroid actions={[{title: 'Settings'}]} />
        </CollapsingToolbarLayout>
      </AppBarLayout>
      <NestedScrollView>
      // Main Content
      </NestedScrollView>
    <CoordinatorLayout>
  )
}


```

## Usage with FlatList

To work with FlatList, you should just pass the `renderScrollComponent` props and render a NestedScrollView instead of the ScrollView.

**NOTE:** RefreshControl is **NOT** supported yet.

```jsx
renderScroll(props) {
  return (
    <NestedScrollView {...props} />
  )
}

render() {
  return (
    <CoordinatorLayout>
      <AppBarLayout>
      ....
      </AppBarLayout>
      <FlatList
        data={data}
        renderItem={this.renderItem}
        renderScrollComponent={this.renderScroll}
      />
    </CoordinatorLayout>
  )
}
```

## Usage with Animated.Events

In order to do custom animations when collapsing, you should use `onOffsetChanged` prop on the `AppBarLayout` and **not** `onScroll` from the `NestedScrollView`, the `onScroll` won't fire until the CollapsingToolbarLayout is entire collapsed.

```jsx

state = {
  scrollY: new Animated.Value(0),
};

handleOffsetChanged = (e) => {
  Animated.event(
    [{ nativeEvent: { offset: this.state.scrollY }}, { useNativeDriver: true }]
  )(e, this.state)
}

render() {
  const rotateZ = this.state.scrollY.interpolate({
    inputRange:  [0, 100],
    outputRange: ["0deg", "-50deg"],
  })
  return (
    <CoordinatorLayout>
      <AppBarLayout onOffsetChanged={this.handleOffsetChanged}>
        <CollapsingToolbarLayout>
          <Animated.Image
            source={require('./image.png')}
            style={{ transform: [{ rotateZ }] }}
          />
          <ToolbarAndroid />
        </CollapsingToolbarLayout>
      </AppBarLayout>
      <NestedScrollView>
      </NestedScrollView>
    </CoordinatorLayout>
  )
}

```

# Important Notice

You cannot change Toolbar props at runtime. 

According to [CollapsingToolbarLayout docs](https://developer.android.com/reference/android/support/design/widget/CollapsingToolbarLayout.html):

> **Do not manually add views to the Toolbar at run time**. We will add a 'dummy view' to the Toolbar which allows us to work out the available space for the title. This can interfere with any views which you add.

Whichs isn't very clear, you can get unexpected behaviors and the CollapsingToolbar slides without the Scroll content.

If you are using [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons), it will may not work as expected, it's because vector-icons will load the icon asyncronously, and eventualy call a setState with the loaded icon, which will break the component, a workaround is to load the icon manuallly, delays the component render, and render the icon directly on the react-native ToolbarAndroid and **not** on Icon.ToolbarAndroid, this will ensure that we are rendering the scene at once.

```jsx

// Use the ToolbarAndroid directly from react-native and not from Icon.ToolbarAndroid
import { ToolbarAndroid } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

class MyCollapsingToolbar extends Component {
  state = {
    icon: null
  };

  componentDidMount() {
    // Load icon from react-native-vector-icons manually
    Icon.getImageSource('md-menu', 24, '#fff').then((source) => {
      // Icon Loaded
      this.setState({ icon: source })
    })
  }

  render() {
    // Only render scene when md-menu icon is loaded
    return this.state.icon && (
      <CoordinatorLayout>
        <AppBarLayout>
          <CollapsingToolbarLayout>
            <CollapsingParallax>
            </CollapsingParallax>
            <ToolbarAndroid
              navIcon={this.state.icon}
            />
          </CollapsingToolbarLayout>
        </AppBarLayout>
        <NestedScrollView>
        // Scene
        </NestedScrollView>
      </CoordinatorLayout>
    )
  }
}

```

# API

CollapsingToolbarLayout properties

| Prop                      | Description
|---------------------------|------------
| title                     | Title of the Toolbar
| titleEnable               | If false, it will show the title of the ToolbarAndroid Component
| height                    | Height when the component is expanded, could be set on the style prop
| scrimVisibleHeightTrigger | The trigger value when the animation transition should started
| scrimAnimationDuration    | The duration of the animation transition
| contentScrimColor         | The color of the Toolbar to show when the view is collapsing
| collapsedTitleTextColor   | The color of the title when the view is collapsed.
| collapsedTitleGravity     | The alignment of the title when collpased, can be "CENTER", "CENTER_VERTICAL", "TOP", "LEFT", "RIGHT", "BOTTOM", "START" or "END"
| collapsedTitleTypeface    | Name of the font when the title is collapsed.
| statusBarScrimColor       | The color to use for the status bar scrim, Only works on Lollipop with the correct setup
| expandedTitleColor        | The color of the title when the view is expanded
| expandedTitleMargin       | Object with start, top, end, bottom margins
| expandedTitleMarginStart  | The left margin when title is expanded
| expandedTitleMarginTop    | The top margin when title is expanded
| expandedTitleMarginEnd    | The right margin when title is expanded
| expandedTitleMarginBottom | The bottom margin when title is expanded
| expandedTitleGravity      | The alignment of the title when expanded, can be "CENTER", "CENTER_VERTICAL", "TOP", "LEFT", "RIGHT", "BOTTOM", "START" or "END"
| expandedTitleTypeface     | Name of the font when the title is expanded
| scrollFlags               | Defines the scroll behavior, the values are defined statically on the AppBarLayout, can be SCROLL_FLAG_SNAP, SCROLL_FLAG_SCROLL, SCROLL_FLAG_ENTER_ALWAYS, SCROLL_FLAG_ENTER_ALWAYS, SCROLL_FLAG_EXIT_UNTIL_COLLAPSED, SCROLL_FLAG_ENTER_ALWAYS_COLLAPSED

CollapsingParallax props

| Prop               | Description
|--------------------|------------
| parallaxMultiplier | The multiplier amount of parallax, a value higher than 1, the content will move against the scroll.

# License

[MIT](./LICENSE)
