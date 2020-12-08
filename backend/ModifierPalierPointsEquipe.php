<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$equipeJson = json_decode($json);

$idEquipe = $equipeJson->ID;
$idAdverse = $equipeJson->ID_ADVERSE;

$pts = $equipeJson->POINTS_TOTAL_EQUIPE;
$ptsAdverse = $equipeJson->POINTS_TOTAL_EQUIPE_ADVERSE;

$palier = $equipeJson->NIVEAU_PALIER;
$palierAdverse = $equipeJson->NIVEAU_PALIER_ADVERSE;

// convertion en string
$pts = strval($pts);
$ptsAdverse = strval($ptsAdverse);

// verifie type int à partir d'une chaine de string
if(ctype_digit($pts) && ctype_digit($ptsAdverse))
{
    $equipe = new dialogueBD();
    $equipe->ModifPtsPalierEquipe($pts, $palier, $idEquipe);
    $equipe->ModifPtsPalierEquipe($ptsAdverse, $palierAdverse, $idAdverse);
}
else
{
    echo json_encode(false);
}


?>