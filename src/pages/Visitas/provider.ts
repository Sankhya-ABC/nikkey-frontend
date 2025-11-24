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
  dataInicial: Date,
  dataFinal: Date,
): Promise<VisitaForm[]> => {
  const visits: VisitaForm[] = [];
  const currentDate = new Date(dataInicial);

  while (currentDate <= dataFinal) {
    if (Math.random() > 0.7) {
      const visitCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < visitCount; j++) {
        visits.push({
          id: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}-${j}`,
          empresa:
            empresasOptions[Math.floor(Math.random() * empresasOptions.length)],
          tecnico:
            tecnicosOptions[Math.floor(Math.random() * tecnicosOptions.length)],
          dataVisita: new Date(currentDate),
          horaInicial: "08:00",
          horaFinal: "09:00",
          descricao: `Visita ${j + 1} do dia ${currentDate.getDate()}`,
        });
      }
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(visits), 300);
  });
};
