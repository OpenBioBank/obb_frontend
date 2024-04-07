import * as borsh from "borsh";

import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

import {
  Connection,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";
const ENV = import.meta.env;

export const useContract = () => {
  // solana devnet rpc
  const rpc =
    "https://solana-devnet.g.alchemy.com/v2/OLI1XL9pAdLjtvpt06bqBfdbsdODRn_Y";
  const connection = new Connection(ENV.VITE_APP_RPC, "confirmed");
  const nftAddressV2 = ENV.VITE_APP_CONTRACT_ADDRESS;

  class Assignable {
    constructor(properties) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    }
  }

  function intToBool(i: number) {
    if (i == 0) {
      return false;
    } else {
      return true;
    }
  }

  function boolToInt(t: boolean) {
    if (t) {
      return 1;
    } else {
      return 0;
    }
  }

  const boolMapper = {
    encode: boolToInt,
    decode: intToBool,
  };

  class InitializeTokenMintArgs extends Assignable {
    toBuffer() {
      return Buffer.from(borsh.serialize(InitializeTokenMintArgsSchema, this));
    }
  }

  const InitializeTokenMintArgsSchema = new Map([
    [
      InitializeTokenMintArgs,
      {
        kind: "struct",
        fields: [
          ["methods_id", "u64"],
          ["id", "u64"],
          ["description", "string"],
          ["owner", "string"],
          ["creator", "string"],
          ["authorize", "u8", boolMapper],
          ["url", "string"],
          ["cid", "string"],
          ["is_mutable", "u8", boolMapper],
        ],
      },
    ],
  ]);
  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      } else {
        return false;
      }
    }
    window.open("https://phantom.app/", "_blank");
  };

  const phantom = getProvider();

  // 调用合约
  const callContract = async (data: any) => {
    // 步骤一 初始化账户

    //cid即上传的json哈希
    //cid即上传的json哈希
    let cid = data.url.slice(data.url.indexOf("ipfs") + 5);
    console.log("看下cid", data, cid);
    cid = cid.slice(0, 32);

    const instructionData = new InitializeTokenMintArgs({
      methods_id: 0,
      id: 81,
      description: data.agct,
      owner: phantom.publicKey.toBase58(),
      creator: phantom.publicKey.toBase58(),
      authorize: true,
      url: data.url,
      cid,
      is_mutable: false,
    });

    const [tokenMint] = PublicKey.findProgramAddressSync(
      [phantom.publicKey.toBuffer(), Buffer.from(cid)],
      new PublicKey(nftAddressV2)
    );

    const [mintAuth] = PublicKey.findProgramAddressSync(
      [tokenMint.toBuffer()],
      new PublicKey(nftAddressV2)
    );

    const [metadata] = PublicKey.findProgramAddressSync(
      [tokenMint.toBuffer(), Buffer.from(cid)],
      new PublicKey(nftAddressV2)
    );

    let instruction = new TransactionInstruction({
      keys: [
        { pubkey: phantom.publicKey, isSigner: true, isWritable: false }, // Initializer
        { pubkey: tokenMint, isSigner: false, isWritable: true }, // token_mint
        { pubkey: mintAuth, isSigner: false, isWritable: false }, // mint_auth
        { pubkey: metadata, isSigner: false, isWritable: true }, // token_metadata
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // System program
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // token_program
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }, // sysvar_rent
      ],
      programId: new PublicKey(nftAddressV2),
      data: instructionData.toBuffer(),
    });

    const transaction = new Transaction().add(instruction);

    const anyTransaction: any = transaction;
    //获取最近的区块交易哈希
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    transaction.feePayer = phantom.publicKey;

    // 签名并广播交易
    const { signature } = await phantom.signAndSendTransaction(transaction);

    // signature即交易哈希
    console.log("初始化签名: ", signature);

    // 步骤二 创建NFT
    const userAta = await getAssociatedTokenAddress(
      tokenMint,
      phantom.publicKey
    );
    console.log("userAta:  ", userAta);
    const ataAccount = await connection.getAccountInfo(userAta);
    console.log("ataAccount: ", ataAccount);

    const blockhashInfo = await connection.getLatestBlockhash();

    // Create transaction
    const tx = new Transaction({
      ...blockhashInfo,
    });

    if (!ataAccount) {
      let ataInstruction = createAssociatedTokenAccountInstruction(
        phantom.publicKey,
        userAta,
        phantom.publicKey,
        tokenMint
      );
      tx.add(ataInstruction);
      console.log("ataInstruction: ", ataInstruction);
    }

    const instructionData2 = new InitializeTokenMintArgs({
      methods_id: 1,
      id: 81,
      description: data.agct,
      owner: phantom.publicKey.toBase58(),
      creator: phantom.publicKey.toBase58(),
      authorize: true,
      url: data.url,
      cid,
      is_mutable: false,
    });

    let createInstruction = new TransactionInstruction({
      keys: [
        { pubkey: phantom.publicKey, isSigner: true, isWritable: false },
        { pubkey: tokenMint, isSigner: false, isWritable: true },
        { pubkey: mintAuth, isSigner: false, isWritable: false },
        { pubkey: userAta, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      ],
      programId: new PublicKey(nftAddressV2),
      data: instructionData2.toBuffer(),
    });

    const transaction2 = tx.add(createInstruction);

    transaction2.feePayer = phantom.publicKey;

    // 签名并广播交易
    const { signature2 } = await phantom.signAndSendTransaction(transaction2);

    // signature即交易哈希
    console.log("创建nft: ", signature2);
  };
  return {
    callContract,
    connection,
  };
};
