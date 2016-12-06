'use strict';

module.exports = (express) => {
  const appUseFn = express.application.use;
  //console.log(express.application.use.toString());
  express.application.use = (...args) => {
    console.log('use on router');
    return appUseFn.apply(express, arguments);  
  };
  return explorerMiddleware;
}

function explorerMiddleware(req, res) {
  const routes = {}; 
  dig(req.app._router.stack, routes);
  //console.log(req.app._router.stack);  
  //console.log(routes);
  res.send('explorer');
}

function dig(stack, routes){
  const l = stack.length;
  for (let i = 0; i < l; i++) {
    const layer = stack[i];
    const route = layer.route;

    if (route){
      const path = route.path; 
      const methods = route.methods;
    
      if (!routes[path]) routes[path] = { methods: methods };
      else Object.assign(routes[path].methods, methods);
    } else if (layer.name === 'router') {
      //console.log(layer.handle);
      dig(layer.handle.stack, routes);
    }
  }
}
