import { ActionReducer } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

interface RootState {
  customer: CustomerState;
}

const SESSION_KEY = 'customer_onboarding_state';

/**
 * Meta-reducer that persists the customer slice to sessionStorage on every
 * state change. sessionStorage is per-tab, so tab isolation (flowId) is
 * preserved and other tabs are never affected.
 *
 * On reload the saved state is rehydrated; `submitting` is reset to false
 * so a mid-submit reload doesn't leave the UI stuck in a loading state.
 */
export function sessionStorageSyncMetaReducer(
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> {
  return (state, action) => {
    if (state === undefined) {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        try {
          const parsed: CustomerState = JSON.parse(saved);
          state = { customer: { ...parsed, submitting: false } };
        } catch {
          // Ignore corrupted data — fall through to default initialisation
        }
      }
    }

    const nextState = reducer(state, action);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextState.customer));
    return nextState;
  };
}
