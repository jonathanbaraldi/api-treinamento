# api-treinamento

API RESTful em NodeJS usada no treinamento Tropa de Elite AWS da Solid IT. 

Treinamento Tropa de Elite AWS

Criação DB
============================
DB-Instance Identifier
	dbtreinamento
	admin
	12qwaszx
	dbtreinamento
=============================


============================
BANCO DE DADOS  - CRIAÇÃO TABELA - RDS - MYSQL
	Conexão no banco direto da EC2 para criação das tabelas
	Instalar o CLI do mysql no linux com 
yes | sudo yum install mysql
mysql -u DBUSER -h DBSERVERNAME -p

	mysql>CREATE DATABASE books;
	mysql>CREATE TABLE books.book ( id MEDIUMINT NOT NULL AUTO_INCREMENT, BookName VARCHAR(100), AuthorName VARCHAR(100), Price VARCHAR(10), PRIMARY KEY (id));
	mysql>INSERT INTO books.book VALUES (1,”My first autoscalling app”,”YourName","12");


===========================
AMBIENTE APP - EC2
Preparar o ambiente - EC2

yes | sudo yum update
yes | sudo yum install git
sudo yum install nodejs npm —enablerepo=epel

sudo npm install -g vtop

git clone https://github.com/jonathanbaraldi/api-treinamento.git

cd api-treinamento/
node server.js




User_Data
==================================
#!/bin/bash
node /home/ec2-user/api-treinamento/server.js
===================================



@BaraldiJonathan
