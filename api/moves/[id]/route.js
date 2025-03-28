import client from "@/app/libs/prismadb"
import { NextResponse } from "next/server"


export const GET = async (request, {params}) => {
  try {
    const { id } = params

    const movie = await client.movie.findUnique({
      where: {
        id: id,
      },
    })

    if (!movie) {
      return NextResponse.json({ status: 404 }, { error: "Movie not found" })
    }
    return NextResponse.json(movie)
  } catch (error) {
    return NextResponse.json( { status: 500 }, { error: "Failed to fetch movie", details: error.message })
  }
}


export const PUT = async (request, { params }) => {
  try {
    const { id } = params
    const body = await request.json()
    const { title, actors, releaseYear } = body
 
    const actorsArray = Array.isArray(actors) ? actors : [actors]

    const movie = await client.movie.update({
      where: {
        id: id,
      },
      data: {
        title,
        actors: actorsArray,
        releaseYear: Number.parseInt(releaseYear),
      },
    })

    return NextResponse.json(movie)
  } catch (error) {
    return NextResponse.json({ status: 500 }, { error: "Failed to update movie", details: error.message })
  }
}


export const DELETE = async (request, { params }) => {
  try {
    const { id } = params
    await client.movie.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json({ message: "Movie deleted successfully" })
  } catch (error) {
    return NextResponse.json({ status: 500 }, { error: "Failed to delete movie", details: error.message })
  }
}


