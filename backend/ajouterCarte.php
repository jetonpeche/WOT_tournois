<?php

require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$carteJson = json_decode($json);

$nomCarte_secu = strip_tags($carteJson->nom);

$assaut = $carteJson->type2;
$impromptu = $carteJson->type3;


if($assaut == true)
{
    $assaut = "Oui";
}
else
{
    $assaut = "Non";
}

if($impromptu == true)
{
    $impromptu = "Oui";
}
else
{
    $impromptu = "Non";
}

if($nomCarte_secu != "" && $nomCarte_secu != null)
{
    $carte = new DialogueBD();
    $carte->AjouterCarte($nomCarte_secu, $assaut, $impromptu);

    $liste = $carte->ListeCarte();

    echo json_encode($liste);
}
?>