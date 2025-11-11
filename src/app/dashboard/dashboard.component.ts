import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. VERIFIQUE SE O FORMSMODULE ESTÁ IMPORTADO
import { FormsModule } from '@angular/forms'; 

import { DataService } from '../data.service';
import { VehicleModel } from '../home/interfaces/vehicle-model.interface';
import { VehicleData } from '../home/interfaces/vehicle-data.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 2. VERIFIQUE SE ELE ESTÁ AQUI
  imports: [CommonModule, FormsModule], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // Propriedades para os dados
  public vehicles: VehicleModel[] = [];
  public selectedVehicle: VehicleModel | undefined; // O veículo selecionado nos cards
  public vehicleData: VehicleData | null = null;   // Os dados da tabela (odômetro, etc.)
  
  // Propriedade para o dropdown
  public selectedVehicleId: number | null = null;

  // Propriedades de estado
  public isLoading = true;
  public errorMessage: string = '';

  // Injetar o serviço
  private dataService = inject(DataService);

  // Mapa de VINs - Conecta o ID do veículo ao seu VIN
  // (Baseado na lógica da sua API)
  public vinMap = new Map<number, string>([
    [1, '2FRHDUYS2Y63NHD22454'], // Ranger
    [2, '2RFAASDY54E4HDU34874'], // Mustang
    [3, '2FRHDUYS2Y63NHD22455'], // Territory (Usei o VIN do seu server.js)
    [4, '2RFAASDY54E4HDU34875']  // Bronco Sport
  ]);

  ngOnInit(): void {
    this.loadVehicleList();
  }

  // 1. Carrega a lista de veículos para o dropdown
  loadVehicleList(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // O seu data.service.ts usa .pipe(map(...)),
    // então a resposta (response) já é o array VehicleModel[]
    this.dataService.getVehicles().subscribe({
      next: (response) => {
        this.vehicles = response; // CORRETO (pois seu serviço usa 'map')
        
        // Seleciona o primeiro veículo da lista por padrão (ex: Ranger)
        if (this.vehicles.length > 0) {
          this.selectedVehicleId = this.vehicles[0].id;
          this.onVehicleChange(); // Carrega os dados do primeiro veículo
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

  // 2. Chamado quando o usuário troca o dropdown
  onVehicleChange(): void {
    if (this.selectedVehicleId === null) return;

    // Acha os dados do veículo selecionado (para os cards e imagem)
    this.selectedVehicle = this.vehicles.find(v => v.id === this.selectedVehicleId);

    // Acha o VIN correspondente no mapa
    const vin = this.vinMap.get(Number(this.selectedVehicleId));

    if (!vin) {
      this.errorMessage = 'VIN não encontrado para este veículo.';
      this.vehicleData = null; // Limpa dados da tabela
      return;
    }

    // Busca os dados da tabela (odômetro, etc.)
    this.loadVehicleDetails(vin);
  }

  // 3. Busca os dados da tabela (parte de baixo)
  loadVehicleDetails(vin: string): void {
    this.errorMessage = ''; // Limpa erros antigos
    this.vehicleData = null; // Limpa dados antigos
    
    this.dataService.getVehicleData(vin).subscribe({
      next: (data) => {
        this.vehicleData = data;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do veículo', err);
        this.errorMessage = 'Falha ao carregar dados detalhados do veículo.';
        this.vehicleData = null; // Limpa dados da tabela
      }
    });
  }
}