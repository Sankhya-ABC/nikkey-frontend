import { VisitaForm } from "./type";

export const empresasOptions = [
  "Empresa A",
  "Empresa B",
  "Empresa C",
  "Empresa D",
];

export const tecnicosOptions = [
  "Técnico 1",
  "Técnico 2",
  "Técnico 3",
  "Técnico 4",
];

export const simulateBackendRequest = (
  month: number,
  year: number,
): Promise<VisitaForm[]> => {
  const visits: VisitaForm[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    if (Math.random() > 0.7) {
      const visitCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < visitCount; j++) {
        visits.push({
          id: `${year}-${month}-${i}-${j}`,
          empresa:
            empresasOptions[Math.floor(Math.random() * empresasOptions.length)],
          tecnico:
            tecnicosOptions[Math.floor(Math.random() * tecnicosOptions.length)],
          dataVisita: new Date(year, month, i),
          horaInicial: "08:00",
          horaFinal: "09:00",
          descricao: `Visita ${j + 1} do dia ${i}`,
        });
      }
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(visits), 300);
  });
};
