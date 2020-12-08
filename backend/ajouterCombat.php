<?php

require 'dialogueBD.php';
require 'header.php';

if(!empty($_GET['idJ']) && !empty($_GET['idA']) && !empty($_GET['idC']))
{
    $idJ = $_GET['idJ'];
    $idA = $_GET['idA'];
    $idCarte = $_GET['idC'];

    $joueur = new DialogueBD();

    $joueur->AjouteCombatSolo($idJ, $idA, $idCarte);

    echo json_encode(true);
}
else if(!empty($_GET['idE1']) && !empty($_GET['idE2']) && !empty($_GET['idC']))
{
    $idEquipe1 = $_GET['idE1'];
    $idEquipe2 = $_GET['idE2'];
    $idCarte = $_GET['idC'];

    $joueur = new DialogueBD();
    $joueur->AjouteCombatEquipe($idEquipe1, $idEquipe2, $idCarte);

    echo json_encode(true);
}
