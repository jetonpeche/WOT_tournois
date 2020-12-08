<?php

require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$equipeJson = json_decode($json);

$nomEquipe_secu = strip_tags($equipeJson->nom);

if($nomEquipe_secu != null && $nomEquipe_secu != "")
{
    $equipe = new dialogueBD();

    // verifie que il n'y a pas deux fois le meme nom d'équipe
    if($equipe->VerifierEquipe($nomEquipe_secu))
    {
        $equipe->AjouterEquipe($nomEquipe_secu);
        echo json_encode(true);
    }
    // le nom existe deja
    else
    {
        echo json_encode(false);
    }
}