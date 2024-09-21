import { ApiResponse } from "./api"

export type Event = {
  id: number
  name: string
  location: string
  totalTicketPurchased: number
  totalTicketEntered: number
  date: string
  createAt: string
  updatedAt: string
}

export type EventResponse = ApiResponse<Event>

export type EventListResponse = ApiResponse<Array<Event>>
