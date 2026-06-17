/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  class toggleMute extends ActionChain {

    async run(context) {
      const { $page } = context;

      $page.variables.isMuted = !$page.variables.isMuted;
    }
  }

  return toggleMute;
});
