<?php
require 'dialogueBD.php';
require 'header.php';

    $equipe = new DialogueBD();
    $liste = $equipe->ListeEquipeSansMatch();

    echo json_encode($liste);
?>