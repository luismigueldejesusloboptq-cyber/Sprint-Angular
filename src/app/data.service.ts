import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Importar as interfaces corretas
import { VehicleModel } from './home/interfaces/vehicle-model.interface';
import { VehicleData } from './home/interfaces/vehicle-data.interface';

// Interface para o wrapper da API de veículos
export interface VehicleApiResponse {
  vehicles: VehicleModel[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001'; // A URL da sua API

  constructor() { }

  // Busca a lista de modelos (Ranger, Mustang, etc.)
  getVehicles(): Observable<VehicleModel[]> {
    return this.http.get<VehicleApiResponse>(`${this.apiUrl}/vehicles`).pipe(
      // Sua API retorna { vehicles: [...] }, então usamos 'map' para extrair o array
      map(response => response.vehicles) 
    );
  }

  // Busca os dados da tabela (odômetro, combustível, etc.)
  getVehicleData(vin: string): Observable<VehicleData> {
    // Usamos POST, como no seu server.js
    return this.http.post<VehicleData>(`${this.apiUrl}/vehicleData`, { vin: vin });
  }
}