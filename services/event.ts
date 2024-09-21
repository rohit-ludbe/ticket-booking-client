import { EventListResponse, EventResponse } from "@/types/event"
import { Delete, Get, Post, Put } from "./api"



const createOne = async (name: string, location: string, date: string): Promise<EventResponse> => {
  return Post("/event", { name, location, date })
}


const getOne = async (id: number): Promise<EventResponse> => {
  return Get(`/event/${id}`)
}

const getAll = async (): Promise<EventListResponse> => {
  return Get(`/event`)
}

const updateOne = async (id: number, name: string, location: string, date: string): Promise<EventResponse> => {
  return Put(`/event/${id}`, { name, location, date })
}

const deleteOne = async (id: number): Promise<EventResponse> => {
  return Delete(`/event/${id}`)
}

const eventService = {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne
}

export { eventService }
