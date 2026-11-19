import { db } from '../fireBase'
import { collection, addDoc } from 'firebase/firestore'

interface Vehiculo {
  marca: string
  modelo: string
  precio: number
  stock: number
  anio: number
  tipo: string
}

// Lista fija de 25 vehículos (determinista, ideal para evidencias)
const VEHICULOS: Vehiculo[] = [
  // ---------- Sedan ----------
  { marca: 'Toyota',    modelo: 'Corolla',  precio: 24500, stock: 8,  anio: 2025, tipo: 'Sedan' },
  { marca: 'Honda',     modelo: 'Civic',    precio: 27000, stock: 0,  anio: 2024, tipo: 'Sedan' },
  { marca: 'Mazda',     modelo: 'Mazda3',   precio: 23000, stock: 12, anio: 2023, tipo: 'Sedan' },
  { marca: 'Hyundai',   modelo: 'Elantra',  precio: 21000, stock: 5,  anio: 2022, tipo: 'Sedan' },
  { marca: 'Nissan',    modelo: 'Sentra',   precio: 19500, stock: 0,  anio: 2020, tipo: 'Sedan' },
  { marca: 'Kia',       modelo: 'Forte',    precio: 20500, stock: 7,  anio: 2024, tipo: 'Sedan' },
  { marca: 'Chevrolet', modelo: 'Cruze',    precio: 18000, stock: 3,  anio: 2021, tipo: 'Sedan' },

  // ---------- SUV ----------
  { marca: 'Toyota',    modelo: 'RAV4',     precio: 38000, stock: 6,  anio: 2025, tipo: 'SUV' },
  { marca: 'Honda',     modelo: 'CR-V',     precio: 41000, stock: 4,  anio: 2024, tipo: 'SUV' },
  { marca: 'Mazda',     modelo: 'CX-5',     precio: 35000, stock: 0,  anio: 2023, tipo: 'SUV' },
  { marca: 'Hyundai',   modelo: 'Tucson',   precio: 33000, stock: 9,  anio: 2025, tipo: 'SUV' },
  { marca: 'Kia',       modelo: 'Sportage', precio: 31000, stock: 11, anio: 2024, tipo: 'SUV' },
  { marca: 'Ford',      modelo: 'Escape',   precio: 29500, stock: 2,  anio: 2022, tipo: 'SUV' },
  { marca: 'Nissan',    modelo: 'Qashqai',  precio: 28000, stock: 5,  anio: 2023, tipo: 'SUV' },

  // ---------- Pickup ----------
  { marca: 'Toyota',    modelo: 'Hilux',    precio: 45000, stock: 3,  anio: 2025, tipo: 'Pickup' },
  { marca: 'Ford',      modelo: 'Ranger',   precio: 42000, stock: 0,  anio: 2024, tipo: 'Pickup' },
  { marca: 'Chevrolet', modelo: 'Colorado', precio: 39000, stock: 6,  anio: 2023, tipo: 'Pickup' },
  { marca: 'Nissan',    modelo: 'Frontier', precio: 36000, stock: 4,  anio: 2022, tipo: 'Pickup' },
  { marca: 'Mazda',     modelo: 'BT-50',    precio: 37500, stock: 2,  anio: 2024, tipo: 'Pickup' },
  { marca: 'Toyota',    modelo: 'Tacoma',   precio: 52000, stock: 1,  anio: 2026, tipo: 'Pickup' },

  // ---------- Hatchback ----------
  { marca: 'Toyota',    modelo: 'Yaris',    precio: 17000, stock: 14, anio: 2024, tipo: 'Hatchback' },
  { marca: 'Honda',     modelo: 'Fit',      precio: 16500, stock: 0,  anio: 2021, tipo: 'Hatchback' },
  { marca: 'Mazda',     modelo: 'Mazda2',   precio: 18500, stock: 8,  anio: 2023, tipo: 'Hatchback' },
  { marca: 'Kia',       modelo: 'Rio',      precio: 15900, stock: 10, anio: 2022, tipo: 'Hatchback' },
  { marca: 'Hyundai',   modelo: 'Accent',   precio: 15500, stock: 6,  anio: 2025, tipo: 'Hatchback' },
]

async function poblarVehiculos() {
  const ref = collection(db, 'vehiculos')
  const creados: string[] = []

  for (let i = 0; i < VEHICULOS.length; i++) {
    const vehiculo = VEHICULOS[i]
    const docRef = await addDoc(ref, vehiculo)
    creados.push(docRef.id)
  }

  console.log(`\n🎉 ${creados.length} vehículos insertados en la colección "vehiculos".`)
}
export { poblarVehiculos }