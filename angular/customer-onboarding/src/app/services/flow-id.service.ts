import { Injectable } from '@angular/core';

/**
 * Generates a single UUID per Angular app instance (i.e. per browser tab).
 * Duplicating a tab creates a new app instance → new flowId → independent flow.
 */
@Injectable({ providedIn: 'root' })
export class FlowIdService {
  readonly flowId: string = crypto.randomUUID();
}
