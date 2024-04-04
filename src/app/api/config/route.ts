import ConfigController from "@/controllers/ConfigController";
import { NextRequest } from "next/server";

const configController = new ConfigController();

export async function GET(request: NextRequest): Promise<Response> {
  return await configController.get();
}

export async function POST(request: NextRequest): Promise<Response> {
  return await configController.post(request);
}
