<?php
require 'dialogueBD.php';
require 'header.php';

    $cartes = new DialogueBD();
    $liste = $cartes->ListeCarteModeAssaut();

    echo json_encode($liste);
?>