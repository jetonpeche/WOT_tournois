<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$joueurJson = json_decode($json);

$id = $joueurJson->ID;
$clan = $joueurJson->MEMBRE_CLAN;
$don = $joueurJson->DON;
$pts = $joueurJson->POINTS_TOTAL;

// convertion en string
$pts = strval($pts);

// verifie type int à partir d'une chaine de string
if(ctype_digit($pts))
{
    $joueur = new dialogueBD();
    $joueur->ModifJoueur($clan, $don, $pts, $id);
}
else
{
    echo json_encode(false);
}