package com.rncollapsingtoolbar;

import android.content.Context;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CollapsingToolbarLayout;

public class CollapsingToolbarLayoutView extends CollapsingToolbarLayout {

    public CollapsingToolbarLayoutView(Context context) {
        super(context);

        int width  = AppBarLayout.LayoutParams.MATCH_PARENT;
        int height = AppBarLayout.LayoutParams.MATCH_PARENT;

        AppBarLayout.LayoutParams params = new AppBarLayout.LayoutParams(width, height);

        this.setScrimsShown(false, true);
        this.setLayoutParams(params);
        this.setFitsSystemWindows(true);
    }
}