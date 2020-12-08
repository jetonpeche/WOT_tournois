import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Palier } from '../model/Palier';
import { RouteAPIService } from './route-api.service';

@Injectable({
  providedIn: 'root'
})
export class PalierService {

  constructor(private http: HttpClient, private route: RouteAPIService) { }

  ListePalier(): Observable<Palier[]>
  {
    return this.http.get<Palier[]>(`${this.route.PHP_API}/listePalier.php`);
  }
}
