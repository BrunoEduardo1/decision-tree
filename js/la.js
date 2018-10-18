/*
	*Attrs historic, debt, guarantee, revenue, risc
	- historic (0 - unknown, 1 - bad, 2 - good)
    - debt     (0 - none,    1 - low, 2 - high)
    - guarantee(0 - none,    1 - suitable)
    - revenue  (0 -)
    - risc     (0 - low,     1 - moderate, 2 - high )

*/
//Training set
var data = 
    [
    {historic: 1,  debt: 0,  guarantee: 1, revenue: 1500,  risc: 2},//o risco pode ser string
    {historic: 0,  debt: 2,  guarantee: 0, revenue: 2500,  risc: 2},
    {historic: 0,  debt: 1,  guarantee: 0, revenue: 2500,  risc: 1},
    {historic: 0,  debt: 1,  guarantee: 0, revenue: 4000,  risc: 2},
    {historic: 0,  debt: 1,  guarantee: 0, revenue: 4000,  risc: 0},
    {historic: 0,  debt: 1,  guarantee: 1, revenue: 4000,  risc: 0},
    {historic: 1,  debt: 1,  guarantee: 0, revenue: 1500,  risc: 2},
    {historic: 1,  debt: 1,  guarantee: 1, revenue: 4000,  risc: 1},
    {historic: 2,  debt: 1,  guarantee: 0, revenue: 4000,  risc: 0},
    {historic: 2,  debt: 2,  guarantee: 1, revenue: 4000,  risc: 0},
    {historic: 2,  debt: 2,  guarantee: 0, revenue: 1500,  risc: 2},
    {historic: 2,  debt: 2,  guarantee: 0, revenue: 2500,  risc: 1},
    {historic: 2,  debt: 2,  guarantee: 0, revenue: 4000,  risc: 0},
    {historic: 1,  debt: 2,  guarantee: 0, revenue: 2500,  risc: 2}
    ];
    
     // Configuration
    var config = {
        trainingSet: data, 
        categoryAttr: 'risc', //maybe this one could be risc
        //ignoredAttributes: ['nop']
    };


    // Building Decision Tree
    var decisionTree = new dt.DecisionTree(config);

    // Testing Decision Tree and Random Forest
    var caso =  {historic: 2,  debt: 0,  guarantee: 1, revenue: 3500};

    var decisionTreePrediction = decisionTree.predict(caso);

    console.log(decisionTreePrediction);
    //var result = ['baixo','moderado','Alto'];
    //console.log(result[decisionTreePrediction]);
    
    //Temporary
    (decisionTreePrediction == 0)? decisionTreePrediction = 'baixo': 
    (decisionTreePrediction == 1) ? decisionTreePrediction = 'moderado' : decisionTreePrediction = 'Alto' ;
   

// Displaying predictions
document.getElementById('testingItem').innerHTML = JSON.stringify(caso, null, 0);
document.getElementById('decisionTreePrediction').innerHTML = JSON.stringify(decisionTreePrediction, null, 0);
document.getElementById('randomForestPrediction').innerHTML = JSON.stringify(randomForestPrediction, null, 0);

// Displaying Decision Tree
document.getElementById('displayTree').innerHTML = treeToHtml(decisionTree.root);


// Recursive (DFS) function for displaying inner structure of decision tree
function treeToHtml(tree) {
    // only leafs containing category
    if (tree.category) {
        return  ['<ul>',
                    '<li>',
                        '<a href="#">',
                            '<b>', tree.category, '</b>',
                        '</a>',
                    '</li>',
                 '</ul>'].join('');
    }
    
    return  ['<ul>',
                '<li>',
                    '<a href="#">',
                        '<b>', tree.attribute, ' ', tree.predicateName, ' ', tree.pivot, ' ?</b>',
                    '</a>',
                    '<ul>',
                        '<li>',
                            '<a href="#">yes</a>',
                            treeToHtml(tree.match),
                        '</li>',
                        '<li>', 
                            '<a href="#">no</a>',
                            treeToHtml(tree.notMatch),
                        '</li>',
                    '</ul>',
                '</li>',
             '</ul>'].join('');
}