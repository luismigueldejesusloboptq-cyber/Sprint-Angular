export interface VehicleModel {
    id: number;
    vehicle: string;       // <- O nome do modelo
    volumetotal: number;   // <- Total de vendas
    connected: number;     // <- Conectados
    softwareUpdates: number; // <- Updates
    img: string;           // <- URL da imagem
  }