import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    // Vyhledávání uživatelů pomocí raw SQL
    const users = await prisma.$queryRaw`
      SELECT * FROM User
      WHERE LOWER(username) LIKE LOWER(${`%${query}%`})
         OR LOWER(name) LIKE LOWER(${`%${query}%`})
         OR LOWER(surname) LIKE LOWER(${`%${query}%`})
    `;

    // Vyhledávání příspěvků pomocí raw SQL
    const posts = await prisma.$queryRaw`
      SELECT Post.*, User.username as userUsername
      FROM Post
      JOIN User ON Post.userId = User.id
      WHERE LOWER(Post.desc) LIKE LOWER(${`%${query}%`})
    `;

    return NextResponse.json({ users, posts });
  } catch (error) {
    console.error("Error searching database:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
