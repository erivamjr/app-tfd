// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de especialidades (Specialties)
  await prisma.specialty.createMany({
    data: [
      { id: 1, name: 'Cardiologia' },
      { id: 2, name: 'Dermatologia' },
      { id: 3, name: 'Ortopedia' },
      { id: 4, name: 'Neurologia' },
      { id: 5, name: 'Ginecologia e Obstetrícia' },
      { id: 6, name: 'Pediatria' },
      { id: 7, name: 'Oftalmologia' },
      { id: 8, name: 'Endocrinologia' },
      { id: 9, name: 'Gastroenterologia' },
      { id: 10, name: 'Psiquiatria' },
    ],
  });

  // Criação de usuários (Users) password 1235a@A
  await prisma.user.createMany({
    data: [
      {
        id: 'ed5c416c-46a0-4e93-9484-d555c70af284',
        name: 'geiza',
        phone: '91991782007',
        cpf: '777.777.555-05',
        email: 'geizaportel@gmail.com',
        password:
          '$2b$10$Vzgc9ozxN2i/SwFRibnnL.Dn1P/TnkMFPZRVQ8GuiVwfSEFd2uqwK',
        role: 'user',
        createdAt: '2024-07-31T23:38:40.141Z',
        updatedAt: '2024-07-31T23:38:40.141Z',
      },
      {
        id: '84d6d27e-475c-4e83-a1ae-b477698e399e',
        name: 'Davi Mileras',
        phone: '91991782007',
        cpf: '777.777.555-10',
        email: 'davi@gmail.com',
        password:
          '$2b$10$Vzgc9ozxN2i/SwFRibnnL.Dn1P/TnkMFPZRVQ8GuiVwfSEFd2uqwK',
        role: 'admin',
        createdAt: '2024-08-02T19:43:00.357Z',
        updatedAt: '2024-08-02T19:43:00.357Z',
      },
      {
        id: 'ec487b8b-0d25-4af9-a57b-623b087e4fc3',
        name: 'Jose Erivam',
        phone: '91991782007',
        cpf: '777.777.555-06',
        email: 'erivamdev@gmail.com',
        password:
          '$2b$10$Vzgc9ozxN2i/SwFRibnnL.Dn1P/TnkMFPZRVQ8GuiVwfSEFd2uqwK',
        role: 'USER',
        createdAt: '2024-08-02T11:47:59.357Z',
        updatedAt: '2024-08-03T18:43:44.114Z',
      },
      {
        id: 'ec487b8b-0d25-4af9-a57b-623b087e4fc2',
        name: 'Taynara Pacheco',
        phone: '91991782007',
        cpf: '777.777.555-61',
        email: 'taynara@gmail.com',
        password:
          '$2b$10$Vzgc9ozxN2i/SwFRibnnL.Dn1P/TnkMFPZRVQ8GuiVwfSEFd2uqwK',
        role: 'USER',
        createdAt: '2024-08-02T11:47:59.357Z',
        updatedAt: '2024-08-03T18:43:44.114Z',
      },
    ],
  });

  // Criação de pacientes (Patients)
  await prisma.patient.createMany({
    data: [
      {
        id: 'd2d2d43b-f35c-4b1b-bd24-f0e9f0929c72',
        name: 'Tony Stark',
        cpf: '12345678901',
        rg: 'CA9876543',
        address: '456 Stark Tower',
        phone: '555-123-4567',
        susCard: '987654321',
        birthDate: new Date('1975-05-29'),
        motherName: 'Maria Stark',
        priority: 'Normal',
        gender: 'M',
        userId: 'ed5c416c-46a0-4e93-9484-d555c70af284',
      },
      {
        id: '5f80e6e4-79a3-40f6-bd9e-dc4e7d0b978b',
        name: 'Natasha Romanoff',
        cpf: '98765432102',
        rg: 'NY7654321',
        address: '789 Red Room St',
        phone: '555-987-6543',
        susCard: '123456789',
        birthDate: new Date('1983-11-22'),
        motherName: 'Ivan Petrovna',
        priority: 'Normal',
        gender: 'F',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
      },
      {
        id: '5b7c3d8d-bf05-4f18-b1ea-fc0d4573b6c4',
        name: 'Steve Rogers',
        cpf: '54321098766',
        rg: 'DC1234567',
        address: '789 Brooklyn Ave',
        phone: '555-789-1234',
        susCard: '987654321',
        birthDate: new Date('1918-07-04'),
        motherName: 'Sarah Rogers',
        priority: 'Normal',
        gender: 'M',
        userId: 'ec487b8b-0d25-4af9-a57b-623b087e4fc3',
      },
      {
        id: '7cf3f7b3-1041-44a4-9292-67859db94c72',
        name: 'Carol Danvers',
        cpf: '67890123457',
        rg: 'MA9876543',
        address: '123 Air Force Base',
        phone: '555-234-5678',
        susCard: '987654321',
        birthDate: new Date('1960-03-17'),
        motherName: 'Marie Danvers',
        priority: 'Normal',
        gender: 'F',
        userId: 'ec487b8b-0d25-4af9-a57b-623b087e4fc3',
      },
      {
        id: 'ba1a12b4-0567-4a6e-8513-08b342f4a5d1',
        name: 'Bruce Banner',
        cpf: '34567890124',
        rg: 'NY1234567',
        address: '456 Gamma Lab',
        phone: '555-456-7890',
        susCard: '987654321',
        birthDate: new Date('1969-12-18'),
        motherName: 'Rebecca Banner',
        priority: 'Normal',
        gender: 'M',
        userId: 'ed5c416c-46a0-4e93-9484-d555c70af284',
      },
      {
        id: 'c4fcf8c2-99c8-4d09-81eb-8f8b8c5b0231',
        name: 'Peter Parker',
        cpf: '45678901235',
        rg: 'NY7654321',
        address: '789 Queens Blvd',
        phone: '555-678-9012',
        susCard: '123456789',
        birthDate: new Date('2001-08-10'),
        motherName: 'Mary Parker',
        priority: 'Normal',
        gender: 'M',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
      },
      {
        id: 'd167b292-0d2e-4c6b-a2f0-d3c9c6506b72',
        name: 'Wanda Maximoff',
        cpf: '56789012346',
        rg: 'NY1234567',
        address: '123 Sokovia St',
        phone: '555-789-0123',
        susCard: '987654321',
        birthDate: new Date('1990-12-10'),
        motherName: 'Magda Maximoff',
        priority: 'Normal',
        gender: 'F',
        userId: 'ec487b8b-0d25-4af9-a57b-623b087e4fc3',
      },
      {
        id: 'f3c6e837-2a72-4ac5-b736-7eae85cbb0d4',
        name: 'Scott Lang',
        cpf: '67890123458',
        rg: 'CA9876543',
        address: '456 San Francisco St',
        phone: '555-890-1234',
        susCard: '987654321',
        birthDate: new Date('1979-06-11'),
        motherName: 'Peggy Lang',
        priority: 'Normal',
        gender: 'M',
        userId: 'ed5c416c-46a0-4e93-9484-d555c70af284',
      },
      {
        id: 'e6c7b08f-0e67-4b08-8cb7-3c67f2f3b4e4',
        name: 'Stephen Strange',
        cpf: '78901234568',
        rg: 'NY7654321',
        address: '789 Sanctum Sanctorum',
        phone: '555-901-2345',
        susCard: '123456789',
        birthDate: new Date('1960-08-14'),
        motherName: 'Beverly Strange',
        priority: 'Normal',
        gender: 'M',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
      },
      {
        id: 'f7ac72e2-4d1b-4307-87ef-4b3c7b8fc6bb',
        name: "T'Challa",
        cpf: '89012345679',
        rg: 'NY1234567',
        address: '123 Wakanda St',
        phone: '555-012-3456',
        susCard: '987654321',
        birthDate: new Date('1977-02-16'),
        motherName: 'Ramonda',
        priority: 'Normal',
        gender: 'M',
        userId: 'ec487b8b-0d25-4af9-a57b-623b087e4fc2',
      },
      {
        id: 'f8c2a691-12c1-4b7e-bd6b-923a287e4936',
        name: 'Thor Odinson',
        cpf: '90123456780',
        rg: 'NY7654321',
        address: '789 Asgard St',
        phone: '555-123-4567',
        susCard: '123456789',
        birthDate: new Date('1985-08-11'),
        motherName: 'Frigga',
        priority: 'Normal',
        gender: 'M',
        userId: 'ed5c416c-46a0-4e93-9484-d555c70af284',
      },
      {
        id: 'c7b7f060-fb1d-4d2f-b2ee-29f7e2e3b6fc',
        name: 'Sam Wilson',
        cpf: '01234567891',
        rg: 'NY1234567',
        address: '123 Harlem Ave',
        phone: '555-234-5678',
        susCard: '987654321',
        birthDate: new Date('1978-09-23'),
        motherName: 'Darlene Wilson',
        priority: 'Normal',
        gender: 'M',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
      },
      {
        id: 'f1a50dc3-2f30-456f-b459-5e34858c0f9d',
        name: 'James Rhodes',
        cpf: '12345678902',
        rg: 'NY7654321',
        address: '789 Air Force Base',
        phone: '555-345-6789',
        susCard: '123456789',
        birthDate: new Date('1974-06-08'),
        motherName: 'Lila Rhodes',
        priority: 'Normal',
        gender: 'M',
        userId: 'ec487b8b-0d25-4af9-a57b-623b087e4fc3',
      },
    ],

    // Adicione outros pacientes aqui
  });

  // Criação de agendamentos (Appointments)
  await prisma.appointment.createMany({
    data: [
      {
        id: '689e8839-f0d5-4845-a8fd-587b81429ae9',
        specialtyId: 2,
        patientId: '5f80e6e4-79a3-40f6-bd9e-dc4e7d0b978b',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
        priority: 'Normal',
        appointmentDate: '2024-08-10T10:00:00.000Z',
        diagnosis: 'Example diagnosis',
        cid: 'A00',
        requestingDoctor: 'Dr. John Doe',
        crm: '123456',
        requestCode: 'REQ123456',
        requestDate: '2024-08-05T09:00:00.000Z',
        status: 'InProgress',
        notes: 'Additional notes about the appointment',
        createdAt: '2024-08-05T00:06:53.973Z',
        updatedAt: '2024-08-05T00:06:53.973Z',
      },
      {
        id: '8e5b1756-c590-4fc4-8d37-52da6d9c9fef',
        specialtyId: 2,
        patientId: '5f80e6e4-79a3-40f6-bd9e-dc4e7d0b978b',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
        priority: 'Normal',
        appointmentDate: '2024-08-10T10:00:00.000Z',
        diagnosis: 'Example diagnosis',
        cid: 'A00',
        requestingDoctor: 'Dr. John Doe',
        crm: '123456',
        requestCode: 'REQ123456',
        requestDate: '2024-08-05T09:00:00.000Z',
        status: 'InProgress',
        notes: 'Additional notes about the appointment',
        createdAt: '2024-08-05T00:06:57.960Z',
        updatedAt: '2024-08-05T00:06:57.960Z',
      },
      {
        id: '1a3c2672-5a4e-450d-add8-59fa2277cd03',
        specialtyId: 2,
        patientId: 'd2d2d43b-f35c-4b1b-bd24-f0e9f0929c72',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
        priority: 'Normal',
        appointmentDate: '2024-08-10T10:00:00.000Z',
        diagnosis: 'Example diagnosis',
        cid: 'A00',
        requestingDoctor: 'Dr. John Doe',
        crm: '123456',
        requestCode: 'REQ123456',
        requestDate: '2024-08-05T09:00:00.000Z',
        status: 'InProgress',
        notes: 'Additional notes about the appointment',
        createdAt: '2024-08-05T00:06:58.292Z',
        updatedAt: '2024-08-05T00:06:58.292Z',
      },
      {
        id: 'd9c420dc-fad8-4cf5-9ecf-e7a58353874b',
        specialtyId: 2,
        patientId: '5b7c3d8d-bf05-4f18-b1ea-fc0d4573b6c4',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
        priority: 'Normal',
        appointmentDate: '2024-06-08T03:00:00.000Z',
        diagnosis: 'Example diagnosis',
        cid: 'A00',
        requestingDoctor: 'Bruce Wenne',
        crm: '123456',
        requestCode: 'REQ123456',
        requestDate: '2024-08-05T09:00:00.000Z',
        status: 'InProgress',
        notes: 'Additional notes about the appointment',
        createdAt: '2024-08-05T00:06:17.371Z',
        updatedAt: '2024-08-06T21:39:29.911Z',
      },
      {
        id: '8c6325cf-847f-4b27-bcfc-5d7b48da0a53',
        specialtyId: 2,
        patientId: '7cf3f7b3-1041-44a4-9292-67859db94c72',
        userId: '84d6d27e-475c-4e83-a1ae-b477698e399e',
        priority: 'Normal',
        appointmentDate: '2024-08-10T00:00:00.000Z',
        diagnosis: 'Example diagnosis',
        cid: 'A00',
        requestingDoctor: 'Clarck Kent',
        crm: '123456',
        requestCode: 'REQ123456',
        requestDate: '2024-08-05T09:00:00.000Z',
        status: 'InProgress',
        notes: 'Additional notes about the appointment',
        createdAt: '2024-08-06T21:53:41.540Z',
        updatedAt: '2024-08-06T21:53:41.540Z',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
