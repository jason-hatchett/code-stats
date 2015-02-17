# code-stats

A comparison tool for javascript code snippets. 
The tool evaluates javascript code, parsing it into a readable object describing how the code functions. 
From this data, certain item amounts are gathered, such as total number of statements in the code, functions used, number of loops, and how deeply the loops are nested. 
These statistics are then weighted and compared via dot products to group them into "similar" "not similar" groups, as well as displaying statistics for each individual snippet.