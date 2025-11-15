import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

// Importe seu serviço (verifique se o caminho ../data.service está correto)
import { DataService } from '../data.service'; 
// Importe suas interfaces
import { VehicleModel } from '../home/interfaces/vehicle-model.interface';
import { VehicleData } from '../home/interfaces/vehicle-data.interface';

// Importe o AuthService
import { AuthService } from '../services/auth.Service';

@Component({
selector: 'app-dashboard',
standalone: true,
imports: [CommonModule, FormsModule], 
templateUrl: './dashboard.component.html',
styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // ⬇️ ETAPA 1: LÓGICA DA SIDEBAR ADICIONADA
  public sidebarVisible: boolean = false;
  // ⬆️ ETAPA 1

// --- Propriedades de Dados ---
public vehicleModels: VehicleModel[] = [];

public selectedVehicle: VehicleModel | undefined;

public vehicleData: VehicleData | null = null;
public selectedVehicleId: number | null = null;

// --- Mapa de VINs (Seu código original, está perfeito) ---
public vinMap = new Map<number, string>([
[1, '2FRHDUYS2Y63NHD22454'], // Ranger
[2, '2RFAASDY54E4HDU34874'], // Mustang
[3, '2FRHDUYS2Y63NHD22455'], // Territory
[4, '2RFAASDY54E4HDU34875']  // Bronco Sport
]);

// --- Propriedades de Estado ---
public isLoading = true;
public errorMessage: string = '';

// --- Injeção de Serviços ---
private dataService = inject(DataService);
private authService = inject(AuthService); // Injeta o AuthService

ngOnInit(): void {
this.loadVehicleList(); }

// 1. Carrega a lista de veículos
loadVehicleList(): void {
this.isLoading = true;
this.errorMessage = '';

this.dataService.getVehicles().subscribe({
next: (response) => { 
this.vehicleModels = response.map(vehicle => { 
const imgName = vehicle.img.split('/').pop(); 
return {
...vehicle, 
img: `img/${imgName}` // Caminho corrigido SEM "assets/"
};
});

if (this.vehicleModels.length > 0) {
this.selectedVehicleId = this.vehicleModels[0].id;
this.onVehicleChange(); 
}
this.isLoading = false;
},
error: (err) => {
console.error('Erro ao buscar lista de veículos', err);
this.errorMessage = 'Falha ao carregar lista de veículos.';
this.isLoading = false;
}
}); 
}

// 2. Chamado na troca do dropdown
onVehicleChange(): void {
if (this.selectedVehicleId === null) return;

this.selectedVehicle = this.vehicleModels.find(v => v.id === Number(this.selectedVehicleId));

const vin = this.vinMap.get(Number(this.selectedVehicleId));
if (!vin) {
this.errorMessage = 'VIN não encontrado.';
this.vehicleData = null; 
return;
}
this.loadVehicleDetails(vin);
}

// 3. Busca os dados da tabela
loadVehicleDetails(vin: string): void {
this.isLoading = true;
this.errorMessage = '';
this.vehicleData = null; 

this.dataService.getVehicleData(vin).subscribe({
next: (data) => {
this.vehicleData = { ...data, vin: vin }; 
this.isLoading = false;
},
error: (err) => {
console.error('Erro ao buscar dados do veículo', err);
this.errorMessage = 'Falha ao carregar dados detalhados do veículo.';
this.vehicleData = null;
this.isLoading = false;
}
}); 
}

// Função de Logout (já estava aqui)
fazerLogout(): void {
console.log('DashboardComponent: ➡️ Chamando logout...');
this.authService.logout();
}

  // ⬇️ ETAPA 2: LÓGICA DA SIDEBAR ADICIONADA
  public toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
  // ⬆️ ETAPA 2
}