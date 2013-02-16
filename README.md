Serverify
=========

Starts a server running browserify so you can quickly develop web applications using the node.js/npm package system.

Usage
=====

Here is how to run the example in `test/`.  First, install the serverify command globally:

    sudo npm install -g serverify
    
Next, go into the test directory and run it:

    cd test/
    serverify
    
And that should start the server!  You can navigate your browser to http://localhost:8080/index.html to view the test page.

Configuration
=============

By default, serverify bundles up the file called `index.js` in the directory which it is run from and servers up static files contained in the `./www/` directory.  The bundle is served at `/bundle.js`.  You can configure this behavior using the following parameters:

* `entry`: (Default: `./index.js`) The entry point for the project.
* `www`: (Default: `./www/`) The static HTML directory
* `bundle`: (Default: `/bundle.js`) The web path to serve up the bundled project on.
* `port`: (Default: 8080) The port on which the server is hosted.

These parameters can be changed in one of the following ways:

* You can override them via the command line, eg:

      serverify --entry test.js
    
* You can create a file called `.serverify` in the same directory as your project which contains a JSON string describing the values for the parameters:

      `echo "{port:9001}" > .serverify && serverify`

## Why not use browserify-server?

Because it caches files, doesn't rebuild bundles on file change, awkwardly reimplements several features in browserify, doesn't properly use debug flags, and is also way more complicated than it has any right to be.

## Why not just run `browserify --watch`?

This only solves half the problem.  You still need to launch a web server to host the files so that you can view them in your browser.

Credits
=======
(c) 2013 Mikola Lysenko.  MIT License