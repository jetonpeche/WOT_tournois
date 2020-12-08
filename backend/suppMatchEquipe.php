<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$matchJson = json_decode($json);

$id = $matchJson->ID;
$idAdverse = $matchJson->ID_ADVERSE;

$matchJson = new DialogueBD();
$matchJson->SuppMatchEquipe($id, $idAdverse);
?>