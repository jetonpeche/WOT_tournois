<?php
class Connexion
{
    private $cnx = null;
    private $dbhost;
    private $dbbase;
    private $dbuser;
    private $dbpwd;
    
    public static function getConnexion()
    {
        /* Information de la bdd */
        $dbhost = 'localhost';
        $dbbase = 'wot_tournois';
        $dbuser = 'root';
        $dbpwd = '';
        try
        {
            $cnx = new PDO("mysql:host=$dbhost;dbname=$dbbase", $dbuser, $dbpwd);
            $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $cnx->exec('SET CHARACTER SET utf8');
        }
        catch(PDOException $e)
        {
            $erreur = $e->getMessage();
            
        }return $cnx;
        
    }
    public static function deConnexion()
    {
        try
        {
            $cnx = null;
        }
        catch(PDOException $e)
        {
            $erreur = $e->getMessage();            
        }
    }
}
