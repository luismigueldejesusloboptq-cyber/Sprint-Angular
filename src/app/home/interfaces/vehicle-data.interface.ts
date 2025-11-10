export interface VehicleData {
    id: number;
    odometro: number;
    nivelCombustivel: number;
    status: "on" | "off";
    lat: number;
    long: number;
  }