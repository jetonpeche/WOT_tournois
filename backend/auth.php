<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$monoJson = json_decode($json);

if($monoJson != null)
{

    $login = $monoJson->log;
    $pwd = $monoJson->pwd;

    // protection faille XSS et CRLF
    $login_secu = strip_tags($login);
    $login_secu = str_replace(array("\n", "\r", PHP_EOL), '', $login_secu);

    $unMono = new DialogueBD();

    $uneReponse = $unMono->connexion($login);

    // log erroner
    if($uneReponse != null && password_verify($pwd, $uneReponse->PWD))
    {
        // date heure systeme
        $dateHeure = date('Y-m-d H:i:s');
        
        $unMono->AjoutHistoriqueConnexion($uneReponse->ID, $dateHeure);
        echo json_encode(true);
    }
    else
    {
        echo json_encode(false);
    }
}