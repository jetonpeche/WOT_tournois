<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$carteJson = json_decode($json);

$ID = $carteJson->ID;

$carte = new DialogueBD();

$carte->SuppUneCarte($ID);

$liste = $carte->ListeCarte();

echo json_encode($liste);

?>