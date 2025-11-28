import type { WorkSession } from "../../domain/work-session";

abstract class WorkSessionUseCase {
  abstract list(): Promise<WorkSession[]>;
  abstract create(workSession: WorkSession): Promise<void>;
  abstract createMany(workSessions: WorkSession[]): Promise<void>;
}

export default WorkSessionUseCase;
