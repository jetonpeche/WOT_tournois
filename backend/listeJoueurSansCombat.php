<?php

require 'dialogueBD.php';
require 'header.php';

$joueur = new DialogueBD();
$liste = $joueur->ListeJoueurSansCombat();

echo json_encode($liste);

?>