'use strict';
const flatten = require('array-flatten');
const slice   = Array.prototype.slice;
const debug   = require('debug')('express:router');
const express = require('express');
const path    = require('path');
const Layer   = require('express/lib/router/layer');
const Router  = require('express/lib/router');
const fs      = require('fs');
const ejs     = require('ejs');

let pkg;
try {
  pkg = require('../../package.json');
} catch(err) {
  pkg = {name: 'express-explorer'}
}

const routes = {};

Router.use = function use(fn) {
  let offset = 0;
  let path = '/';

  if (typeof fn !== 'function') {
    let arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) arg = arg[0];

    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  const callbacks = flatten(slice.call(arguments, offset));
  if (callbacks.length === 0) throw new TypeError('Router.use() requires middleware functions');

  const l = callbacks.length;
  for (let i = 0; i < l; i++) {
    const fn = callbacks[i];

    if (typeof fn !== 'function') throw new TypeError('Router.use() requires middleware function but got a ' + gettype(fn));

    debug('use %s %s', path, fn.name || '<anonymous>');

    if (fn.name === 'router') fn.mountPath = path;

    const layer = new Layer(path, {
      sensitive: this.caseSensitive,
      strict: false,
      end: false
    }, fn);

    layer.route = undefined;

    this.stack.push(layer);
  }

  return this;
};

const getParams = (route) => {
    const segments = route.split('/');
    let params = [];

    for (let i = 0; i < segments.length; i++) {
        let segment = segments[i];

        if (segment[0] == ":") {
            params.push(segment.slice(1));
        }
    }

    return params;
};

module.exports = (options) => {
  this.options = Object.assign({
    format: 'html'
  }, options);

  return [
    express.static(path.join(__dirname, 'static')),

    (req, res) => {
      dig(req.app._router.stack);
      const query = req.query || {};

      const format = query.format || this.options.format;
      if (format === 'json') res.json(routes);
      else ejs.renderFile(path.join(__dirname, './views/index.ejs'), {
        routes,
        project: pkg,
        getParams
      }, (err, result) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        res.send(result);
      });
    }
  ];
};

function dig(stack, prefix) {
  prefix = prefix || '';
  stack.forEach(layer => {
    const route = layer.route;
    if (layer.name === 'router') {
      dig(layer.handle.stack, layer.handle.mountPath);
    } else if (route) {
      const routePath = path.join(prefix, route.path);
      const methods = route.methods;

      routes[routePath] = Object.assign({}, routes[routePath], methods);
    }
  });

}
