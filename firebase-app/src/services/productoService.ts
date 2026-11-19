import { db } from '../fireBase'
import { collection, addDoc,getDocs, updateDoc, doc, deleteDoc, onSnapshot,query, where, orderBy } from 'firebase/firestore'

export interface Producto {
  nombre: string
  precio: number
  stock: number
  categoria: string
}
// taller 2
export interface ProductoConId extends Producto {
  id: string
}
//---------Taller 1
export async function crearProducto(
  nombre: string,
  precio: number,
  stock: number,
  categoria: string
): Promise<string> {
  const producto: Producto = { nombre, precio, stock, categoria }
  const docRef = await addDoc(collection(db, 'productos'), producto)
  return docRef.id
}

//----------Taller 2 (AHORA EN TIEMPO REAL)
export const suscribirProductos = (
  callback: (productos: ProductoConId[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  const productosRef = collection(db, 'productos')
  const unsubscribe = onSnapshot(
    productosRef,
    (querySnapshot) => {
      const productos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductoConId[]
      callback(productos)
    },
    (error) => {
      if (onError) onError(error)
      else console.error('Error en la suscripción de productos: ', error)
    }
  )
  return unsubscribe
}

//---Actualizar producto
export const actualizarProducto = async (
    id: string,
    nombre: string,
    precio: number,
    stock: number,
    categoria: string
)=>{
const productoRef = doc(db, 'productos', id)
await updateDoc(productoRef, {
    nombre,
    precio,
    stock,
    categoria
}
)}

//-------Taller 5
export const eliminarProducto = async (id: string) => {
  const productoRef = doc(db, 'productos', id)
  await deleteDoc(productoRef)
}


export const obtenerProductosDisponibles = async():Promise<ProductoConId[]>=>{
  const consulta =query(
    collection(db, 'productos'),
    where('categoria', '==', "Categoria 2"),
    where('stock', '>', 0),
    where('precio', '>=', 100),
    where('precio', '<=', 500),
    orderBy('precio', 'asc')
  );

  const querySnapshot = await getDocs(consulta);
  const productos=querySnapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  })) as ProductoConId[]

  return productos;
}