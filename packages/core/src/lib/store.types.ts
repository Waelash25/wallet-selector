import type { BehaviorSubject, Observable } from "rxjs";

import type { Wallet, Account } from "./wallet";

export interface ContractState {
  /**
   * Account ID of the Smart Contract.
   */
  contractId: string;
  /**
   * List of methods that can only be invoked on the Smart Contract. Empty list means no restriction.
   */
  methodNames: Array<string>;
}

export type MultiContractState = Array<ContractState>;

export type ModuleState<Variation extends Wallet = Wallet> = {
  /**
   * Unique identifier for the wallet.
   */
  id: Variation["id"];
  /**
   * Type of the wallet.
   */
  type: Variation["type"];
  /**
   * Meta information about the wallet.
   */
  metadata: Variation["metadata"];
  /**
   * Access functionality of the wallet.
   */
  wallet(): Promise<Variation>;
};

export type AccountState = Account & {
  /**
   * Is account set as active.
   */
  active: boolean;
};

export interface WalletSelectorState {
  /**
   * Returns the list of available modules.
   */
  modules: Array<ModuleState>;
  /**
   * Returns the list of signed in accounts.
   */
  accounts: Array<AccountState>;
  /**
   * Returns the ID of the selected wallet.
   */
  selectedWalletId: string | null;
  /**
   * Returns ID-s of 5 recently signed in wallets.
   */
  recentlySignedInWallets: Array<string>;
  /**
   * The list of contracts for SignIn and SignInMulti.
   */
  contracts: MultiContractState;
}

export type WalletSelectorAction =
  | {
      type: "SETUP_WALLET_MODULES";
      payload: {
        modules: Array<ModuleState>;
        accounts: Array<Account>;
        selectedWalletId: string | null;
        recentlySignedInWallets: Array<string>;
        contracts: MultiContractState;
      };
    }
  | {
      type: "WALLET_CONNECTED";
      payload: {
        walletId: string;
        accounts: Array<Account>;
        recentlySignedInWallets: Array<string>;
        contracts: MultiContractState;
      };
    }
  | {
      type: "WALLET_DISCONNECTED";
      payload: {
        walletId: string;
      };
    }
  | {
      type: "ACCOUNTS_CHANGED";
      payload: {
        walletId: string;
        accounts: Array<Account>;
      };
    }
  | {
      type: "SET_ACTIVE_ACCOUNT";
      payload: {
        accountId: string;
      };
    };

export interface ReadOnlyStore {
  /**
   * Retrieve the current state. You can find more information on `WalletSelectorState` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/state.md | here}.
   */
  getState(): WalletSelectorState;
  /**
   * Subscribe to state changes using the (RxJS) Observable pattern. You can find more information on `WalletSelectorState` {@link https://github.com/near/wallet-selector/blob/main/packages/core/docs/api/state.md | here}.
   */
  observable: Observable<WalletSelectorState>;
}

export interface Store {
  observable: BehaviorSubject<WalletSelectorState>;
  getState(): WalletSelectorState;
  dispatch(action: WalletSelectorAction): void;
  toReadOnly(): ReadOnlyStore;
}
