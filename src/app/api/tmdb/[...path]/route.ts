import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.themoviedb.org/3";

const cleanEnv = (value: string | undefined): string =>
  (value ?? "").trim().replace(/^"+|"+$/g, "");

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  const apiKey = cleanEnv(process.env.TMDB_API_KEY);
  const token = cleanEnv(process.env.TMDB_TOKEN);

  if (!apiKey || !token) {
    return NextResponse.json(
      {
        error:
          "Credenciais do TMDB ausentes. Configure TMDB_API_KEY e TMDB_TOKEN no .env.local.",
      },
      { status: 500 }
    );
  }

  const { path } = await ctx.params;
  const url = new URL(`${BASE_URL}/${(path ?? []).join("/")}`);

  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "pt-BR");

  try {
    const res = await fetch(url, {
      headers: { Authorization: token },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Falha ao consultar a API do TMDB" },
      { status: 502 }
    );
  }
}
