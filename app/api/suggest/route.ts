import { NextResponse } from "next/server";
import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z } from "zod";
import axios from "axios";
import { Book, BookSearchResult } from "@/types/types";
import leven from "leven";

const SuggestSchema = z.object({
  books: z.array(
    z.object({
      title: z.string(),
    })
  ),

  genres: z.array(z.string()),
});

const SuggestResponseSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
});

const client = Instructor({
  client: oai,
  mode: "FUNCTIONS",
});

export async function POST(req: Request) {
  try {
    let response = {};
    const body = await req.json();
    const { books, genres } = SuggestSchema.parse(body);

    const prompt = `
    You are a large language model trained on a massive dataset of books and user preferences. Given a list of liked books and preferred genres, You can recommend similar and potentially enjoyable titles.

    Liked Books: ${books.map((book) => book.title).join(", ")}

    Liked Genres: ${genres.join(", ")}

    Strictly avoid recommending a book already listed in the Liked Books list. Users deeply hate to see a book they have already read as suggestion from you.
    You are expert and don't make basic errors like that.

    Based on the provided information, please recommend just ONE(1) book that the user might enjoy reading. Prioritize a book that share similar themes, styles, or authors with the liked books, 
    while making a creative guess about the user based on their prefered genres.

    Briefly explain why you think the user might enjoy each recommendation, mentioning relevant similarities or connections to their past reading preferences.
    
    REPEAT: It is strictly forbidden to recommend a book already listed in the Liked Books list. The user will leave bad review and I will lose my job, my wife and children. My life is in your hands. Please don't mess up.
    `;

    const answer = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",

      response_model: {
        schema: SuggestResponseSchema,
        name: "Extract Book Title and Description",
      },
    });

    response = answer;

    const data = await fetch(
      `https://openlibrary.org/search.json?title=${answer.title}&page=1&limit=10`
    );

    const result: Book = await data.json();

    const searchResult: BookSearchResult[] = result.docs;

    if (searchResult.length > 0) {
      searchResult.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        const title = answer.title.toLowerCase();

        const levenA = leven(title, titleA);
        const levenB = leven(title, titleB);

        return levenA - levenB;
      });
      if (searchResult[0].cover_i != undefined) {
        response = {
          ...answer,
          image: `https://covers.openlibrary.org/b/id/${searchResult[0].cover_i}-M.jpg`,
        };
      }
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
