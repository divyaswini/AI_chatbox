/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  var BOT_RESPONSES = [
    "Hi, I'm Oracle Assistant. What do you want to know about Oracle Integration?",
    "I can help you with Oracle Integration Cloud and OIC connections. What would you like to know?",
    "Oracle Integration supports REST, SOAP, and 400+ SaaS adapters. Could you be more specific?",
    "For Oracle Integration, start with the Connections section. Which application are you integrating?",
    "I understand. Could you provide more details about your integration requirement?",
    "Oracle Integration Cloud provides pre-built recipes for common integrations. Would that help?"
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

      // Add user message
      var msgs = $page.variables.chatMessages.slice();
      msgs.push({ id: 'u' + Date.now(), text: text, sender: 'user', time: timeLabel });
      $page.variables.chatMessages = msgs;

      // Clear input and scroll
      inputEl.value = '';
      inputEl.focus();
      this._scroll();

      // Bot reply after short delay
      var self = this;
      setTimeout(function() {
        var reply = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        var botTime = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true
        });
        var updated = $page.variables.chatMessages.slice();
        updated.push({ id: 'b' + Date.now(), text: reply, sender: 'bot', time: botTime });
        $page.variables.chatMessages = updated;
        self._scroll();
      }, 700);
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
