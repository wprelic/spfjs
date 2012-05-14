// Copyright 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview JavaScript for the SPF demo app.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */


/**
 * The demo app namespace.
 * @type {Object}
 */
var demo = demo || {};


/**
 * Initialize the demo app.
 */
demo.init = function() {
  demo.start_ = +new Date();
  demo.timer_ = window.setInterval(demo.updateTime, 500);
  var config = {
    'callback-click': demo.handleClick,
    'callback-history': demo.handleHistory,
    'callback-request': demo.handleRequest,
    'callback-process': demo.handleProcess
  };
  demo.enabled = spf.init(config);
  demo.updateStatus();
};


/**
 * Dispose the demo app.
 */
demo.dispose = function() {
  window.clearInterval(demo.timer_);
  demo.start_ = 0;
  demo.enabled = false;
  demo.updateStatus();
  demo.updateTime();
};


/**
 * Update the display showing whether SPF is enabled.
 */
demo.updateStatus = function() {
  var statusEl = document.getElementById('demo-status');
  if (statusEl) {
    if (demo.enabled) {
      statusEl.innerHTML = 'Enabled';
      statusEl.className = 'enabled';
    } else {
      statusEl.innerHTML = 'Disabled';
      statusEl.className = 'disabled';
    }
  }
};


/**
 * Update the display counting time since last page load.
 */
demo.updateTime = function() {
  var timerEl = document.getElementById('demo-timer');
  if (timerEl) {
    if (demo.start_) {
      var time = Math.floor((+new Date() - demo.start_) / 1000);
      timerEl.innerHTML = time;
    } else {
      timerEl.innerHTML = ''
    }
  }
};


/**
 * Callback for click events.
 * @param {Element} el The clicked element.
 */
demo.handleClick = function(el) {
  window.console.log('demo: clicked on', el);
};


/**
 * Callback for history events.
 * @param {string} url The new URL.
 */
demo.handleHistory = function(url) {
  window.console.log('demo: history changed to', url);
};


/**
 * Callback for requests.
 * @param {string} url The reqested URL, without the SPF identifier.
 * @param {Object} response The requested SPF response object.
 */
demo.handleRequest = function(url, response) {
  window.console.log('demo: requested', url, response);
};


/**
 * Callback for response processing.
 * @param {Object} response The processed SPF response object.
 */
demo.handleProcess = function(response) {
  window.console.log('demo: processed', response);
};


/**
 * Whether SPF is enabled for the demo app.
 * @type {boolean}
  */
demo.enabled = false;


/**
 * The timestamp of when the demo app started.
 * @type {number}
 * @private
 */
demo.start_ = 0;


/**
 * The timer counting since last page load.
 * @type {number}
 * @private
 */
demo.timer_ = 0;


////////////////////////////////////////////////////////////////////////////////


/**
 * The demo app namespace for the home page.
 * @type {Object}
 */
demo.home = demo.home || {};


/**
 * Initialize the demo app home page.
 */
demo.home.init = function() {
  // Show the correct support notice.
  var id = demo.enabled ? 'home-full' : 'home-partial';
  document.getElementById(id).style.display = '';
  // Enable the extra content button.
  var buttonEl = document.getElementById('home-ajax-get');
  buttonEl.onclick = demo.home.onGetExtra;
};


/**
 * Event handler for the extra content button.
 */
demo.home.onGetExtra = function() {
  spf.load('/index_ajax');
};