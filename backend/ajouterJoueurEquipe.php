<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$equipeJson = json_decode($json);

$idJoueur = $equipeJson->joueur;
$idEquipe = $equipeJson->equipe;

$equipe = new DialogueBD();

$equipe->AjouterJoueurEquipe($idEquipe, $idJoueur);
$liste = $equipe->ListeJoueurSansEquipe();

echo json_encode($liste);