<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$carteJson = json_decode($json);

$id = $carteJson->ID;

$carte = new DialogueBD();

$liste = $carte->InfosCarte($id);

echo json_encode($liste);
?>