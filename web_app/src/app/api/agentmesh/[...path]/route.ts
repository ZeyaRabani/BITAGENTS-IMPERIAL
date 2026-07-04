import { NextRequest, NextResponse } from "next/server";

const AGENTMESH_API_URL =
  process.env.AGENTMESH_API_URL ?? "http://127.0.0.1:8787";

async function proxy(request: NextRequest, path: string) {
  const url = `${AGENTMESH_API_URL}${path}`;
  const init: RequestInit = {
    method: request.method,
    headers: { "Content-Type": "application/json" },
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const res = await fetch(url, init);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = `/${params.path.join("/")}`;
  return proxy(request, path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = `/${params.path.join("/")}`;
  return proxy(request, path);
}
