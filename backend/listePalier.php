<?php
require 'dialogueBD.php';
require 'header.php';

$palier = new DialogueBD();
$liste = $palier->ListePalier();

echo json_encode($liste);
?>