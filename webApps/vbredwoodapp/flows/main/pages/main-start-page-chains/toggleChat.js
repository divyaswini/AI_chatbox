/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  class toggleChat extends ActionChain {

    async run(context) {
      const { $page } = context;

      $page.variables.chatOpen = !$page.variables.chatOpen;

      if ($page.variables.chatOpen) {
        // Focus the input field after the chat window animates in
        setTimeout(() => {
          const input = document.getElementById('oaChatInput');
          if (input) input.focus();
          // Scroll messages to bottom
          const area = document.getElementById('oaMessagesArea');
          if (area) area.scrollTop = area.scrollHeight;
        }, 260);
      }
    }
  }

  return toggleChat;
});
