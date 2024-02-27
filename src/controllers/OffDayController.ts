import { OffDay } from "@/entities/off-day";
import { OffDayRepository } from "@/repositories/OffDayRepository";

export default class OffDayController {
  private offDayRepository: OffDayRepository;

  constructor() {
    this.offDayRepository = new OffDayRepository();
  }

  public getAll = async (): Promise<Response> => {
    try {
      const data: OffDay[] = await this.offDayRepository.findAll();

      return Response.json({
        offDays: data,
      });
    } catch (e) {
      return Response.json({ status: "error", message: e });
    }
  };
}
