<?php
require 'dialogueBD.php';
require 'header.php';

    $cartes = new DialogueBD();
    $liste = $cartes->ListeCarteModeStandard();

    echo json_encode($liste);
?>