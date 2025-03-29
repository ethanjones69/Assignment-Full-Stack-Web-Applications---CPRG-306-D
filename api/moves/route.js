import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, actors, releaseYear } = body;

    const movie = await client.movie.create({
      data: {
        title,
        actors: Array.isArray(actors) ? actors : [actors],
        releaseYear: Number(releaseYear),
      },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const movies = await client.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
};



