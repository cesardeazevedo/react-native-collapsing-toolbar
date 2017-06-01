package com.rncollapsingtoolbar;

import android.support.design.widget.CollapsingToolbarLayout;
import android.widget.FrameLayout;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class CollapsingParallaxManager extends ViewGroupManager<FrameLayout> {

    private final static String REACT_CLASS = "RCTCollapsingParallax";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public FrameLayout createViewInstance(ThemedReactContext context) {
        FrameLayout view = new FrameLayout(context);
        CollapsingToolbarLayout.LayoutParams params = new CollapsingToolbarLayout.LayoutParams(
            CollapsingToolbarLayout.LayoutParams.MATCH_PARENT,
            CollapsingToolbarLayout.LayoutParams.WRAP_CONTENT
        );
        params.setCollapseMode(CollapsingToolbarLayout.LayoutParams.COLLAPSE_MODE_PARALLAX);
        view.setLayoutParams(params);
        return view;
    }

    @ReactProp(name = "parallaxMultiplier")
    public void setParallaxMultiplier(FrameLayout view, float multiplier) {
        CollapsingToolbarLayout.LayoutParams params = (CollapsingToolbarLayout.LayoutParams) view.getLayoutParams();
        params.setParallaxMultiplier(multiplier);
        view.setLayoutParams(params);
    }
}