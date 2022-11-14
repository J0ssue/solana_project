import * as solanaWeb3 from "@solana/web3.js";

const endpoint =
  "https://icy-delicate-moon.solana-mainnet.discover.quiknode.pro/2660f7ca4d1d7d1b40a6f46be70a2779a565fad0/";
const solanaConnection = new solanaWeb3.Connection(endpoint);

export const getTransactions = async (address: string, numTx: number) => {
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
  console.log(transactionDetails);

  // here we can parse the transaction list

  transactionList.forEach((transaction: any, i) => {
    const date = new Date(transaction.blockTime! * 1000);
    const transactionNumber = i + 1;
    const transactionSignature = transaction.signature;
    const transactionTime = date;
    const confirmationStatus = transaction.confirmationStatus
      ? transaction.confirmationStatus
      : "";

    // console.log("parsed Transaction: ", {
    //   Time: transactionTime,
    //   Signature: transactionSignature,
    //   TNumber: transactionNumber,
    //   Status: confirmationStatus,
    // });

    const transactionInstructions =
      transactionDetails[i]?.transaction.message.instructions;
    // here we can parse the instructions inside the transactions list
    transactionInstructions?.forEach((instruction: any, n) => {
      console.log(`instructions for transaction ${n + 1}: `, instruction.data);
    });
  });
};
