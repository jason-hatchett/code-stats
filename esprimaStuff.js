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

      if (node.type == "LogicExpression" || node.type == "BinaryExpression"){
          addStatsEntry("Expressions");
          functionsStats["Expressions"]++;
        }
        else if (node.type == "ForStatement" || node.type == "WhileStatement"){
          addStatsEntry("Loops");
          functionsStats["Loops"]++;

            var nester = node;
            var deep = 0;
            while (nester.body && nester.body.body[0]){
                deep++;
                nester = nester.body.body[0];
                if (nester.type == "ForStatement" || nester.type == "WhileStatement"){
                    addStatsEntry("DeepestNested");
                    if (functionsStats["DeepestNested"] < deep) {
                        functionsStats["DeepestNested"] = deep;
                    }
                }
            }
            
        }
        else if (node.type == "AssignmentExpression"){
          addStatsEntry("Assignments");
          functionsStats["Assignments"]++;
        }
        else if (node.type == "FunctionDeclaration"){
          addStatsEntry("Functions");
          functionsStats["Functions"]++;
        }
        else if (node.type == "IfStatement"){
          addStatsEntry("Conditionals");
          functionsStats["Conditionals"]++;
        }
        else if (node.type == "CallExpression"){
          addStatsEntry("MethodCalls");
          functionsStats["MethodCalls"]++;
        }
        else if (node.regex){
          addStatsEntry("Regex");
          functionsStats["Regex"]++;
        }

        if (node.type.indexOf("Statement") > -1){
          addStatsEntry("TotalStatements");
          functionsStats["TotalStatements"]++;
        }

    });
    
    return functionsStats;
  }