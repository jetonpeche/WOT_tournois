<?php
//accepter les demandes provenant par autre serveurs Angular sans etre bloque par le navigateur
header( "Access-Control-Allow-Origin: *"); 
//methodes authorisées
header( "Access-Control-Allow-Methods: PUT, GET, POST, DELETE"); 
header( "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
?>