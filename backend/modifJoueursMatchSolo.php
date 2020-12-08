<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$soloJson = json_decode($json);

$id = $soloJson->ID_JOUEUR;
$pts = $soloJson->POINTS_TOTAL;
$palier = $soloJson->NIVEAU_PALIER;
$victoire = $soloJson->VICTOIRE;
$defaite = $soloJson->DEFAITE;


$idAdversaire = $soloJson->ID_ADVERSAIRE;
$ptsAdversaire = $soloJson->POINTS_TOTAL_ADVERSAIRE;
$palierAdversaire = $soloJson->NIVEAU_PALIER_ADVERSAIRE;
$victoireAdversaire = $soloJson->VICTOIRE_ADVERSAIRE;
$defaiteAdversaire = $soloJson->DEFAITE_ADVERSAIRE;

// convertion en string
$pts = strval($pts);
$ptsAdversaire = strval($ptsAdversaire);

$victoire = strval($victoire);
$victoireAdversaire = strval($victoireAdversaire);

$defaite = strval($defaite);
$defaiteAdversaire = strval($defaiteAdversaire);

// verifie type int à partir d'une chaine de string
if(ctype_digit($pts) && ctype_digit($ptsAdversaire) && ctype_digit($victoire) && ctype_digit($victoireAdversaire) && ctype_digit($defaite) && ctype_digit($defaiteAdversaire))
{
    $equipe = new dialogueBD();
    $equipe->ModifJoueurMatchSolo($pts, $palier, $victoire, $defaite, $id);
    $equipe->ModifJoueurMatchSolo($ptsAdversaire, $palierAdversaire, $victoireAdversaire, $defaiteAdversaire, $idAdversaire);
}
else
{
    echo json_encode(false);
}


?>