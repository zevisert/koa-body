'use strict';

var co_body = require('co-body');


module.exports = function(opts){
  var patchNode = (opts && opts.patchNode) || false;
  var patchKoa = (opts && opts.patchKoa) || true;
  return function *(next){
    if(this.is('application/json')){
      var body = yield co_body.json(this);
      if(patchNode){
        this.req.body = body;
      }
      if(patchKoa){
        this.request.body = body;
      }
    }
    else if(this.is('application/x-www-form-urlencoded')){
      var body = yield co_body.form(this);
      if(patchNode){
        this.req.body = body;
      }
      if(patchKoa){
        this.request.body = body;
      }
    }
    yield next;
  };
};
