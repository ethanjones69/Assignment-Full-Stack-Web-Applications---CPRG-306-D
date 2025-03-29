import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const movie = await client.movie.findUnique({
      where: { id: params.id },
    });
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 }
    );
  }
};

export const PUT = async (request, { params }) => {
  try {
    const body = await request.json();
    const movie = await client.movie.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update movie" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await client.movie.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Movie deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete movie" },
      { status: 500 }
    );
  }
};


