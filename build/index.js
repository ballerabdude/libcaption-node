"use strict";

/**
 * Created by abdulhagi on 4/25/17.
 */
// only ES5 is allowed in this file
require("babel-core/register");
require("babel-polyfill");
// other babel configuration, if necessary

// load and start your app
var LibCaptionNode = require("./libCaptionNode.js");
// let libCaptionNode = new LibCaptionNode.default;
// libCaptionNode.embedscc(`${process.cwd()}/test-sources/source.mp4`, `${process.cwd()}/test-sources/caption.scc`);

module.exports = LibCaptionNode.default;