<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$joueurJson = json_decode($json);

$ID = $joueurJson->ID;
$idA = $ID;

$joueur = new DialogueBD();

// supprimer le match du joueur
$joueur->SuppMatchJoueur($ID, $idA);

// supprime sa participation a une equipe
$joueur->SuppJoueurEquipe($ID);

// supprime le joueur
$joueur->SuppJoueur($ID);
?>