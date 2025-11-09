import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Vamos precisar disso

// Definindo uma interface (um "molde") para o Veículo
// Isso ajuda o Angular a entender os dados que chegam
export interface Vehicle {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // O endereço da "cozinha" (API)
  private apiUrl = 'http://localhost:3001';

  // Pedimos ao Angular para nos dar a ferramenta HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Esta função busca a LISTA de veículos (Passo 8)
   */
  getVehicles(): Observable<Vehicle[]> {
    // A API da cozinha (localhost:3001/vehicles) nos dá um objeto { vehicles: [...] }
    // Nós queremos apenas o array [...], por isso usamos o .pipe(map(...))
    return this.http.get<{ vehicles: Vehicle[] }>(`${this.apiUrl}/vehicles`).pipe(
      map(response => response.vehicles) // "Descasca" o objeto e devolve só o array
    );
  }

  /**
   * Esta função busca os dados de UM veículo (Passo 11)
   */
  getVehicleData(vin: string): Observable<any> {
    // A API da cozinha (localhost:3001/vehicleData) espera um { vin: "..." }
    return this.http.post(`${this.apiUrl}/vehicleData`, { vin });
  }
}
