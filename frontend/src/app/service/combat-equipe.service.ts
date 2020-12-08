import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombatEquipe } from '../model/combatEquipe';
import { RouteAPIService } from './route-api.service';

@Injectable({
  providedIn: 'root'
})
export class CombatEquipeService {

  constructor(private http: HttpClient, private route: RouteAPIService) { }

  ListeMatchEquipe(): Observable<CombatEquipe[]>
  {
    return this.http.get<CombatEquipe[]>(`${this.route.PHP_API}/listeMatchEquipe.php`);
  }

  PasseManche(equipe): Observable<any>
  {
    return this.http.post<any>(`${this.route.PHP_API}/passeManche.php`, equipe);
  }

  ModifierPalierPointsEquipe(form): Observable<any>
  {
    return this.http.post<any>(`${this.route.PHP_API}/ModifierPalierPointsEquipe.php`, form);
  }

  SuppMatchEquipe(info): Observable<CombatEquipe>
  {
    return this.http.post<CombatEquipe>(`${this.route.PHP_API}/suppMatchEquipe.php`, info);
  }

  SuppAllMatchEquipe(): Observable<CombatEquipe>
  {
    return this.http.get<CombatEquipe>(`${this.route.PHP_API}/suppAllMatchEquipe.php`);
  }

}
