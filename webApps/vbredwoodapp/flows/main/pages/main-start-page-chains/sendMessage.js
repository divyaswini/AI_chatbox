/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  const BOT_RESPONSES = [
    "Hi, I'm Oracle Assistant. What do you want to know about Oracle Integration?",
    "I can help you with Oracle Integration Cloud, OIC connections, and integrations. What would you like to know?",
    "Great question! Oracle Integration supports REST, SOAP, and many SaaS adapters. Could you be more specific?",
    "For Oracle Integration, I recommend starting with the Connections section. What are you trying to integrate?",
    "I understand. Let me help you with that. Could you provide more details about your integration requirement?",
    "Oracle Integration Cloud provides over 400 pre-built adapters. Which application are you working with?",
  ];

  class sendMessage extends ActionChain {

    async run(context) {
      const { $page } = context;

      const inputEl = document.getElementById('oaChatInput');
      if (!inputEl) return;

      const text = inputEl.value.trim();
      if (!text) return;

      const timeLabel = this._timeNow();

      // Add user message
      const msgs = $page.variables.chatMessages.slice();
      msgs.push({ id: 'u-' + Date.now(), text, sender: 'user', time: timeLabel });
      $page.variables.chatMessages = msgs;

      // Clear and refocus input
      inputEl.value = '';
      inputEl.focus();
      this._scrollToBottom();

      // Simulate bot response after a short delay
      setTimeout(() => {
        const botText = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        const updated = $page.variables.chatMessages.slice();
        updated.push({ id: 'b-' + Date.now(), text: botText, sender: 'bot', time: this._timeNow() });
        $page.variables.chatMessages = updated;
        this._scrollToBottom();
      }, 700);
    }

    _timeNow() {
      return new Date().toLocaleTimeString('en-US', {
        hour:   'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    _scrollToBottom() {
      setTimeout(() => {
        const area = document.getElementById('oaMessagesArea');
        if (area) area.scrollTop = area.scrollHeight;
      }, 60);
    }
  }

  return sendMessage;
});
