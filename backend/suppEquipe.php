<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$equipeJson = json_decode($json);

$ID = $equipeJson->ID;

$equipe = new DialogueBD();

// supprimer les joueurs de l'equipe qui va etre supprimer
$equipe->SuppJoueurEquipeSupp($ID);
// supprime l'equipe
$equipe->SuppUneEquipe($ID);
?>