var esprima = require('esprima');
var fs = require('fs');

var file = 'glenn_code.js'
var code = fs.readFileSync(file);


//return object analyze data inside item
//name should be "brian_code.js"/filename/input name
//embedded "output" item
//maybe a default screenShow value of true or false
//
//
// return { name: file, output: analyzeCode(code), screenShown: true}
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
            functionsStats[funcName] = 0;
        }
    };

    traverse(ast, function(node, depth) {

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

        if (node.type && node.type.indexOf("Statement") > -1){
          addStatsEntry("TotalStatements");
          functionsStats["TotalStatements"]++;
        }
        
        
    });
    processResults(functionsStats);
    //return functionStats;
}

function processResults(results) {
    for (var name in results) {
        if (results.hasOwnProperty(name)) {
            var stats = results[name];
            console.log(name, stats); 
        }
    }
}


//console.log(JSON.stringify(esprima.parse(code), null, 2));
