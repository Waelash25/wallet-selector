import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui-js";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupHotWallet } from "@near-wallet-selector/hot-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupMyNearWallet(), setupHereWallet(), setupHotWallet()],
});

const modal = setupModal(selector, {
  contractId: "test.testnet",
});

window.selector = selector;
window.modal = modal;

document.getElementById('open-walletselector-button').addEventListener('click', () => modal.show());

