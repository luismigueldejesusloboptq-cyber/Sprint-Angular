export interface VehicleModel {
    id: number;
    odometro: number;
    status:'on'| 'off';
    lat: number;
    long: number;
}