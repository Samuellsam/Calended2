import BaseDateController from "@/controllers/BaseDateController";
import { NextRequest, NextResponse } from "next/server";

const baseDateController = new BaseDateController();

export async function GET(request: NextRequest): Promise<Response> {
  return await baseDateController.get();
}

export async function POST(request: NextRequest): Promise<Response> {
  return await baseDateController.post(request);
}
