<?php
require 'dialogueBD.php';
require 'header.php';

    $cartes = new DialogueBD();
    $liste = $cartes->ListeCarte();

    echo json_encode($liste);
?>