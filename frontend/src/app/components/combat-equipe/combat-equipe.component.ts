import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/model/joueur';
import { EquipeService } from 'src/app/service/equipe.service';
import { Equipe } from 'src/app/model/equipe';
import { CarteService } from 'src/app/service/carte.service';
import { CombatEquipeService } from 'src/app/service/combat-equipe.service';

@Component({
  selector: 'app-combat-equipe',
  templateUrl: './combat-equipe.component.html',
  styleUrls: ['./combat-equipe.component.css']
})
export class CombatEquipeComponent implements OnInit {

  listeJoueurSansEquipe: Joueur[];
  listeEquipeSansMatch: Equipe[] = [];
  listeEquipe: Equipe[];
  listeJoueurEquipe: any[];

  // ------------- equipe matchmaking ------------------ //
  private nb: number;
  private nbCarte: number;
  private resultat: number;
  differencePalier: number;

  listeCarteModeStandard: any[] = [];
  listeCarteModeAssaut: any[] = [];
  listeEquipeAdverse: any[] = [];

  equipeSelectionne: Equipe = { ID: null, NOM_EQUIPE: null, POINTS_TOTAL_EQUIPE: null, NIVEAU_PALIER: null };
  equipeTireAuSort: Equipe = { ID: null, NOM_EQUIPE: null, POINTS_TOTAL_EQUIPE: null, NIVEAU_PALIER: null };

  carteTireAuSortPetiteEquipe: any = { ID: null, LIBELLE: null };
  carteTireAuSortGrandeEquipe: any = { ID: null, LIBELLE: null };

  // ------------- variables information ----------------- //
  erreurHttp: boolean = false;
  ajoutSucces: boolean = false;
  suppSucces: boolean = false;
  echecAjout: boolean = false;

  constructor(private joueur: EquipeService, private carte: CarteService, private cbtEquipe: CombatEquipeService) { }

  ngOnInit()
  {
    this.ListeEquipe();
    this.ListeJoueurSansEquipe();
    this.ListeEquipeSansMatchOnInit();
    this.ListeCarte();
  }

  onAjouterJoueurEquipe(form)
  {
    this.joueur.AjouterJoueurEquipe(form.value).subscribe(
      (liste) =>
      {
        this.listeJoueurSansEquipe = liste;
        this.ajoutSucces = true;
        setTimeout(() => {
          this.ajoutSucces = false;
        }, 3000);

        this.onCompositionEquipe(form.value['equipe']);
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  onCompositionEquipe(idEquipe)
  {
    this.joueur.CompositionEquipe(idEquipe).subscribe(
      (liste) =>
      {
        this.listeJoueurEquipe = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  onSuppJoueurEquipe(joueur)
  {
    this.joueur.SupprimerJoueurEquipe(joueur).subscribe(
      (liste) =>
      {
        this.listeJoueurEquipe = liste;
        this.ListeJoueurSansEquipe();
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  onAjouterEquipe(equipe)
  {
    this.joueur.AjouterEquipe(equipe.value).subscribe(
      (ok) =>
      {
        if(ok == true)
        {
          this.ListeEquipe();
          this.ListeEquipeSansMatchOnInit();

          this.ajoutSucces = true;
          setTimeout(() => {
            this.ajoutSucces = false;
          }, 2000);
        }
        // si une equipe a le meme nom
        else
        {
          this.echecAjout = true;
          setTimeout(() => {
            this.echecAjout = false;
          }, 3000);
        }
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      }
    )
  }

  onSupprimerEquipe(equipe)
  {
    if(confirm("Comfirmation de la suppression de l'equipe: " + equipe.NOM_EQUIPE))
    {
      this.joueur.SupprimerEquipe(equipe).subscribe(
        () =>
        {
          this.ListeEquipe();
          this.ListeEquipeSansMatch();

          // vide la liste des joueurs de l'equipe supprime
          this.listeJoueurEquipe = [];

          this.suppSucces = true;
          setTimeout(() => {
            this.suppSucces = false;
          }, 2000);
        },
        () =>
        {
          this.erreurHttp = true;
          setTimeout(() => {
            this.erreurHttp = false;
          }, 3000);
        }
      )
    }
  }

  onInfoEquipe(form)
  {
    this.joueur.InfosEquipe(form.value).subscribe(
      (equipe) =>
      {        
        this.equipeSelectionne = equipe;
        this.ChoisiEquipeAdverse(form.value["premierMatch"], form.value["equipePetite"]);
        this.ListeEquipeSansMatch();
      }
    )
  }

  DerniereEquipe()
  {
    if(this.listeEquipeSansMatch.length == 1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  onPasseManche(equipe)
  {
    this.cbtEquipe.PasseManche(equipe.value).subscribe(
      () =>
      {
        this.listeEquipeSansMatch = [];
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  private ChoisiEquipeAdverse(premierMatch, petiteEquipe)
  {
    const a = petiteEquipe;

    if(premierMatch == "Oui")
    {
      // creer une liste de joueur sans le joueur selectionné
      for (let index = 0; index < this.listeEquipeSansMatch.length; index++) {
        const element = this.listeEquipeSansMatch[index];

        if(element.ID != this.equipeSelectionne.ID)
        {
          this.listeEquipeAdverse.push(
            {
              ID: element.ID,
              NOM_EQUIPE: element.NOM_EQUIPE
            });
        }
      }

      // genere un nb aleatoire et defini l'adversaire
      const nb = Math.floor(Math.random() * (this.listeEquipeAdverse.length - 0)) + 0;
      this.equipeTireAuSort = this.listeEquipeAdverse[nb];

      //choisi carte aleatoire si elle est pas choisi et c'est une petite equipe
      if(this.carteTireAuSortPetiteEquipe.ID == null && petiteEquipe == "Oui")
      {
        this.TirageDeLaCarte(petiteEquipe);
      }
      //choisi carte aleatoire si elle est pas choisi et c'est une grande equipe
      else if(this.carteTireAuSortGrandeEquipe.ID == null && petiteEquipe == "Non")
      {
        this.TirageDeLaCarte(petiteEquipe);
      }
      
      
      // enregistre le combat des deux equipe si petite equipe
      if(this.carteTireAuSortPetiteEquipe.ID != null)
      {
        this.EnregistreEquipeCombat(this.equipeSelectionne.ID, this.equipeTireAuSort.ID, this.carteTireAuSortPetiteEquipe.ID);
      }
      // c'est une grande equipe
      else if(this.carteTireAuSortGrandeEquipe.ID != null)
      {
        this.EnregistreEquipeCombat(this.equipeSelectionne.ID, this.equipeTireAuSort.ID, this.carteTireAuSortGrandeEquipe.ID);
      }
      

      // vide les liste
      this.listeEquipeAdverse = [];

       // actualise la liste
       this.ListeEquipeSansMatch();
    }
    else if(premierMatch == "Non")
    {
      // interval
      const min: number = 0;
      const max: number = 155;


      // genere un nb aleatoire [0; 155[
      this.nb = Math.floor(Math.random() * (max - min)) + min;

      // 7%
      if(this.nb <= 6)
      {
        this.differencePalier = -3;
      }
      // 18%
      else if(this.nb >= 7 && this.nb <= 25)
      {     
        this.differencePalier = -2;
      }
      // 25%
      else if(this.nb >= 26 && this.nb <= 51)
      {
        this.differencePalier = -1;
      }
      // 50%
      else if(this.nb >= 52 && this.nb <= 102)
      {
        this.differencePalier = 0;
      }
      // 25%
      else if(this.nb >= 103 && this.nb <= 128)
      {
        this.differencePalier = 1;
      }
      // 18%
      else if(this.nb >= 129 && this.nb <= 147)
      {
        this.differencePalier = 2;
      }
      // 7%
      else if(this.nb >=148)
      {
        this.differencePalier = 3;
      }

      // palier tire au sort Negatif
      if(this.differencePalier < 0)
      {
        this.resultat = +this.equipeSelectionne.NIVEAU_PALIER + +this.differencePalier;
      }
      // palier tire au sort Positif
      else if(this.differencePalier > 0)
      {
        this.resultat = +this.equipeSelectionne.NIVEAU_PALIER + +this.differencePalier;
      }
      // palier tire au sort 0
      else if(this.differencePalier == 0)
      {
        this.resultat = +this.equipeSelectionne.NIVEAU_PALIER;
      }

      // cree une liste de joueur avec le meme palier que le joueur selectionné
      for (let index = 0; index < this.listeEquipeSansMatch.length; index++) 
      {
        const element = this.listeEquipeSansMatch[index];

        // ajout dans la liste si la palier genere est identique au palier de l'equipe
        // ne peut ajouter l'equipe actuel
        if(this.resultat == element.NIVEAU_PALIER && element.ID != this.equipeSelectionne.ID)
        {
          this.listeEquipeAdverse.push(
            { 
              ID: element.ID, 
              NOM: element.NOM_EQUIPE
            });
        }
      }

      // si la liste des equipe adverse n'est pas vide
      if(this.listeEquipeAdverse.length != 0)
      {
        // genere un nb aleatoire et defini l'adversaire
        const nb = Math.floor(Math.random() * (this.listeEquipeAdverse.length - 0)) + 0;
        this.equipeTireAuSort = this.listeEquipeAdverse[nb];

      //choisi carte aleatoire si c'est une petite equipe et que la carte est pas encore choisi
      if(this.carteTireAuSortPetiteEquipe.ID == null && petiteEquipe == "Oui")
      {
        this.TirageDeLaCarte(petiteEquipe);
      }
      // choisi une carte si c'est une grande equipe et que la carte est pas choisi
      else if(this.carteTireAuSortGrandeEquipe.ID == null && petiteEquipe == "Non")
      {
        this.TirageDeLaCarte(petiteEquipe);
      }
      
      // enregistre le combat des deux equipe si petite equipe
      if(this.carteTireAuSortPetiteEquipe.ID != null)
      {
        this.EnregistreEquipeCombat(this.equipeSelectionne.ID, this.equipeTireAuSort.ID, this.carteTireAuSortPetiteEquipe.ID);
      }
      // c'est une grande equipe
      else if(this.carteTireAuSortGrandeEquipe.ID != null)
      {
        this.EnregistreEquipeCombat(this.equipeSelectionne.ID, this.equipeTireAuSort.ID, this.carteTireAuSortGrandeEquipe.ID);
      }

      // vide la liste
       this.listeEquipeAdverse = [];

        // actualise la liste
        this.ListeEquipeSansMatch();

      }
      else
      {
        this.ChoisiEquipeAdverse("Non", a);
      }
    }
  }

  private TirageDeLaCarte(petiteEquipe)
  {
    if(petiteEquipe == "Oui")
    {
      // genere un nb aleatoire et choisi une carte aleatoirement
      this.nbCarte = Math.floor(Math.random() * (this.listeCarteModeStandard.length - 0)) + 0;
      this.carteTireAuSortPetiteEquipe = this.listeCarteModeStandard[this.nbCarte];
    }
    else
    {
      // genere un nb aleatoire et choisi une carte aleatoirement
      this.nbCarte = Math.floor(Math.random() * (this.listeCarteModeAssaut.length - 0)) + 0;
      this.carteTireAuSortGrandeEquipe = this.listeCarteModeAssaut[this.nbCarte];
    }

  }

  private EnregistreEquipeCombat(idEquipe1, idEquipe2, idCarte)
  {
    this.joueur.EnregistreCombatEquipe(idEquipe1, idEquipe2, idCarte).subscribe(
      () =>
      {
        this.ajoutSucces = true;
        setTimeout(() => {
          this.ajoutSucces = false;
        }, 2000);
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000); 
      });
  }

  private ListeCarte()
  {
    // mode standard
      this.carte.ListeCarteModeStandard().subscribe(
        (liste) =>
        {
          this.listeCarteModeStandard = liste;
        },
        () =>
        {
          this.erreurHttp = true;
          setTimeout(() => {
                this.erreurHttp = false;
          }, 3000);
        });

    // mode assaut
      this.carte.ListeCarteModeAssaut().subscribe(
        (liste) =>
        {
          this.listeCarteModeAssaut = liste;
        },
        () =>
        {
          this.erreurHttp = true;
          setTimeout(() => {
                this.erreurHttp = false;
          }, 3000);
        });
  }

  private ListeJoueurSansEquipe()
  {
    this.joueur.ListeJoueurSansEquipe().subscribe(
      (liste) =>
      {
        this.listeJoueurSansEquipe = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  private ListeEquipe()
  {
    this.joueur.ListeEquipe().subscribe(
      (liste) =>
      {
        this.listeEquipe = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  private ListeEquipeSansMatchOnInit()
  {
    this.joueur.ListeEquipeSansMatch().subscribe(
      (liste) =>
      {
        if(liste.length > 1)
          this.listeEquipeSansMatch = liste;
      }, 
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  private ListeEquipeSansMatch()
  {
    // si la liste est > 1 on rafraichi la liste
    if(this.listeEquipeSansMatch.length > 1)
    {
      this.joueur.ListeEquipeSansMatch().subscribe(
        (liste) =>
        {
          this.listeEquipeSansMatch = liste;
        }, 
        () =>
        {
          this.erreurHttp = true;
          setTimeout(() => {
            this.erreurHttp = false;
          }, 3000);
        });
    }
    // sinon vide la liste
    else
    {
      this.listeEquipeSansMatch = [];
    }
  }
}