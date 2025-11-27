import type { WorkSession } from "../../domain/work-session";

export interface WorkSessionAdapter {
  list(): Promise<WorkSession[]>;
  create(workSession: WorkSession): Promise<void>;
}
