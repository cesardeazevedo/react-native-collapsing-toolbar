package com.rncollapsingtoolbarlayout;

import android.content.Context;
import android.support.design.widget.AppBarLayout;
import android.view.ViewGroup;

public class AppBarLayoutView extends AppBarLayout {
    public AppBarLayoutView(Context context) {
        super(context);

        int width  = ViewGroup.LayoutParams.MATCH_PARENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;

        AppBarLayout.LayoutParams params = new AppBarLayout.LayoutParams(width, height);

        this.setLayoutParams(params);
    }
}