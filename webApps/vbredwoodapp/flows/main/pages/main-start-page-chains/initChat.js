/* Copyright (c) 2026, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  /* ─── CSS ──────────────────────────────────────────── */
  const WIDGET_CSS = `
    #oa-fab {
      position: fixed !important;
      bottom: 24px;
      right: 24px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #C74634;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(199,70,52,0.5);
      z-index: 99999;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      outline: none;
      padding: 0;
    }
    #oa-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 24px rgba(199,70,52,0.6);
    }
    #oa-fab:active { transform: scale(0.95); }
    #oa-fab svg { width: 26px; height: 26px; fill: white; display: block; }

    #oa-chat-window {
      position: fixed !important;
      bottom: 90px;
      right: 16px;
      width: 318px;
      height: 470px;
      background: #f5f5f5;
      border-radius: 14px;
      box-shadow: 0 12px 44px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.1);
      display: none;
      flex-direction: column;
      z-index: 99998;
      overflow: hidden;
      font-family: "Oracle Sans", "Helvetica Neue", Arial, sans-serif;
    }
    #oa-chat-window.oa-open {
      display: flex;
      animation: oaSlideIn 0.22s cubic-bezier(0.34,1.25,0.64,1);
    }
    @keyframes oaSlideIn {
      from { opacity:0; transform: translateY(28px) scale(0.93); }
      to   { opacity:1; transform: translateY(0) scale(1); }
    }

    /* Header */
    .oa-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 14px 12px;
      background: #fff;
      border-bottom: 1px solid #e6e6e6;
      flex-shrink: 0;
    }
    .oa-header-title {
      font-size: 14.5px;
      font-weight: 600;
      color: #1c1c1c;
      letter-spacing: 0.1px;
    }
    .oa-header-actions { display: flex; gap: 2px; align-items: center; }
    .oa-icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      color: #6b6b6b;
      border-radius: 6px;
      line-height: 0;
      transition: background 0.12s, color 0.12s;
      outline: none;
    }
    .oa-icon-btn:hover { background: #f0f0f0; color: #1c1c1c; }
    .oa-icon-btn svg { width: 18px; height: 18px; display: block; }

    /* Messages */
    .oa-messages {
      flex: 1;
      overflow-y: auto;
      padding: 12px 14px 8px;
      display: flex;
      flex-direction: column;
      background: #f5f5f5;
    }
    .oa-messages::-webkit-scrollbar { width: 4px; }
    .oa-messages::-webkit-scrollbar-track { background: transparent; }
    .oa-messages::-webkit-scrollbar-thumb { background: #c8c8c8; border-radius: 2px; }

    .oa-date-sep {
      text-align: center;
      font-size: 11px;
      color: #999;
      letter-spacing: 0.5px;
      font-weight: 500;
      margin: 0 0 12px;
      line-height: 1.4;
    }
    .oa-msg-row { display: flex; flex-direction: column; margin-bottom: 10px; }
    .oa-msg-row.bot  { align-items: flex-start; }
    .oa-msg-row.user { align-items: flex-end; }

    .oa-bubble {
      font-size: 13.5px;
      line-height: 1.52;
      word-wrap: break-word;
      max-width: 87%;
    }
    .oa-bubble.bot {
      background: #fff;
      border: 1px solid #e5e5e5;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
      border-radius: 12px 12px 12px 3px;
      padding: 10px 13px;
      color: #1c1c1c;
    }
    .oa-bubble.user {
      background: #e2e2e2;
      border-radius: 16px 16px 3px 16px;
      padding: 7px 14px;
      color: #1c1c1c;
      font-size: 13px;
    }
    .oa-msg-time {
      font-size: 11px;
      color: #aaa;
      margin-top: 4px;
      padding: 0 3px;
    }

    /* Input bar */
    .oa-input-bar {
      display: flex;
      align-items: center;
      padding: 9px 10px 9px 12px;
      background: #fff;
      border-top: 1px solid #e6e6e6;
      gap: 6px;
      flex-shrink: 0;
    }
    #oa-input {
      flex: 1;
      min-width: 0;
      border: 1px solid #e0e0e0;
      border-radius: 22px;
      padding: 8px 14px;
      font-size: 13px;
      outline: none;
      background: #f7f7f7;
      color: #1c1c1c;
      font-family: inherit;
      transition: border-color 0.15s, background 0.15s;
    }
    #oa-input:focus {
      border-color: #C74634;
      background: #fff;
      box-shadow: 0 0 0 2px rgba(199,70,52,0.12);
    }
    #oa-input::placeholder { color: #b2b2b2; }
    .oa-send-btn, .oa-mic-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      color: #9a9a9a;
      border-radius: 50%;
      line-height: 0;
      flex-shrink: 0;
      transition: color 0.12s, background 0.12s;
      outline: none;
    }
    .oa-send-btn:hover { color: #C74634; background: rgba(199,70,52,0.08); }
    .oa-mic-btn:hover  { color: #555; background: #f0f0f0; }
    .oa-send-btn svg, .oa-mic-btn svg { width: 20px; height: 20px; display: block; }
  `;

  /* ─── SVG icons ─────────────────────────────────── */
  const ICON_CHAT = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>`;
  const ICON_VOL_ON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5zm7-2L9.91 9H7v6h2.91L12 17.14V7z"/></svg>`;
  const ICON_VOL_OFF = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
  const ICON_MINUS = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>`;
  const ICON_SEND = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
  const ICON_MIC = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>`;

  /* ─── Bot responses ──────────────────────────────── */
  const BOT_RESPONSES = [
    "Hi, I'm Oracle Assistant. What do you want to know about Oracle Integration?",
    "I can help you with Oracle Integration Cloud, OIC connections, and integrations. What would you like to know?",
    "Oracle Integration supports REST, SOAP, and 400+ SaaS adapters. Could you be more specific?",
    "For Oracle Integration, I recommend starting with the Connections section. Which application are you integrating?",
    "I understand. Let me help you. Could you provide more details about your integration requirement?",
    "Oracle Integration Cloud provides pre-built recipes for common integrations. Would that help?",
  ];

  /* ─── Chain ──────────────────────────────────────── */
  class initChat extends ActionChain {

    async run(context) {
      // Remove any existing widget instance (re-entry safety)
      const oldStyle = document.getElementById('oa-widget-style');
      const oldWidget = document.getElementById('oa-widget');
      if (oldStyle) oldStyle.remove();
      if (oldWidget) oldWidget.remove();

      // Inject CSS into <head>
      const styleEl = document.createElement('style');
      styleEl.id = 'oa-widget-style';
      styleEl.textContent = WIDGET_CSS;
      document.head.appendChild(styleEl);

      // Build widget container and append to <body>
      const wrapper = document.createElement('div');
      wrapper.id = 'oa-widget';
      wrapper.innerHTML = this._buildHTML();
      document.body.appendChild(wrapper);

      // Wire all interactions
      this._wireEvents();
    }

    /* ── HTML skeleton ────────────────────────────── */
    _buildHTML() {
      return `
        <!-- FAB -->
        <button id="oa-fab" aria-label="Open Oracle Assistant">${ICON_CHAT}</button>

        <!-- Chat window -->
        <div id="oa-chat-window">
          <div class="oa-header">
            <span class="oa-header-title">Oracle Assistant</span>
            <div class="oa-header-actions">
              <button class="oa-icon-btn" id="oa-mute-btn" aria-label="Mute">${ICON_VOL_ON}</button>
              <button class="oa-icon-btn" id="oa-close-btn" aria-label="Minimize">${ICON_MINUS}</button>
            </div>
          </div>

          <div class="oa-messages" id="oa-messages-area">
            <div class="oa-date-sep" id="oa-date-sep"></div>
            <div id="oa-msg-list"></div>
          </div>

          <div class="oa-input-bar">
            <input id="oa-input" type="text" placeholder="Type a message" autocomplete="off" />
            <button class="oa-send-btn" id="oa-send-btn" aria-label="Send">${ICON_SEND}</button>
            <button class="oa-mic-btn" aria-label="Voice input">${ICON_MIC}</button>
          </div>
        </div>
      `;
    }

    /* ── Wire all events ──────────────────────────── */
    _wireEvents() {
      const fab       = document.getElementById('oa-fab');
      const chatWin   = document.getElementById('oa-chat-window');
      const closeBtn  = document.getElementById('oa-close-btn');
      const muteBtn   = document.getElementById('oa-mute-btn');
      const sendBtn   = document.getElementById('oa-send-btn');
      const input     = document.getElementById('oa-input');
      const dateSep   = document.getElementById('oa-date-sep');

      // Set date label
      if (dateSep) dateSep.textContent = this._getDateLabel();

      // Show welcome message
      this._addMessage('bot', "Hello, I'm Oracle Assistant. What are your questions about Oracle Integration?");

      // Open / close
      fab.addEventListener('click', () => this._openChat(chatWin));
      closeBtn.addEventListener('click', () => this._closeChat(chatWin));

      // Mute toggle
      let muted = false;
      muteBtn.addEventListener('click', () => {
        muted = !muted;
        muteBtn.innerHTML = muted ? ICON_VOL_OFF : ICON_VOL_ON;
      });

      // Send
      sendBtn.addEventListener('click', () => this._doSend(input));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this._doSend(input);
        }
      });
    }

    /* ── Open chat ────────────────────────────────── */
    _openChat(chatWin) {
      chatWin.classList.add('oa-open');
      setTimeout(() => {
        const input = document.getElementById('oa-input');
        if (input) input.focus();
        this._scrollBottom();
      }, 260);
    }

    /* ── Close chat ───────────────────────────────── */
    _closeChat(chatWin) {
      chatWin.classList.remove('oa-open');
    }

    /* ── Send message + bot reply ─────────────────── */
    _doSend(input) {
      const text = (input.value || '').trim();
      if (!text) return;

      this._addMessage('user', text);
      input.value = '';
      input.focus();
      this._scrollBottom();

      setTimeout(() => {
        const reply = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
        this._addMessage('bot', reply);
        this._scrollBottom();
      }, 700);
    }

    /* ── Append a message bubble ──────────────────── */
    _addMessage(sender, text) {
      const list = document.getElementById('oa-msg-list');
      if (!list) return;

      const row = document.createElement('div');
      row.className = `oa-msg-row ${sender}`;

      const bubble = document.createElement('div');
      bubble.className = `oa-bubble ${sender}`;
      bubble.textContent = text;

      const time = document.createElement('span');
      time.className = 'oa-msg-time';
      time.textContent = this._timeNow();

      row.appendChild(bubble);
      row.appendChild(time);
      list.appendChild(row);
    }

    /* ── Scroll messages area to bottom ──────────── */
    _scrollBottom() {
      setTimeout(() => {
        const area = document.getElementById('oa-messages-area');
        if (area) area.scrollTop = area.scrollHeight;
      }, 60);
    }

    /* ── Date/time helpers ────────────────────────── */
    _getDateLabel() {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
      const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      return `${date} AT ${time}`;
    }

    _timeNow() {
      return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
  }

  return initChat;
});
