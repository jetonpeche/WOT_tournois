import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// guard
import { AuthGuard } from './guard/auth.guard';

// service
import { ConnexionService } from './service/connexion.service';
import { JoueurService } from './service/joueur.service';
import { CarteService } from './service/carte.service';
import { EquipeService } from './service/equipe.service';
import { CombatEquipeService } from './service/combat-equipe.service';
import { PalierService } from './service/palier.service';
import { CombatSoloService } from './service/combat-solo.service';
import { RouteAPIService } from './service/route-api.service';

// components
import { AppComponent } from './app.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { BarMenuComponent } from './components/bar-menu/bar-menu.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CarteComponent } from './components/carte/carte.component';
import { JoueurComponent } from './components/joueur/joueur.component';
import { CombatSoloComponent } from './components/combat-solo/combat-solo.component';
import { CombatEquipeComponent } from './components/combat-equipe/combat-equipe.component';
import { MatchComponent } from './components/match/match.component';
import { VueParticipantsComponent } from './components/vue-participants/vue-participants.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    BarMenuComponent,
    AccueilComponent,
    CarteComponent,
    JoueurComponent,
    CombatSoloComponent,
    CombatEquipeComponent,
    MatchComponent,
    VueParticipantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard, ConnexionService, JoueurService, CarteService, EquipeService, CombatEquipeService, CombatSoloService, PalierService, RouteAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
