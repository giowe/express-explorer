'use strict';
const flatten = require('array-flatten');
const slice = Array.prototype.slice;
const debug = require('debug')('express:router');
const Layer = require('express/lib/router/layer');
const Router = require('express/lib/router');

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

    if (fn.name === 'router') dig(fn.stack, path);
    //todo questo non va mica qui. questo andrà messo negli altri metodi del router.
    //dig(this.stack);

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


module.exports = (req, res) => {
  console.log(routes);
  res.send('explorer');
};

function dig(stack, prefix) {
  prefix = prefix || '';
  stack.forEach(layer => {
    const route = layer.route;

    if (route) {
      const path = prefix + route.path;
      const methods = route.methods;

      routes[path] = Object.assign({}, routes[path], methods);
    }
  });
}
