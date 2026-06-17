/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';

  class initChat extends ActionChain {

    async run(context) {
      const { $page } = context;

      // Build the date/time label shown in the chat separator
      const now = new Date();
      const datePart = now.toLocaleDateString('en-US', {
        month: 'long',
        day:   'numeric',
        year:  'numeric',
      }).toUpperCase();
      const timePart = now.toLocaleTimeString('en-US', {
        hour:   'numeric',
        minute: '2-digit',
        hour12: true,
      });

      $page.variables.chatDateLabel = `${datePart} AT ${timePart}`;
    }
  }

  return initChat;
});
