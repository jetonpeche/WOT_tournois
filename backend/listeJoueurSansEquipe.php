<?php
require 'dialogueBD.php';
require 'header.php';

$joueur = new DialogueBD();
$liste = $joueur->ListeJoueurSansEquipe();

echo json_encode($liste);

?>