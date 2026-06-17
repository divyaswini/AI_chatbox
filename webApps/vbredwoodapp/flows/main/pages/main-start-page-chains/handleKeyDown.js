/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  class handleKeyDown extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {KeyboardEvent} params.event
     */
    async run(context, { event }) {
      // Only act on Enter key (without Shift for multi-line support)
      if (!event || event.key !== 'Enter' || event.shiftKey) return;

      // Prevent default form submission behaviour
      event.preventDefault();

      // Delegate to the send button click which triggers sendMessage chain
      const sendBtn = document.querySelector('.oa-send-btn');
      if (sendBtn) sendBtn.click();
    }
  }

  return handleKeyDown;
});
