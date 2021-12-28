export interface IProduct {
  pk: string;
  nombre: string;
  unidadesDisponibles: string;
  puntosParaCanjear: string;
  valorParaCanjear: string;
  categoriaPremio: string;
  imagen: string;
  estado?: string;
  medioPago?: string;
}
