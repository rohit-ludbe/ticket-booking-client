import { ApiResponse } from "./api"

export enum UserRole {
  Attendee = "attendee",
  Manager = "manager"
}

export type User = {
  id: number
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type AuthResponse = ApiResponse<{ user: User }>

