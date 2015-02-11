var esprima = require('esprima');
var fs = require('fs');


var code = fs.readFileSync('brian_code.js');

analyzeCode(code)

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

function analyzeCode(code) {
    var ast = esprima.parse(code);
    var functionsStats = {};
    var addStatsEntry = function(funcName) {
        if (!functionsStats[funcName]) {
            functionsStats[funcName] = {seen:0};
        }
    };

    traverse(ast, function(node) {

        if (node.type == undefined){
          console.log("LOOK AT ME", node)
          addStatsEntry(node);
          functionsStats[node].seen++;
        }
        else if (node.type == "CallExpression" && node.callee.name){
          addStatsEntry(node.callee.name);
          functionsStats[node.callee.name].seen++;
        }
        else{
          addStatsEntry(node.type);
          functionsStats[node.type].seen++;
        }
        
    });
    processResults(functionsStats);
    //return functionStats;
}

function processResults(results) {
    for (var name in results) {
        if (results.hasOwnProperty(name)) {
            var stats = results[name];
            console.log(name, stats.seen); 
        }
    }
}


//console.log(JSON.stringify(esprima.parse(code), null, 2));
