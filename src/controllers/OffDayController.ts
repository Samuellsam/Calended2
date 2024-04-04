import { OffDay } from "@/entities/off-day";
import { OffDayRepository } from "@/repositories/OffDayRepository";
import { NextRequest } from "next/server";

export default class OffDayController {
  private offDayRepository: OffDayRepository;

  constructor() {
    this.offDayRepository = new OffDayRepository();
  }

  public getAll = async (): Promise<Response> => {
    try {
      const data = await this.offDayRepository.findAll();

      return Response.json({
        offDays: data,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };

  public post = async (req: NextRequest): Promise<Response> => {
    try {
      const data = await req.json();

      await this.offDayRepository.insert(
        data.from,
        data.to,
        data.name,
        data.type
      );

      return Response.json({
        success: true,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };
}
