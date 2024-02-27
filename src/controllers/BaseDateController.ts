import { BaseDateRepository } from "@/repositories/BaseDateRepository";

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
}
