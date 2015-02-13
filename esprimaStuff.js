  var esprima = require('esprima');

  function traverse(node, func) {
    func(node);
    for (var key in node) {
        if (node.hasOwnProperty(key)) {
            var child = node[key];
            if (typeof child === 'object' && child !== null) {

                if (Array.isArray(child)) {
                    child.forEach(function(node) {
                        traverse(node, func);
                    });
                } else {
                    traverse(child, func);
                }
            }
        }
    }
  }

  exports.analyzeCode = function (code) {
    var ast = esprima.parse(code);
    var functionsStats = {};
    var addStatsEntry = function(funcName) {
        if (!functionsStats[funcName]) {
            functionsStats[funcName] = 0;
        }
    };

    traverse(ast, function(node) {

      if (node.type == undefined){
        
        addStatsEntry(node);
        functionsStats[node]++;
      }
      else if (node.type == "CallExpression" && node.callee.name){
        addStatsEntry(node.callee.name);
        functionsStats[node.callee.name]++;
      }
      else{
        addStatsEntry(node.type);
        functionsStats[node.type]++;
      }
    });
    //processResults(functionsStats);
    return functionsStats;
  }