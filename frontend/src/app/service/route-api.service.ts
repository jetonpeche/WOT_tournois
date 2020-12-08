import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteAPIService {

    PHP_API: string = "https://wot-tournois.000webhostapp.com/backend";
    //PHP_API: string = "http://127.0.0.1/angularWOT_tournois/backend";

  constructor() { }
}
