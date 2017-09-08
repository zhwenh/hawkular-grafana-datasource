'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VariablesHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VariablesHelper = exports.VariablesHelper = function () {
  function VariablesHelper(templateSrv) {
    _classCallCheck(this, VariablesHelper);

    this.templateSrv = templateSrv;
  }

  _createClass(VariablesHelper, [{
    key: 'resolve',
    value: function resolve(target, options) {
      var _this = this;

      var variableNames = (this.templateSrv.variables || []).map(function (v) {
        return '$' + v.name;
      });
      // For each variable in target, and each values of a given variable, build a resolved target string
      var resolved = [target];
      if (variableNames) {
        variableNames.forEach(function (name) {
          if (target.indexOf(name) >= 0) {
            var values = _this.getVarValues(name, options.scopedVars);
            var newResolved = [];
            var regex = new RegExp('\\' + name, 'g');
            values.forEach(function (val) {
              resolved.forEach(function (newTarget) {
                newResolved.push(newTarget.replace(regex, val));
              });
            });
            resolved = newResolved;
          }
        });
      }
      return resolved;
    }
  }, {
    key: 'resolveForQL',
    value: function resolveForQL(target, options) {
      return this.templateSrv.replace(target, options.scopedVars, function (values) {
        if (_lodash2.default.isArray(values)) {
          return values.map(function (v) {
            return '\'' + v + '\'';
          }).join(',');
        }
        return '\'' + values + '\'';
      });
    }
  }, {
    key: 'getVarValues',
    value: function getVarValues(name, scopedVars) {
      var values = this.templateSrv.replace(name, scopedVars);
      // result might be in like "{id1,id2,id3}" (as string)
      if (values.charAt(0) === '{') {
        return values.substring(1, values.length - 1).split(',');
      }
      return [values];
    }
  }, {
    key: 'exists',
    value: function exists(name) {
      return this.templateSrv.variableExists(name);
    }
  }]);

  return VariablesHelper;
}();
//# sourceMappingURL=variablesHelper.js.map
