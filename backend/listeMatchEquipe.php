<?php
require 'dialogueBD.php';
require 'header.php';

$cbtEquipe = new DialogueBD();
$liste = $cbtEquipe->ListeMatchEquipe();

echo json_encode($liste);
?>