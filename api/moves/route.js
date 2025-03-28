import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, actors, releaseYear } = body;
    const actorsArray = Array.isArray(actors) ? actors : [actors];

    const movie = await client.movie.create({
      data: {
        title,
        actors: actorsArray,
        releaseYear: Number.parseInt(releaseYear),
      },
    });
    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { error: "Failed to create movie", details: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (request) => {
  try {
    const movies = await client.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { status: 500 },
      { error: "Failed to fetch movies" }
    );
  }
};



