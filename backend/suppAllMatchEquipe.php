<?php
require 'dialogueBD.php';
require 'header.php';

$equipe = new DialogueBD();

// supprimer tous les matchs d'equipe
$equipe->SuppAllMatchEquipe();
?>