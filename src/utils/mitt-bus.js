import mitt from "mitt";

const emitter = mitt();
function _mitt(all) {
  all = all || new Map();
  return {
    all: all,
    on: function (type, handler) {
      var handlers = all.get(type);
      if (handlers) {
        handlers.push(handler);
      } else {
        all.set(type, [handler]);
      }
    },
    off: function (type, handler) {
      var handlers = all.get(type);
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        } else {
          all.set(type, []);
        }
      }
    },
    emit: function (type, evt) {
      var handlers = all.get(type);
      if (handlers) {
        handlers.slice().map(function (handler) {
          handler(evt);
        });
      }
      handlers = all.get("*");
      if (handlers) {
        handlers.slice().map(function (handler) {
          handler(type, evt);
        });
      }
    },
  };
}

export default emitter;
