'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = download;

var _logger = require('../logger');

var _utils = require('../utils');

/**
 * has to reference a location outside the current directory
 * @type {string}
 */
var defaultPath = '../ghost-latest/';

function download(downloadPath, options) {
  if (!which('wget')) {
    _logger.logger.error('Sorry, this script requires wget');
    exit(1);
  }
  if (downloadPath === undefined) {
    _logger.logger.warning('downloadPath is undefined so we assume you want to download to ' + defaultPath);
    downloadPath = defaultPath;
  } else {}
  // TODO: make sure path ends with a /

  // TODO: could be solved more intelligent
  if (test('-e', downloadPath)) {
    rm('-R', downloadPath);
  }
  mkdir(downloadPath);
  exec('wget https://ghost.org/zip/ghost-latest.zip -P ' + downloadPath, { silent: !options.verbose });
  exec('unzip ' + downloadPath + 'ghost-latest.zip -d ' + downloadPath, { silent: !options.verbose });
  rm(downloadPath + 'ghost-latest.zip');
  var json = (0, _utils.parseJson)(downloadPath);
  _logger.logger.info('Downloaded ghost ' + json.version);
}