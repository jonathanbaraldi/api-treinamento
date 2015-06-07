# api-treinamento

API RESTful em NodeJS usada no treinamento Tropa de Elite AWS da Solid IT. 

Treinamento Tropa de Elite AWS

Siga os passos abaixo para criar uma aplicação escalável de alta disponibilidade e baixo custo na nuvem da Amazon Web Services. Iremos ver no vídeo todos os itens, exceto a criação da conta do usuário. 

Serviços abordados:

- ELB
- S3
- VPC
- EC2
- EBS
- AutoScalling


Os passos abaixo estarão sendo abordados no tutorial disponível em:

Requisitos
	*Criação de conta

1) Criação da VPC
3) Criação do banco de dados
3) Configuração do ambiente
4) Criação do ELB
4) Criar AutoScalling Group e Launch Configuration
5) Testar escalabilidade 

========================================================
BANCO DE DADOS  - CRIAÇÃO TABELA - RDS - MYSQL
	
	Conexão no banco direto da EC2 para criação das tabelas
	Instalar o CLI do mysql no linux com 

	yes | sudo yum install mysql

	mysql -u DBUSER -h DBSERVERNAME -p

	
	mysql>    CREATE DATABASE books;
	mysql>    CREATE TABLE books.book ( id MEDIUMINT NOT NULL AUTO_INCREMENT, BookName VARCHAR(100), AuthorName VARCHAR(100), Price VARCHAR(10), PRIMARY KEY (id));

	# Apensas para testar se está inserindo os registros corretamente 
	# mysql>   INSERT INTO books.book VALUES (1,”My first autoscalling app”,”YourName","12");
	#

===========================
AMBIENTE APP - EC2

	Preparar o ambiente

	yes | sudo yum update
	yes | sudo yum install git
	sudo yum install nodejs npm —-enablerepo=epel

	sudo npm install -g vtop

	git clone https://github.com/jonathanbaraldi/api-treinamento.git


-------------------------------------------------------
	# Testar se app está rodando
	
	cd api-treinamento/
	node server.js



User_Data
==================================
#!/bin/bash
node /home/ec2-user/api-treinamento/server.js
===================================


@BaraldiJonathan
