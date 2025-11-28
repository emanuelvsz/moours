import type { WorkSession } from "../../../core/domain/work-session";
import type { WorkSessionAdapter } from "../../../core/interfaces/adapter/work-session.adapter";
import { createMockedWorkSessions } from "./data";

class WorkSessionInMemory implements WorkSessionAdapter {
  private static workSessions: WorkSession[] = createMockedWorkSessions();

  list(): Promise<WorkSession[]> {
    return Promise.resolve(WorkSessionInMemory.workSessions);
  }

  create(workSession: WorkSession): Promise<void> {
    WorkSessionInMemory.workSessions.push(workSession);
    return Promise.resolve();
  }

  createMany(workSessions: WorkSession[]): Promise<void> {
    WorkSessionInMemory.workSessions.push(...workSessions);
    return Promise.resolve();
  }
}

export default WorkSessionInMemory;
