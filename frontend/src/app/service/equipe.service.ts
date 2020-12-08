import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joueur } from '../model/joueur';
import { HttpClient } from '@angular/common/http';
import { Equipe } from '../model/equipe';
import { RouteAPIService } from './route-api.service';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private http: HttpClient, private route: RouteAPIService) { }

  ListeJoueurSansEquipe(): Observable<Joueur[]>
  {
    return this.http.get<Joueur[]>(`${this.route.PHP_API}/listeJoueurSansEquipe.php`);
  }

  ListeEquipe(): Observable<Equipe[]>
  {
    return this.http.get<Equipe[]>(`${this.route.PHP_API}/listeEquipe.php`);
  }

  ListeEquipeSansMatch(): Observable<any>
  {
    return this.http.get<any>(`${this.route.PHP_API}/listeEquipeSansMatch.php`);
  }

  InfosEquipe(form): Observable<Equipe>
  {
    return this.http.post<Equipe>(`${this.route.PHP_API}/InfosEquipe.php`, form);
  }

  CompositionEquipe(idEquipe): Observable<Joueur[]>
  {
    return this.http.get<Joueur[]>(`${this.route.PHP_API}/compositionEquipe.php?idE=${idEquipe}`);
  }

  AjouterJoueurEquipe(infos): Observable<Joueur[]>
  {
    return this.http.post<Joueur[]>(`${this.route.PHP_API}/ajouterJoueurEquipe.php`, infos);
  }

  AjouterEquipe(equipe): Observable<any>
  {
    return this.http.post<string>(`${this.route.PHP_API}/ajouterEquipe.php`, equipe);
  }

  SupprimerJoueurEquipe(joueur): Observable<Joueur[]>
  {
    return this.http.post<Joueur[]>(`${this.route.PHP_API}/suppJoueurEquipe.php`, joueur);
  }

  SupprimerEquipe(equipe): Observable<any>
  {
    return this.http.post<Equipe>(`${this.route.PHP_API}/suppEquipe.php`, equipe);
  }

  EnregistreCombatEquipe(idEquipe1, idEquipe2, idCarte): Observable<string>
  {
    return this.http.get<string>(`${this.route.PHP_API}/ajouterCombat.php?idE1=${idEquipe1}&idE2=${idEquipe2}&idC=${idCarte}`);
  }
}