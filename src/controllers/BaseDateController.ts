import { BaseDateRepository } from "@/repositories/BaseDateRepository";
import { NextRequest } from "next/server";

export default class BaseDateController {
  private baseDateRepository: BaseDateRepository;

  constructor() {
    this.baseDateRepository = new BaseDateRepository();
  }

  public get = async (): Promise<Response> => {
    try {
      const data = await this.baseDateRepository.find();

      return Response.json({
        baseDate: data,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };

  public post = async (req: NextRequest): Promise<Response> => {
    try {
      const data = await req.json();

      await this.baseDateRepository.set(data.baseDate, data.teamId);

      return Response.json({
        success: true,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };
}
