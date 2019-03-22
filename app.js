const regression = require('regression'),
      express    = require('express'),
      bodyParser = require('body-parser');
      dataset    = require('./goldDataset/data.json');

const app        = express();      

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
     res.render('index');
});

app.post('/',function(req,res){
     res.redirect('/predict');
});

app.get('/predict',function(req,res){
     res.render('predict');
});

app.post('/predict',function(req,res){
    
    var year=Number(req.body.year);
    var data=[];
    for(var i=0;i<dataset.length;i++)
    {
        data[i]=[Number(dataset[i].Date.split("-")[0]) , dataset[i].Price ];
    }
    
    var solution = regression.linear(data);
  //  var obj=[];
  //     for(var i=0;i< data.length ; i++){ 
  //            obj.push({x:data[i][0] , y: data[i][1]});
  //     }
     
    res.render('graph',{ data:solution.predict(year), equ:solution.string });

});

app.listen(3000,function(){
    console.log("SERVER RUNNING ON PORT 3000");
});