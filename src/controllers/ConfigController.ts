import { readFileSync, writeFileSync } from "fs";
import { DB_PATH } from "@/constants/db-path";
import { NextRequest } from "next/server";

export default class ConfigController {
  constructor() {}

  public get = async (): Promise<Response> => {
    try {
      const data = readFileSync(DB_PATH, { encoding: "utf8", flag: "r" });

      return Response.json({
        config: data,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };

  public post = async (req: NextRequest): Promise<Response> => {
    try {
      const data = await req.json();

      writeFileSync(DB_PATH, data.config);

      return Response.json({
        success: true,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };
}
