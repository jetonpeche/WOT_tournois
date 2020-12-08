<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$equipeJson = json_decode($json);

$idJoueur = $equipeJson->ID;
$idEquipe = $equipeJson->idEquipe;


$equipe = new DialogueBD();

$equipe->SuppJoueurEquipe($idJoueur);
$liste = $equipe->CompositionEquipe($idEquipe);

echo json_encode($liste);

?>