import * as solanaWeb3 from "@solana/web3.js";

const endpoint =
  "https://icy-delicate-moon.solana-mainnet.discover.quiknode.pro/2660f7ca4d1d7d1b40a6f46be70a2779a565fad0/";
const solanaConnection = new solanaWeb3.Connection(endpoint);

export interface Transaction {
  time: string;
  signature: string;
  transactionNumber: number;
  status: string;
  fee: number;
  // logs: string[];
  instructions?: any[];
}

export const getTransactions = async (address: string, numTx: number) => {
  let parsedTransaction: Transaction[] = [];

  const pubKey: solanaWeb3.PublicKey = new solanaWeb3.PublicKey(address);

  let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {
    limit: numTx,
  });

  let signatureList = transactionList.map(
    (transaction) => transaction.signature
  );

  let transactionDetails = await solanaConnection.getParsedTransactions(
    signatureList
  );

  parsedTransaction = transactionList.map((transaction: any, i) => {
    const date = new Date(transaction.blockTime! * 1000).toLocaleDateString(
      "en-US"
    );
    const transactionNumber = i + 1;
    const transactionSignature = transaction.signature;
    const transactionTime = date;
    const confirmationStatus = transaction.confirmationStatus
      ? transaction.confirmationStatus
      : "";
    const transactionFee = transactionDetails[i]?.meta?.fee || 0;
    // const logMessages = transactionDetails[i]?.meta?.logMessages || [];

    return {
      time: transactionTime,
      signature: transactionSignature,
      transactionNumber: transactionNumber,
      status: confirmationStatus,
      fee: transactionFee,
      // logs: logMessages,
      key: i.toString(),
    };
  });

  return parsedTransaction;
};
