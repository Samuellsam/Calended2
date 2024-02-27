import BaseDateController from "@/controllers/BaseDateController";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const baseDateController = new BaseDateController();

export async function GET(request: NextApiRequest): Promise<Response> {
  return await baseDateController.get();
}
