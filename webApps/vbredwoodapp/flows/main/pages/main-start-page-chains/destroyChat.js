/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  class destroyChat extends ActionChain {

    async run(context) {
      // Remove the widget and its styles from the DOM when navigating away
      const widget = document.getElementById('oa-widget');
      const styles = document.getElementById('oa-widget-style');
      if (widget) widget.remove();
      if (styles) styles.remove();
    }
  }

  return destroyChat;
});
