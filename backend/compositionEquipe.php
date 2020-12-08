<?php
require 'dialogueBD.php';
require 'header.php';

$idEquipe = $_GET['idE'];

$carte = new dialogueBD();
$liste = $carte->CompositionEquipe($idEquipe);

echo json_encode($liste);

?>