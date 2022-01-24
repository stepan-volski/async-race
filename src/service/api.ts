const baseUrl = 'http://127.0.0.1:3000';
const garage = `${baseUrl}/garage`;
const engine = `${baseUrl}/engine`;
const winners = `${baseUrl}/winners`;

export type CarData = {
  name: string;
  color: string;
  id: number;
}

export type EngineData = {
  velocity: string;
  distance: string;
}

export type WinnerData = {
  id: number;
  wins: number;
  time: number;
}

export async function getCars(): Promise<CarData[]> {
  const response = await fetch(garage, {
    method: 'GET',
  });
  return response.json();
}

export async function getCar(id: number): Promise<CarData> {
  const response = await fetch(`${garage}/${id}`, {
    method: 'GET',
  });
  return response.json();
}

export async function createCar(name: string, color: string): Promise<CarData> {
  const data = {
    name: `${name}`,
    color: `${color}`,
  };
  const response = await fetch(garage, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteCar(id: number): Promise<void> {
  await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
}

export async function updateCar(car: CarData): Promise<CarData> {
  const data = {
    name: `${car.name}`,
    color: `${car.color}`,
  };
  const response = await fetch(`${garage}/${car.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function toggleEngine(id: number, status: 'started'|'stopped'): Promise<EngineData> {
  const response = await fetch(`${engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  return response.json();
}

export async function isEngineWorking(id: number): Promise<boolean> {
  const response = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });

  return response.ok
}

export async function getWinners(): Promise<WinnerData[]> {
  const response = await fetch(winners, {
    method: 'GET',
  });
  return response.json();
}

export async function getWinner(id: number): Promise<WinnerData> {
  const response = await fetch(`${winners}/${id}`, {
    method: 'GET',
  });
  return response.json();
}

export async function createWinner(id: number, wins: number, time: number): Promise<void> {
  const data = {
    id: id,
    wins: wins,
    time: time,
  };
  await fetch(winners, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function deleteWinner(id: number): Promise<void> {
  await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
}

export async function updateWinner(winner: WinnerData): Promise<void> {
  const data = {
    wins: winner.wins,
    time: winner.time,
  };
  await fetch(`${winners}/${winner.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
