<?php
require 'dialogueBD.php';
require 'header.php';

$cbtSolo = new DialogueBD();
$liste = $cbtSolo->ListeMatchSolo();

echo json_encode($liste);
?>