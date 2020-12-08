<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$equipeJson = json_decode($json);

$idEquipe = $equipeJson->equipe;

$equipe = new dialogueBD();
$uneEquipe = $equipe->InfosEquipe($idEquipe);

echo json_encode($uneEquipe);

?>