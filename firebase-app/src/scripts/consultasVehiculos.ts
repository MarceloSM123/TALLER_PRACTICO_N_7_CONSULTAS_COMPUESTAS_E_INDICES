import { db } from '../fireBase'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from 'firebase/firestore'

export interface VehiculoConId {
  id: string
  marca: string
  modelo: string
  precio: number
  stock: number
  anio: number
  tipo: string
}

export const consulta1 = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('stock', '>', 0),
    orderBy('precio', 'asc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta2 = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('tipo', '==', "SUV"),
    where('stock', '>', 0),
    orderBy('precio', 'asc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta3 = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('stock', '>', 0),
    where('precio', '>=', 20000),
    where('precio', '<=', 40000),
    orderBy('precio', 'asc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}

export const consulta4  = async():Promise<VehiculoConId[]>=>{
  const consulta =query(
    collection(db, 'vehiculos'),
    where('tipo', '==', "Sedan"),
    where('stock', '>', 0),
    where('anio', '>=', 2023),
    orderBy('anio', 'desc')
  );

  const querySnapshot = await getDocs(consulta);
  const vehiculos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as VehiculoConId[]

  return vehiculos;
}


