package com.rncollapsingtoolbar;

import android.support.annotation.Nullable;
import android.support.design.widget.AppBarLayout;
import android.view.ViewGroup;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.HashMap;
import java.util.Map;

public class AppBarLayoutManager extends ViewGroupManager<AppBarLayoutView>
    implements AppBarLayout.OnOffsetChangedListener  {

    private final static String REACT_CLASS = "CTLAppBarLayout";

    public static final int COMMAND_SHOW = 1;
    public static final int COMMAND_HIDE = 2;
    public static final int COMMAND_REDRAW = 3;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public AppBarLayoutView createViewInstance(ThemedReactContext context) {
        AppBarLayoutView view = new AppBarLayoutView(context);
        view.addOnOffsetChangedListener(this);
        return view;
    }

    @ReactProp(name = "height")
    public void setHeight(AppBarLayoutView view, double height) {
        ViewGroup.LayoutParams params = view.getLayoutParams();
        params.height = (int) PixelUtil.toPixelFromDIP(height);
        view.setLayoutParams(params);
    }

    @Override
    public Map<String, Object> getExportedViewConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("SCROLL_FLAG_SNAP", AppBarLayout.LayoutParams.SCROLL_FLAG_SNAP);
        constants.put("SCROLL_FLAG_SCROLL", AppBarLayout.LayoutParams.SCROLL_FLAG_SCROLL);
        constants.put("SCROLL_FLAG_ENTER_ALWAYS", AppBarLayout.LayoutParams.SCROLL_FLAG_ENTER_ALWAYS);
        constants.put("SCROLL_FLAG_EXIT_UNTIL_COLLAPSED", AppBarLayout.LayoutParams.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED);
        constants.put("SCROLL_FLAG_ENTER_ALWAYS_COLLAPSED", AppBarLayout.LayoutParams.SCROLL_FLAG_ENTER_ALWAYS_COLLAPSED);
        return constants;
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
            .put("topOffsetChanged",
                MapBuilder.of(
                    "phasedRegistrationNames",
                    MapBuilder.of(
                        "bubbled", "onOffsetChanged", "captured", "onOffsetChangedCapture")))
            .build();
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    @Override
    public void onOffsetChanged(AppBarLayout appBarLayout, int verticalOffset) {
        WritableMap event = Arguments.createMap();
        event.putDouble("offset", verticalOffset);
        ReactContext reactContext = (ReactContext) appBarLayout.getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(appBarLayout.getId(), "topOffsetChanged", event);
    }

    @Override
    public @javax.annotation.Nullable
    Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "show", COMMAND_SHOW,
                "hide", COMMAND_HIDE,
                "redraw", COMMAND_REDRAW
        );
    }

    @Override
    public void receiveCommand(AppBarLayoutView root, int commandId, @javax.annotation.Nullable ReadableArray args) {
        switch (commandId) {
            case COMMAND_SHOW:
                root.setExpanded(true, true);
                break;
            case COMMAND_HIDE:
                root.setExpanded(false, true);
                break;
            case COMMAND_REDRAW:
                root.requestLayout();
                break;
        }
    }
}
