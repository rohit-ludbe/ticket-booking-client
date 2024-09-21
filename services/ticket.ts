import { Get, Post } from './api';
import { Ticket, TicketListResponse, TicketResponse } from './../types/ticket';
import { ApiResponse } from '@/types/api';

async function createOne(eventId: number): Promise<TicketResponse> {
  return Post("/ticket", { eventId })
}

async function getOne(id: number): Promise<ApiResponse<{ ticket: Ticket, qrcode: string }>> {
  return Get(`/ticket/${id}`,)
}

async function getAll(): Promise<TicketListResponse> {
  return Get("/ticket",)
}

async function validateOne(ticketId: number, OwnerId: number): Promise<TicketListResponse> {
  return Post("/ticket/validate", {
    ticketId, OwnerId
  })
}

const ticketService = {
  createOne,
  getOne,
  getAll,
  validateOne
}

export { ticketService }
