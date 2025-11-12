export interface VehicleData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: "on" | "off";
  lat: number;
  long: number;
  vin?: string; // Adicionamos 'vin' aqui para que possamos mostrá-lo na tabela
}