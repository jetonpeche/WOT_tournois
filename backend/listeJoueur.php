<?php
    require 'dialogueBD.php';
    require 'header.php';

    $joueur = new dialogueBD();

    $liste = $joueur->ListeJoueur();

    echo json_encode($liste);

?>