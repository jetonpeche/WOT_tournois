<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$carteJson = json_decode($json);

$nom = strip_tags($carteJson->nom);

$carte = new dialogueBD();
$liste = $carte->RechercheJoueur($nom);

echo json_encode($liste);

?>