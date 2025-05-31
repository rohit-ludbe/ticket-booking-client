import { ApiResponse } from "./api";
import { Event } from "./event";

export type TicketResponse = ApiResponse<Ticket>;
export type TicketListResponse = ApiResponse<Array<Ticket>>;

export type Ticket = {
  id: string;
  eventId: number;
  userId: number;
  event: Event;
  entered: boolean;
  createdAt: string;
  updatedAt: string;
};
