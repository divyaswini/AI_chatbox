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
      if (!event || event.key !== 'Enter' || event.shiftKey) { return; }

      event.preventDefault();

      // Delegate to the send button click so sendMessage chain fires
      var sendBtn = document.querySelector('.oa-send-btn');
      if (sendBtn) { sendBtn.click(); }
    }
  }

  return handleKeyDown;
});
