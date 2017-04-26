/**
 * Created by abdulhagi on 4/25/17.
 */
// only ES5 is allowed in this file
require("babel-core/register");
require("babel-polyfill");
// other babel configuration, if necessary

// load and start your app
let App = require("./app.js");
let app = new App.default;
app.scc2srt(`${process.cwd()}/test-sources/caption.scc`);
