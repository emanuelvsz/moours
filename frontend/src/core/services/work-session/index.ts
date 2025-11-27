import type { WorkSession } from "../../domain/work-session";
import type { WorkSessionAdapter } from "../../interfaces/adapter/work-session.adapter";
import type WorkSessionUseCase from "../../interfaces/usecase/work-session.usecase";

class WorkSessionService implements WorkSessionUseCase {
  protected readonly adapter: WorkSessionAdapter;

  constructor(adapter: WorkSessionAdapter) {
    this.adapter = adapter;
  }

  async list(): Promise<WorkSession[]> {
    return this.adapter.list();
  }

  async create(workSession: WorkSession): Promise<void> {
    return this.adapter.create(workSession);
  }
}

export default WorkSessionService;
