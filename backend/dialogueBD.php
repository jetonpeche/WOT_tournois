<?php
require_once 'connexion.php';

class DialogueBD
{   
    public function connexion($log)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM admin WHERE LOGIN = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($log));

        $moniteur = $sth->fetchObject();
        return $moniteur;
    }

    public function AjoutHistoriqueConnexion($id, $dateHeure)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO historiqueconnexion (ID_ADMIN, DATEHEURE) VALUES (?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id, $dateHeure));
    }

    /* -------------------------------  JOUEUR  ---------------------------------- */

    public function ListeJoueur()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT j.ID, NOM, WIN8, VICTOIRE, DEFAITE, POINTS_TOTAL, MEMBRE_CLAN, DON, p.LIBELLE, NOM_EQUIPE 
                FROM joueur j LEFT JOIN equipe e ON j.ID_EQUIPE = e.ID 
                JOIN palier p ON p.NIVEAU = j.NIVEAU_PALIER
                ORDER BY NOM, j.NIVEAU_PALIER";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function ListeJoueurSansCombat()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM joueur WHERE ID NOT IN (SELECT ID_ADVERSAIRE FROM combatsolo) AND ID NOT IN (SELECT ID_JOUEUR FROM combatsolo)";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste; 
    }

    public function AjouterJoueur($nom, $win8, $palier, $don, $membreClan)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO joueur(NOM, WIN8, NIVEAU_PALIER, DON, MEMBRE_CLAN) VALUES (?, ?, ?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom, $win8, $palier, $don, $membreClan));
    }

    public function RechercheJoueur($nom)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM joueur WHERE NOM LIKE ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array("%$nom%"));

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function InfosJoueur($id)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT ID, NOM, NIVEAU_PALIER FROM joueur WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));

        $liste = $sth->fetchObject();
        return $liste;
    }

    public function ModifJoueur($clan, $don, $pts, $id)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE joueur SET MEMBRE_CLAN = ?, DON = ?, POINTS_TOTAL = ? WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($clan, $don, $pts, $id));
    }

    public function SuppAllJoueur()
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM joueur";
        $sth = $conn->prepare($sql);
        $sth->execute();
    }

    public function SuppJoueur($id)
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM joueur WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }

    public function SuppMatchJoueur($id, $idA)
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM combatsolo WHERE ID_JOUEUR = ? OR ID_ADVERSAIRE = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id, $idA));
    }

    /* -------------------------------  EQUIPE  ---------------------------------- */  

    public function ListeJoueurSansEquipe()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT ID, NOM, NIVEAU_PALIER FROM joueur WHERE ID_EQUIPE is null";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste; 
    }

    public function ListeEquipeSansMatch()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM equipe WHERE ID NOT IN (SELECT ID_EQUIPE FROM combatequipe) AND ID NOT IN (SELECT ID_EQUIPE_ADVERSE FROM combatequipe)";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste; 
    }

    public function ListeEquipe()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM equipe e JOIN palier p ON e.NIVEAU_PALIER = p.NIVEAU";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;  
    }

    public function InfosEquipe($id)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM equipe WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));

        $equipe = $sth->fetchObject();
        return $equipe;
    }

    public function CompositionEquipe($idEquipe)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT NOM, j.NIVEAU_PALIER, e.ID as idEquipe, j.ID FROM equipe e JOIN joueur j ON e.ID = j.ID_EQUIPE WHERE e.ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idEquipe));

        $liste = $sth->fetchAll();
        return $liste; 
    }

    public function AjouterJoueurEquipe($idEquipe, $idJoueur)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE joueur SET ID_EQUIPE = ? WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idEquipe, $idJoueur));
    }

    public function SuppJoueurEquipe($idJoueur)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE joueur SET ID_EQUIPE = null WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idJoueur));
    }

    // supprime les joueurs de l'equipe qui va etre supprimer
    public function SuppJoueurEquipeSupp($idEquipe)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE joueur SET ID_EQUIPE = null WHERE ID_EQUIPE = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idEquipe));
    }

    public function SuppUneEquipe($id)
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM equipe WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }

    public function VerifierEquipe($nom)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT COUNT(*) as nombre FROM equipe WHERE NOM_EQUIPE = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom));

        $liste = $sth->fetchObject();
        
        return $liste->nombre == 0 ? true : false;
    }

    public function AjouterEquipe($nom)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO equipe (NOM_EQUIPE) VALUES (?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom));
    }

    public function ModifPtsPalierEquipe($pts, $palier, $id)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE equipe SET POINTS_TOTAL_EQUIPE = ?, NIVEAU_PALIER = ? WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($pts, $palier, $id));
    }

    /* -------------------------------  COMBAT  ---------------------------------- */

    public function AjouteCombatsolo($idJ, $idA, $idCarte)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO combatsolo(ID_JOUEUR, ID_ADVERSAIRE, ID_CARTE) VALUES (?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idJ, $idA, $idCarte));
    }

    public function AjouteCombatEquipe($idequipe1, $idEquipe2, $idCarte)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO combatequipe(ID_EQUIPE, ID_EQUIPE_ADVERSE, ID_CARTE) VALUES (?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idequipe1, $idEquipe2, $idCarte));
    }

    public function PasseManche($id)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE equipe SET POINTS_TOTAL_EQUIPE = POINTS_TOTAL_EQUIPE + 1 WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }

    /* -------------------------------  COMBAT EQUIPE  ---------------------------------- */

    public function ListeMatchEquipe()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT e1.ID, e1.NOM_EQUIPE, e1.NIVEAU_PALIER, e1.POINTS_TOTAL_EQUIPE,
                       e2.ID AS ID_ADVERSE, e2.NOM_EQUIPE AS NOM_EQUIPE_ADVERSE, e2.NIVEAU_PALIER AS NIVEAU_PALIER_ADVERSE, e2.POINTS_TOTAL_EQUIPE AS POINTS_TOTAL_EQUIPE_ADVERSE,
                       carte.LIBELLE
                FROM combatequipe ce JOIN equipe e1 ON ce.ID_EQUIPE = e1.ID 
                JOIN equipe e2 ON ce.ID_EQUIPE_ADVERSE = e2.ID 
                JOIN carte ON carte.ID = ce.ID_CARTE";

        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function SuppMatchEquipe($id, $idAdverse)
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM combatequipe WHERE ID_EQUIPE = ? AND ID_EQUIPE_ADVERSE = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id, $idAdverse));
    }

    public function SuppAllMatchEquipe()
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM combatequipe";
        $sth = $conn->prepare($sql);
        $sth->execute();
    }

    /* -------------------------------  COMBAT SOLO  ---------------------------------- */

    public function ListeMatchSolo()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT j1.ID, j1.NOM, j1.VICTOIRE, j1.DEFAITE, j1.POINTS_TOTAL, j1.NIVEAU_PALIER,
                        j2.ID AS ID_ADVERSAIRE, j2.NOM AS NOM_ADVERSAIRE, j2.VICTOIRE AS VICTOIRE_ADVERSAIRE, 
                        j2.DEFAITE AS DEFAITE_ADVERSAIRE, j2.POINTS_TOTAL AS POINTS_TOTAL_ADVERSAIRE, 
                        j2.NIVEAU_PALIER AS NIVEAU_PALIER_ADVERSAIRE, carte.LIBELLE                 
                FROM combatsolo cs JOIN joueur j1 ON cs.ID_JOUEUR = j1.ID 
                JOIN joueur j2 ON cs.ID_ADVERSAIRE = j2.ID 
                JOIN carte ON carte.ID = cs.ID_CARTE";

        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function SuppMatchSolo($id, $idAdversaire)
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM combatsolo WHERE ID_JOUEUR = ? AND ID_ADVERSAIRE = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id, $idAdversaire));
    }

    public function ModifJoueurMatchSolo($pts, $palier, $victoire, $defaite, $id)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE joueur SET POINTS_TOTAL = ?, NIVEAU_PALIER = ?, VICTOIRE = ?, DEFAITE = ? WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($pts, $palier, $victoire, $defaite, $id));
    }

    public function SuppAllMatchSolo()
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM combatsolo";
        $sth = $conn->prepare($sql);
        $sth->execute();
    }

    /* -------------------------------  CARTES  ---------------------------------- */

    public function ListeCarte()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM carte ORDER BY LIBELLE";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function ListeCarteModeStandard()
    {
        $conn = Connexion::getConnexion();

        $sql = "SELECT ID, LIBELLE FROM carte WHERE MODE_STANDARD = 'Oui'";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();

        return $liste;
    }

    public function ListeCarteModeAssaut()
    {
        $conn = Connexion::getConnexion();

        $sql = "SELECT ID, LIBELLE FROM carte WHERE MODE_ASSAUT = 'Oui'";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();

        return $liste;
    }

    public function SuppUneCarte($ID)
    {
        $conn = Connexion::getConnexion();
        $sql = "DELETE FROM carte WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($ID));
    }

    public function AjouterCarte($nom, $assaut, $impromptu)
    {
        $conn = Connexion::getConnexion();
        $sql = "INSERT INTO carte (LIBELLE, MODE_ASSAUT, MODE_IMPROMPTU) VALUES(?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom, $assaut, $impromptu));
    }

    public function RechercheCarte($nom)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM carte WHERE LIBELLE LIKE ? ORDER BY LIBELLE";
        $sth = $conn->prepare($sql);
        $sth->execute(array("%$nom%"));

        $liste = $sth->fetchAll();
        return $liste;
    }

    public function InfosCarte($id)
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM carte WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));

        $liste = $sth->fetchObject();
        return $liste;
    }

    public function ModifierCarte($nom, $assaut, $impromptu, $id)
    {
        $conn = Connexion::getConnexion();
        $sql = "UPDATE carte SET LIBELLE = ?, MODE_ASSAUT = ?, MODE_IMPROMPTU = ? WHERE ID = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom, $assaut, $impromptu, $id));
    }

    /* -------------------------------  PALIER  ---------------------------------- */

    public function ListePalier()
    {
        $conn = Connexion::getConnexion();
        $sql = "SELECT * FROM palier ORDER BY NIVEAU DESC";
        $sth = $conn->prepare($sql);
        $sth->execute();

        $liste = $sth->fetchAll();
        return $liste;
    }
}