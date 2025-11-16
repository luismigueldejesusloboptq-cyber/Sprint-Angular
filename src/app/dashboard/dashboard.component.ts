import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RouterLink, RouterLinkActive } from '@angular/router';


import { DataService } from '../data.service'; 
import { VehicleModel } from '../home/interfaces/vehicle-model.interface';
import { VehicleData } from '../home/interfaces/vehicle-data.interface';
import { AuthService } from '../services/auth.Service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink, 
    RouterLinkActive
  ], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public sidebarVisible: boolean = false;


  public vehicleModels: VehicleModel[] = [];
  public selectedVehicle: VehicleModel | undefined;
  public selectedVehicleId: number | null = null; 

 
  public vehicleData: VehicleData | null = null; 
  public searchedVin: string = ''; 

 
  public isLoading = true; 
  public errorMessage: string = ''; 

  private dataService = inject(DataService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    
    this.loadVehicleList(); 
  }

 
  loadVehicleList(): void {
    this.isLoading = true;
    this.dataService.getVehicles().subscribe({
      next: (response) => { 
        this.vehicleModels = response.map(vehicle => { 
          const imgName = vehicle.img.split('/').pop(); 
          return {
            ...vehicle, 
            img: `img/${imgName}`
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

  
  onVehicleChange(): void {
    if (this.selectedVehicleId === null) return;
    this.selectedVehicle = this.vehicleModels.find(v => v.id === Number(this.selectedVehicleId));
  }

 
  onSearchVin(): void {
    if (!this.searchedVin) {
      this.errorMessage = 'Por favor, digite um Código VIN para buscar.';
      return;
    }
   
    this.errorMessage = ''; 
    this.vehicleData = null; 
    this.isLoading = true;

    this.dataService.getVehicleData(this.searchedVin.trim().toUpperCase()).subscribe({
      next: (data) => {
      
        this.vehicleData = { ...data, vin: this.searchedVin.trim().toUpperCase() }; 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do veículo', err);
      
        this.errorMessage = err.error?.message || 'Falha ao carregar dados do veículo.';
        this.vehicleData = null; 
        this.isLoading = false;
      }
    }); 
  }


  fazerLogout(): void {
    console.log('DashboardComponent: ➡️ Chamando logout...');
    this.authService.logout();
  }


  public toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}