/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  // Natural, conversational bot responses — no scripted domain knowledge
  var BOT_RESPONSES = [
    "Sure, I can help with that! Could you tell me a bit more about what you're looking for?",
    "Great question! I'd love to help. Could you give me a little more context?",
    "Absolutely! Let me see what I can do. What specifically do you need help with?",
    "Of course! I'm here for you. Could you elaborate on that a bit?",
    "That's a good one! Could you share more details so I can give you the best answer?",
    "Happy to help! Just to make sure I understand correctly — could you clarify what you mean?",
    "I hear you! Let me look into that. Can you tell me a bit more about your situation?",
    "On it! Do you have any specific requirements or constraints I should know about?"
  ];

  class sendMessage extends ActionChain {

    async run(context) {
      const { $page } = context;

      var inputEl = document.getElementById('oa-input');
      if (!inputEl) { return; }

      var text = inputEl.value.trim();
      if (!text) { return; }

      var timeLabel = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', hour12: true
      });

      // Append the user message
      var msgs = $page.variables.chatMessages.slice();
      msgs.push({ id: 'u' + Date.now(), text: text, sender: 'user', time: timeLabel });
      $page.variables.chatMessages = msgs;

      // Clear input and keep focus
      inputEl.value = '';
      inputEl.focus();
      this._scroll();

      // Show typing indicator while bot "thinks"
      $page.variables.isTyping = true;

      var self = this;
      setTimeout(function() {
        $page.variables.isTyping = false;

        var reply = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        var botTime = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true
        });

        var updated = $page.variables.chatMessages.slice();
        updated.push({ id: 'b' + Date.now(), text: reply, sender: 'bot', time: botTime });
        $page.variables.chatMessages = updated;
        self._scroll();
      }, 1200);
    }

    _scroll() {
      setTimeout(function() {
        var area = document.getElementById('oa-messages-area');
        if (area) { area.scrollTop = area.scrollHeight; }
      }, 60);
    }
  }

  return sendMessage;
});
