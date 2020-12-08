<?php
    require 'dialogueBD.php';
    require 'header.php';

    $json = file_get_contents('php://input'); // Récupération du flux JSON

    $joueurJson = json_decode($json);

    $nom = $joueurJson->nom;
    $win8 = $joueurJson->win8;
    $don = $joueurJson->don;
    $membre_clan = $joueurJson->clan;

    // protection faille XSS et CRLF
    $nom_secu1 = strip_tags($nom);
    $nom_secu = str_replace(array("\n", "\r", PHP_EOL), '', $nom_secu1);

    $win8_secu1 = strip_tags($win8);
    $win8_secu = str_replace(array("\n", "\r", PHP_EOL), '', $win8_secu1);

    // assignation du palier
    if($win8_secu <= 300)
    {
        $palier = 4;
    }
    else if($win8_secu >= 301 && $win8_secu <= 600)
    {
        $palier = 5;
    }
    else if($win8_secu >= 601 && $win8_secu <= 900)
    {
        $palier = 6;
    }
    else if($win8_secu >= 901 && $win8_secu <= 1200)
    {
        $palier = 7;
    }
    else if($win8_secu >= 1201 && $win8_secu <= 1500)
    {
        $palier = 8;
    }
    else if($win8_secu >= 1501 && $win8_secu <= 1800)
    {
        $palier = 9;
    }
    else if($win8_secu >= 1801 && $win8_secu <= 2100)
    {
        $palier = 10;
    }
    else if($win8_secu >= 2101 && $win8_secu <= 2400)
    {
        $palier = 11;
    }
    else if($win8_secu >= 2401)
    {
        $palier = 12;
    }

    // evite un bug qui ajoute une ligne bugger en plus
    if($nom_secu != "" && $nom_secu != null && $win8_secu != "" && $win8_secu != null)
    {
        $joueur = new DialogueBD();
        $joueur->AjouterJoueur($nom_secu, $win8_secu, $palier, $don, $membre_clan);
    
        echo json_encode(true);
    }
?>