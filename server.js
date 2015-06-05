var express = require('express'); 
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

// Configura conexão
var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '12qwaszx',
		database : 'books',
	});

// Parsear o conteudo
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  	extended: true
}));


// Configuração da requisição, cabeçalhos, etc. CORS
app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	// Métodos que queremos permitir
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});


// GET
app.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Welcome to Jon's API";
	res.json(data);
	console.log(data);
});



// GET /book
app.get('/book',function(req,res){
	var data = {
		"error":1,
		"Books":"",
		"Total":""
	};
	
	connection.query("SELECT * from book",function(err, rows, fields){
		
		if (err) console.log(err);

		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			data["Total"] = rows.length;
			res.json(data);
			console.log(data);
		}else{
			data["Books"] = 'Nenhum livro encontrado';
			res.json(data);
			console.log(data);
		}
	});
});

// ===================================



// POST /book
app.post('/book',function(req,res){

	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;

	var data = {
		"error":1,
		"Books":""
	};

	if(!!Bookname && !!Authorname && !!Price){
		connection.query("INSERT INTO book (Bookname,Authorname,Price) VALUES(?,?,?)",[Bookname,Authorname,Price],function(err, rows, fields){
			if(!!err){
				console.log(err)
				data["Books"] = "Erro adicionando livro";
			}else{
				data["error"] = 0;
				data["Books"] = "Livro adicionado com sucesso!";
			}
			res.json(data);
			console.log(data);
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados : (bookname, authorname, price)";
		res.json(data);
		console.log(data);
	}
});

// ===================================

// PUT /book
app.put('/book',function(req,res){
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id && !!Bookname && !!Authorname && !!Price){
		connection.query("UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE id=?",[Bookname,Authorname,Price,Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Erro atualizando dados";
			}else{
				data["error"] = 0;
				data["Books"] = "Livro atualizado com sucesso";
			}
			res.json(data);
			console.log(data);
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados:  (id, bookname, authorname, price )";
		res.json(data);
		console.log(data);
	}
});

// ===================================

// DELETE /book
app.delete('/book',function(req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id){
		connection.query("DELETE FROM book WHERE id=?",[Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["Books"] = "Livro deletado com sucesso!";
			}
			res.json(data);
			console.log(data);
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados: ( id )  ";
		res.json(data);
		console.log(data);
	}
});

app.listen(8080,function(){
	console.log("Conectado e escutando na porta 8080");
});