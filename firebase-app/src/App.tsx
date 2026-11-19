import { useState } from 'react'
import {
  consulta1,
  consulta2,
  consulta3,
  consulta4,
  type VehiculoConId,
} from './scripts/consultasVehiculos'
import { poblarVehiculos } from './scripts/generarVehiculos'

type ConsultaKey = 'c1' | 'c2' | 'c3' | 'c4'

const CONSULTAS: Record<ConsultaKey, { etiqueta: string; fn: () => Promise<VehiculoConId[]> }> = {
  c1: { etiqueta: 'Consulta 1', fn: consulta1 },
  c2: { etiqueta: 'Consulta 2', fn: consulta2 },
  c3: { etiqueta: 'Consulta 3', fn: consulta3 },
  c4: { etiqueta: 'Consulta 4', fn: consulta4 },
}

function App() {
  const [vehiculos, setVehiculos] = useState<VehiculoConId[]>([])

  const ejecutar = async (key: ConsultaKey) => {
    const datos = await CONSULTAS[key].fn()
    setVehiculos(datos)
    console.log(`${CONSULTAS[key].etiqueta}:`, datos)
  }

  const generar = async () => {
    await poblarVehiculos()
    console.log('Vehículos generados.')
  }

  return (
    <div>
      <h1>Taller N° 7 — Consultas compuestas e índices</h1>

      <div>
        <button onClick={generar}>Generar vehículos</button>
      </div>

      <div>
        {(Object.keys(CONSULTAS) as ConsultaKey[]).map((key) => (
          <button key={key} onClick={() => ejecutar(key)}>
            {CONSULTAS[key].etiqueta}
          </button>
        ))}
      </div>

      <h2>Lista de vehículos</h2>
      {
        vehiculos.map((vehiculo) => (
          <div key={vehiculo.id}>
            <h3>Vehículo ID: {vehiculo.id}</h3>
            <p>Marca: {vehiculo.marca}</p>
            <p>Modelo: {vehiculo.modelo}</p>
            <p>Tipo: {vehiculo.tipo}</p>
            <p>Año: {vehiculo.anio}</p>
            <p>Precio: ${vehiculo.precio.toFixed(2)}</p>
            <p>Stock: {vehiculo.stock}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App