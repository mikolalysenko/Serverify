#!/usr/bin/env node

//Default options
var options = {
  entry:  './index.js',
  www: './www',
  bundle:   '/bundle.js',
  port:     8080
}

console.log("Starting serverify...");

//First check command line options
var argv = require('optimist')
            .describe('entry', 'Entry for javascript bundle (default "./index.js")')
            .describe('www', 'Path to www root (default "./www")')
            .describe('bundle', 'File to bundle (default "/bundle.js")')
            .describe('port', 'Port to run server on (default 8080)')

if(argv.entry ||
   argv.www ||
   argv.bundle ||
   argv.port) {
  console.log("Using command line arguments");
  for(var id in options) {
    if(id in argv) {
      options[id] = argv[id];
    }
  }
} else {
  //Next, try using local .serverify as config
  var fs = require('fs');
  if(fs.existsSync('.serverify')) {
    console.log("Using local config");
    var config = JSON.parse(fs.readSync('.serverify'));
    for(var id in options) {
      if(id in config) {
        options[id] = config[id];
      }
    }
  } else {
    //Finally just use default options
    console.log("Using default configuration");
  }
}


//Create server
var express = require('express');
var app = express();

//Create bundle
var browserify = require('browserify');

var bundle = browserify({
  debug: true,
  watch: true,
  cache: false
});

bundle.on('syntaxError', function(err) {
  console.log("Syntax error:", err);
});

bundle.on('bundle', function() {
  console.log("Rebuilt bundle");
});

bundle.addEntry(options.entry)

app.get(options.bundle_path, function(req, res) {
  console.log("Serving bundle");
  res.setHeader('Cache-Control', 'no-cache, must-revaliate');
  res.send(bundle.bundle());
})

//Create static file server
var ecstatic = require('node-static');

app.use(ecstatic({
  root: options.www,
  cache: "0, must-revalidate"
}));

//Start server
app.listen(options.port);

console.log("Test server started on port:", options.port)