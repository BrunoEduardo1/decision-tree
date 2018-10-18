//Bank Training set
/*
	*Attrs historic, debt, guarantee, revenue, risc
	- historic (0 - unknown, 1 - bad, 2 - good)
    - debt     (0 - none,    1 - low, 2 - high)
    - guarantee(0 - none,    1 - suitable)
    - revenue  (0 -)
    - risc     (0 - low,     1 - moderate, 2 - high )

*/
var data = 
    [
    {historic: 1,  debt: 0,  guarantee: 1, revenue: 1500,  risc: 2},
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
        //ignoredAttributes: ['person']
    };


    // Building Decision Tree
    var decisionTree = new dt.DecisionTree(config);

    // Testing Decision Tree and Random Forest
    var caso =  {historic: 1,  debt: 0,  guarantee: 1, revenue: 1500,risc: 2};

    var decisionTreePrediction = decisionTree.predict(caso);

    console.log(decisionTree);