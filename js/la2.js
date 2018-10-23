/*
	*Attrs historico, debito, garantia, renda, risco
	- historico (0 - desconhecido, 1 - ruim, 2 - boa)
    - debito    (0 - nenhum, 1 - baixo, 2 - alto)
    - garantia  (0 - nenhum, 1 - aceitavel)
    - renda     (0 -)
    - risco     (0 - baixo,  1 - moderado, 2 - alto )

*/
function arvore(his, deb, garan, rend) {
    //Training set
    var data = 
    [
        {historico: 1,  debito: 0,  garantia: 1, renda: 1500,  risco: 2},//o riscoo pode ser string
        {historico: 0,  debito: 2,  garantia: 0, renda: 2500,  risco: 2},
        {historico: 0,  debito: 1,  garantia: 0, renda: 2500,  risco: 1},
        {historico: 0,  debito: 1,  garantia: 0, renda: 4000,  risco: 2},
        {historico: 0,  debito: 1,  garantia: 0, renda: 4000,  risco: 0},
        {historico: 0,  debito: 1,  garantia: 1, renda: 4000,  risco: 0},
        {historico: 1,  debito: 1,  garantia: 0, renda: 1500,  risco: 2},
        {historico: 1,  debito: 1,  garantia: 1, renda: 4000,  risco: 1},
        {historico: 2,  debito: 1,  garantia: 0, renda: 4000,  risco: 0},
        {historico: 2,  debito: 2,  garantia: 1, renda: 4000,  risco: 0},
        {historico: 2,  debito: 2,  garantia: 0, renda: 1500,  risco: 2},
        {historico: 2,  debito: 2,  garantia: 0, renda: 2500,  risco: 1},
        {historico: 2,  debito: 2,  garantia: 0, renda: 4000,  risco: 0},
        {historico: 1,  debito: 2,  garantia: 0, renda: 2500,  risco: 2}
    ];
    
     // Configuration
    var config = {
        trainingSet: data, 
        categoryAttr: 'risco', //Rot
        //ignoredAttributes: ['nop']
    };


    // Building Decision Tree
    var decisionTree = new dt.DecisionTree(config);

    // Testing Decision Tree
    var caso =  {historico: his,  debito: deb,  garantia: garan, renda: rend};

    var decisionTreePrediction = decisionTree.predict(caso);
  
    var resultado = ['baixo','moderado','Alto'];


    // Displaying predictions
    document.getElementById('testingItem').innerHTML = JSON.stringify(caso, null, 0);
    document.getElementById('decisionTreePrediction').innerHTML = JSON.stringify(resultado[decisionTreePrediction], null, 0);

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
                                '<a href="#">sim</a>',
                                treeToHtml(tree.match),
                            '</li>',
                            '<li>', 
                                '<a href="#">não</a>',
                                treeToHtml(tree.notMatch),
                            '</li>',
                        '</ul>',
                    '</li>',
                 '</ul>'].join('');
    }
}


$('#test').on('click',function () {
    arvore($('#hist').val(),$('#deb').val(),$('#garan').val(),$('#renda').val());
});