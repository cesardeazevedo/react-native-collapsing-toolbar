package com.rncollapsingtoolbar;

import android.graphics.Color;
import android.graphics.Typeface;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.v7.widget.Toolbar;
import android.view.Gravity;
import android.view.View;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.text.ReactFontManager;

public class CollapsingToolbarLayoutManager extends ViewGroupManager<CollapsingToolbarLayoutView> {

    private final static String REACT_CLASS = "RCTCollapsingToolbarLayout";

    private int height = 56;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public CollapsingToolbarLayoutView createViewInstance(ThemedReactContext context) {
        return new CollapsingToolbarLayoutView(context);
    }

    @ReactProp(name = "title")
    public void setTitle(CollapsingToolbarLayoutView view, String title) {
        view.setTitle(title);
    }

    @ReactProp(name = "titleEnable")
    public void setTitleEnable(CollapsingToolbarLayoutView view, boolean enable) {
        view.setTitleEnabled(enable);
    }

    @ReactProp(name = "height", defaultInt = 56)
    public void setToolbarHeight(CollapsingToolbarLayoutView view, int height) {
        height = height;
    }

    @ReactProp(name = "contentScrimColor")
    public void setContentScrimColor(CollapsingToolbarLayoutView view, String color) {
        view.setContentScrimColor(Color.parseColor(color));
    }

    @ReactProp(name = "statusBarScrimColor")
    public void setStatusBarScrimColor(CollapsingToolbarLayoutView view, String color) {
        view.setStatusBarScrimColor(Color.parseColor(color));
    }

    @ReactProp(name = "scrimVisibleHeightTrigger")
    public void setScrimVisibleHeightTrigger(CollapsingToolbarLayoutView view, int height) {
        view.setScrimVisibleHeightTrigger((int) PixelUtil.toPixelFromDIP(height));
    }

    @ReactProp(name = "scrimAnimationDuration")
    public void setScrimAnimationDuration(CollapsingToolbarLayoutView view, int duration) {
        view.setScrimAnimationDuration(duration);
    }

    @ReactProp(name = "collapsedTitleTextColor")
    public void setCollapsedTitleTextColor(CollapsingToolbarLayoutView view, String color) {
        view.setCollapsedTitleTextColor(Color.parseColor(color));
    }

    @ReactProp(name = "collapsedTitleGravity")
    public void setCollapsedTitleGravity(CollapsingToolbarLayoutView view, String gravity) {
        view.setCollapsedTitleGravity(getGravity(gravity));
    }

    @ReactProp(name = "collapsedTitleTypeface")
    public void setCollapsedTitleTypeface(CollapsingToolbarLayoutView view, String font) {
        try {
            Typeface face = ReactFontManager.getInstance().getTypeface(font, Typeface.NORMAL, view.getContext().getAssets());
            view.setCollapsedTitleTypeface(face);
        } catch (Exception e) {
        }
    }

    @ReactProp(name = "expandedTitleColor")
    public void setExpandedTitleColor(CollapsingToolbarLayoutView view, String color) {
        view.setExpandedTitleColor(Color.parseColor(color));
    }

    @ReactProp(name = "expandedTitleGravity")
    public void setExpandedTitleGravity(CollapsingToolbarLayoutView view, String gravity) {
        view.setExpandedTitleGravity(getGravity(gravity));
    }

    @ReactProp(name = "expandedTitleTypeface")
    public void setExpandedTitleTypeface(CollapsingToolbarLayoutView view, String font) {
        try {
            Typeface face = ReactFontManager.getInstance().getTypeface(font, Typeface.NORMAL, view.getContext().getAssets());
            view.setExpandedTitleTypeface(face);
        } catch (Exception e) {
        }
    }

    @ReactProp(name = "expandedTitleMargin")
    public void setExpandedTitleMargin(CollapsingToolbarLayoutView view, ReadableMap margin) {
        int start = margin.getInt("start");
        int top = margin.getInt("top");
        int end = margin.getInt("end");
        int bottom = margin.getInt("bottom");
        view.setExpandedTitleMargin(
            (int) PixelUtil.toPixelFromDIP(start),
            (int) PixelUtil.toPixelFromDIP(top),
            (int) PixelUtil.toPixelFromDIP(end),
            (int) PixelUtil.toPixelFromDIP(bottom)
        );
    }

    @ReactProp(name = "expandedTitleMarginStart")
    public void setExpandedTitleMarginStart(CollapsingToolbarLayoutView view, int margin) {
        view.setExpandedTitleMarginStart((int) PixelUtil.toPixelFromDIP(margin));
    }

    @ReactProp(name = "expandedTitleMarginTop")
    public void setExpandedTitleMarginTop(CollapsingToolbarLayoutView view, int margin) {
        view.setExpandedTitleMarginTop((int) PixelUtil.toPixelFromDIP(margin));
    }

    @ReactProp(name = "expandedTitleMarginEnd")
    public void setExpandedTitleMarginEnd(CollapsingToolbarLayoutView view, int margin) {
        view.setExpandedTitleMarginEnd((int) PixelUtil.toPixelFromDIP(margin));
    }

    @ReactProp(name = "expandedTitleMarginBottom")
    public void setExpandedTitleMarginBottom(CollapsingToolbarLayoutView view, int margin) {
        view.setExpandedTitleMarginBottom((int) PixelUtil.toPixelFromDIP(margin));
    }

    @ReactProp(name = "scrollFlags")
    public void setExpandedTitleGravity(CollapsingToolbarLayoutView view, int flags) {
        AppBarLayout.LayoutParams params = new AppBarLayout.LayoutParams(
            AppBarLayout.LayoutParams.MATCH_PARENT,
            AppBarLayout.LayoutParams.MATCH_PARENT
        );

        params.setScrollFlags(flags);
        view.setLayoutParams(params);
    }

    private int getGravity(String gravity) {
        switch (gravity) {
            case "CENTER":
                return Gravity.CENTER;
            case "CENTER_VERTICAL":
                return Gravity.CENTER_VERTICAL;
            case "TOP":
                return Gravity.TOP;
            case "LEFT":
                return Gravity.LEFT;
            case "RIGHT":
                return Gravity.RIGHT;
            case "BOTTOM":
                return Gravity.BOTTOM;
            case "START":
                return Gravity.START;
            case "END":
                return Gravity.END;
            default:
                return Gravity.CENTER_VERTICAL;
        }
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    @Override
    public void addView(CollapsingToolbarLayoutView parent, View child, int index) {
        super.addView(parent, child, index);
        if (child instanceof Toolbar) {
            Toolbar toolbar = (Toolbar) child;
            int toolbarHeight = (int) PixelUtil.toPixelFromDIP(height);
            CollapsingToolbarLayout.LayoutParams params = new CollapsingToolbarLayout.LayoutParams(
                CollapsingToolbarLayout.LayoutParams.MATCH_PARENT,
                toolbarHeight
            );
            params.setCollapseMode(CollapsingToolbarLayout.LayoutParams.COLLAPSE_MODE_PIN);
            toolbar.setLayoutParams(params);
            toolbar.requestLayout();
        }
    }
}