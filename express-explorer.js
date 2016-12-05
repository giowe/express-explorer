'use strict';

module.exports = (req, res) => {
  const routes = {}; 
  dig(req.app._router.stack, routes);
  
  console.log(routes);
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
      dig(layer.handle.stack, routes);
    }
  }

}
