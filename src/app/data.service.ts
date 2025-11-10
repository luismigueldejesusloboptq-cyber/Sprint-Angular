import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Importamos os nomes corretos que estão DENTRO dos arquivos
import { VehicleModel } from './home/interfaces/vehicle-model.interface';
import { VehicleData } from './home/interfaces/vehicle-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // MUDANÇA AQUI: Trocamos 'Vehicle' por 'VehicleModel'
  getVehicles(): Observable<VehicleModel[]> {
    
    // MUDANÇA AQUI: Trocamos 'Vehicle' por 'VehicleModel'
    return this.http.get<{ vehicles: VehicleModel[] }>(`${this.apiUrl}/vehicles`).pipe(
      map(response => response.vehicles)
    );
  }

  // Esta parte já estava certa e vai funcionar
  // assim que você renomear o arquivo 'vehicle-data.interface.ts'
  getVehicleData(vin: string): Observable<VehicleData> {
    
    return this.http.post<VehicleData>(`${this.apiUrl}/vehicleData`, { vin });
  }
}