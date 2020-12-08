<?php
require 'dialogueBD.php';
require 'header.php';

$json = file_get_contents('php://input'); // Récupération du flux JSON

$equipeJson = json_decode($json);

$id = $equipeJson->equipe;

$equipe = new dialogueBD();

$equipe->PasseManche($id);