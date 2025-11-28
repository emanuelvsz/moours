import type { Project } from "../../../core/domain/project";

export const createMockedProjects = (): Project[] => {
  return [
    {
      id: "p1",
      name: "Chatbot",
      clientName: "Pauli",
      hourlyRate: 8.0,
      currency: "€",
      ownerId: "chief-1",
    },
    {
      id: "p2",
      name: "Funds",
      clientName: "Pauli",
      hourlyRate: 12.5,
      currency: "€",
      ownerId: "chief-1",
    },
    {
      id: "p3",
      name: "Property Management System",
      clientName: "Pauli",
      hourlyRate: 12.5,
      currency: "€",
      ownerId: "chief-1",
    },
  ];
};
