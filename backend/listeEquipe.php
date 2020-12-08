<?php
require 'dialogueBD.php';
require 'header.php';

    $cartes = new DialogueBD();
    $liste = $cartes->ListeEquipe();

    echo json_encode($liste);
?>