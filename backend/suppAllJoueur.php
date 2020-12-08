<?php
require 'dialogueBD.php';
require 'header.php';

$joueur = new DialogueBD();

$joueur->SuppAllMatchSolo();

// supprimer tous les joueurs
$joueur->SuppAllJoueur();
?>