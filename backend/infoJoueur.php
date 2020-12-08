<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$carteJson = json_decode($json);

$id = strip_tags($carteJson->ID);

$carte = new dialogueBD();
$joueur = $carte->InfosJoueur($id);

echo json_encode($joueur);

?>
