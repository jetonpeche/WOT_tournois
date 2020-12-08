import { Component, OnInit } from '@angular/core';
import { CombatEquipeService } from 'src/app/service/combat-equipe.service';
import { CombatEquipe } from 'src/app/model/combatEquipe';
import { PalierService } from 'src/app/service/palier.service';
import { Palier } from 'src/app/model/Palier';
import { CombatSoloService } from 'src/app/service/combat-solo.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  listePalier: Palier[];

  // ------------------ EQUIPE -------------------- //
  listeMatchEquipe: CombatEquipe[];

  matchEquipeSelectionne: any = 
  { 
    ID: null, NOM_EQUIPE: null, NIVEAU_PALIER: null, POINTS_TOTAL_EQUIPE: null,
    ID_ADVERSE: null, NOM_EQUIPE_ADVERSE: null, NIVEAU_PALIER_ADVERSE: null, POINTS_TOTAL_EQUIPE_ADVERSE: null,
    LIBELLE: null 
  };

  // --------------- SOLO ----------------------- //
  listeMatchSolo: any[];

  matchSoloSelectionne: any = 
  {
    ID: null, NOM: null, VICTOIRE: null, DEFAITE: null, POINTS_TOTAL: null, NIVEAU_PALIER: null,
    ID_ADVERSAIRE: null, NOM_ADVERSAIRE: null, VICTOIRE_ADVERSAIRE: null, DEFAITE_ADVERSAIRE: null, POINTS_TOTAL_ADVERSAIRE: null, NIVEAU_PALIER_ADVERSAIRE: null,
    LIBELLE: null
  }

  matchEquipe: boolean = true;

  erreurHttp: boolean = false;
  erreurModif: boolean = false;
  succesModif: boolean = false;

  constructor(private combatEquipe: CombatEquipeService, private combatSolo: CombatSoloService, private palier: PalierService) { }

  ngOnInit()
  {
    this.ListeMatchEquipe();
    this.ListeMatchSolo();

    this.palier.ListePalier().subscribe(
      (liste) =>
      {
        this.listePalier = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  // ---------------------- EQUIPE ---------------------- //

  onSelectionnerMatch(infos)
  {
    this.matchEquipeSelectionne = infos;
  }

  onModifierPalierPointsEquipe(form)
  {
    this.combatEquipe.ModifierPalierPointsEquipe(form.value).subscribe(
      (ok) =>
      {
        if(ok == false)
        {
          this.erreurModif = true;
          setTimeout(() => {
            this.erreurModif = false;
          }, 3000);
        }
        else
        {
          this.succesModif = true;
          setTimeout(() => {
            this.succesModif = false;
          }, 2000);
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

  onSuppMatchEquipe(match)
  {
    if(confirm("Confirmation, suppression du match: " + match.NOM_EQUIPE + " VS " + match.NOM_EQUIPE_ADVERSE))
    {
      this.combatEquipe.SuppMatchEquipe(match).subscribe(
        () =>
        {
          this.ListeMatchEquipe();
        },
        () =>
        {
          this.erreurHttp = true;
          setTimeout(() => {
            this.erreurHttp = false;
          }, 3000);
        });
    }
  }

  onSuppAllMatchEquipe()
  {
    if(confirm("Confirmation, vous etes sur le points de supprimer TOUTS les matchs d'equipe"))
    {
      this.combatEquipe.SuppAllMatchEquipe().subscribe(
        () =>
        {
          this.listeMatchEquipe = [];
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

// ---------------------- SOLO ---------------------- //

  onSuppMatchSolo(info)
  {
    if(confirm("Confirmation, vous allez supprimer le match: " + info.NOM + " VS " + info.NOM_ADVERSAIRE))
    {
      this.combatSolo.SuppMatchSolo(info).subscribe(
      () =>
      {
        this.ListeMatchSolo();
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
    }
  }

  onSelectionnerMatchSolo(info)
  {
    this.matchSoloSelectionne = info;
  }

  // modifie les V / D pts et palier des joueurs d'un match
  onModifierInfoJoueurMatchSolo(form)
  {
    console.log(form.value);
   this.combatSolo.ModifierJoueursMatchSolo(form.value).subscribe(
      (ok) =>
      {
        if(ok == false)
        {
          this.erreurModif = true;
          setTimeout(() => {
            this.erreurModif = false;
          }, 3000);
        }
        else
        {
          this.succesModif = true;
          setTimeout(() => {
            this.succesModif = false;
          }, 3000);
        }
      },
      (e) =>
      {
        console.log(e);
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  onSuppAllMatchSolo()
  {
    if(confirm("Confirmation, vous etes sur le points de supprimer TOUTS les matchs solo"))
    {
      this.combatSolo.SuppAllMatchSolo().subscribe(
        () =>
        {
          this.listeMatchSolo = [];
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

  // ---------------------- AUTRES ---------------------- //

  onChangerListe()
  {
    this.matchEquipe = !this.matchEquipe;
  }

  private ListeMatchEquipe()
  {
    this.combatEquipe.ListeMatchEquipe().subscribe(
      (liste) =>
      {
        this.listeMatchEquipe = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  private ListeMatchSolo()
  {
    this.combatSolo.ListeMatchSolo().subscribe(
      (liste) =>
      {
        this.listeMatchSolo = liste;
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
