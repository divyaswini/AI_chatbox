/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (ActionChain, Actions) => {
  'use strict';

  class toggleChat extends ActionChain {

    async run(context) {
      const { $page } = context;

      const isOpening = !$page.variables.chatOpen;

      // Set date label the first time the chat opens
      if (isOpening && $page.variables.chatDateLabel === 'TODAY') {
        const now = new Date();
        const datePart = now.toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        }).toUpperCase();
        const timePart = now.toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true
        });
        $page.variables.chatDateLabel = datePart + ' AT ' + timePart;
      }

      $page.variables.chatOpen = isOpening;

      if (isOpening) {
        // Focus input after animation completes
        setTimeout(function() {
          var input = document.getElementById('oa-input');
          if (input) { input.focus(); }
          var area = document.getElementById('oa-messages-area');
          if (area) { area.scrollTop = area.scrollHeight; }
        }, 260);
      }
    }
  }

  return toggleChat;
});
