export function formatCpf(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export enum Satatus {
  InProgress = 'InProgress',
  Scheduled = 'Scheduled',
  Completed = 'Completed',
}

export interface AppointmentByMonth {
  month: number;
  year: number;
  total: bigint; // Supondo que a contagem seja BigInt
}
