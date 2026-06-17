/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  class toggleChat extends ActionChain {

    async run(context) {
      const { $page } = context;

      const isOpening = !$page.variables.chatOpen;

      if (isOpening && !$page.variables.hasOpened) {
        // Build the date/time label shown in the messages area: "JUNE 17, 2026 AT 3:37 PM"
        const now = new Date();
        const datePart = now.toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        }).toUpperCase();
        const timePart = now.toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true
        });
        $page.variables.chatDateLabel = datePart + ' AT ' + timePart;

        // Push a natural, conversational greeting as the opening bot message
        const timeLabel = now.toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true
        });
        $page.variables.chatMessages = [{
          id: 'welcome',
          text: "Hey there! I'm Oracle Assistant. How can I help you today?",
          sender: 'bot',
          time: timeLabel
        }];

        $page.variables.hasOpened = true;
      }

      $page.variables.chatOpen = isOpening;

      if (isOpening) {
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
