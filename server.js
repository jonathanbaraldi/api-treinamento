var express = require('express'); 
var app = express();

var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require('body-parser');

// Configura conexão
var connection = mysql.createConnection({
		host     : 'db.connection',
		user     : 'admin',
		password : '1234567',
		database : 'books',
	});

// Parsear o conteudo

app.use(bodyParser.urlencoded({
  	extended: false
}));
app.use(bodyParser.json());

// Configuração da requisição, cabeçalhos, etc. CORS
app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	// Métodos que queremos permitir
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});


// ===================================
// ===================================
// ===================================
// ===================================
// ===================================


// GET
app.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Bem vindo a BookStore da Solid";
	res.json(data);
});


// GET /jon
app.get('/jon',function(req,res){
	
	var data = {
		"Data":""
	};
	
	data["Data"] = "API de Serviços do Jon";
	data["Ver"] = "0.2";
	
	res.json(data);
	/*
	connection.query("SELECT * from book",function(err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			res.json(data);
		}else{
			data["Books"] = 'Nenhum livro encontrado';
			res.json(data);
		}
	});
	*/
});

// GET /jon
app.get('/html',function(req,res){
	
	var data = {
		"Data":""
	};
	
	data["Data"] = "API de Serviços do Jon";
	data["Ver"] = "0.2";

	var body = '<html>'
				+'	<head>'
				+'	<meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
				+'	</head>'

				+'	<body>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	    <form action="/upload" method="post">'
				+'	        <textarea name="text" rows="20" cols="60"></textarea>'
				+'	        <input type="submit" value="Submit text"/>'
				+'	    </form>'
				+'	</body>'
				+'	</html>';

	res.writeHead(200,{"Content-Type" : "text/html"});
	res.write(body);
	console.log("html");
});



// GET /book
app.get('/book',function(req,res){
	var data = {
		"error":1,
		"Books":"",
		"Number":""
	};
	
	connection.query("SELECT * from book",function(err, rows, fields){
		
		if (err) console.log(err);

		if(rows.length != 0){
			data["error"] = 0;
			
			
			data["Books"] = rows;
			

			n1 = Math.floor((Math.random() * 100000) + 1);
			n2 = Math.floor((Math.random() * 100000) + 1);
			n3 = Math.floor((Math.random() * 100000) + 1);
			nf = n1*n2/n3;
			nf = nf*nf*nf*nf*nf;
			nf = nf/n3/n2/n1;


			var Pi=0;
			var n=1;
			for (i=0;i<=1000;i++) {
				Pi=Pi+(4/n)
				n=n+2
				Pi=Pi-(4/n)
				n=n+2
			}

			retorno = Pi*Pi*nf*nf;

			retorno = retorno*retorno*retorno*retorno;

			retorno = retorno/retorno/retorno;

			console.log(retorno);
			data["Number"] = retorno;
			
			res.json(data);

		}else{
			data["Books"] = 'Nenhum livro encontrado';
			res.json(data);
		}
	});
});


// ===================================
// ===================================
// ===================================
// ===================================
// ===================================


// POST /book
app.post('/book',function(req,res){
	
	console.log(req.body);
	
	/*
	content += req;
	RESPOSTA = JSON.parse(content);
	console.log(RESPOSTA);
	*/

	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};

	// console.log(Bookname);


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
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados : (bookname, authorname, price)";
		res.json(data);
	}
});


// ===================================
// ===================================
// ===================================
// ===================================
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
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados:  (id, bookname, authorname, price )";
		res.json(data);
	}
});

// ===================================
// ===================================
// ===================================
// ===================================
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
		});
	}else{
		data["Books"] = "Por favor, informe todos os dados: ( id )  ";
		res.json(data);
	}
});

http.listen(8080,function(){
	console.log("Conectado e escutando na porta 8080");
});