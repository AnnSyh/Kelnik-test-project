export interface Apartment {
  id: number
  title: string
  price: number
  area: number
  rooms: number
  floor: number
  image: string
}

export interface ApartmentsState {
  apartments: Apartment[]
  loading: boolean
  error: string | null
}