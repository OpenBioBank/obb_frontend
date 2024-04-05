<template>
  <div class="walletDemo">
    <button @click="walletOperate">{{ msg1 }}</button>
    <br />
    <br />
    <button @click="transaction">{{ tr }}</button>
    <br />
    <br />
    <button @click="sign">{{ signMsg }}</button>
    <br />
    <br />
    <button @click="callContract">{{ msg2 }}</button>
    <br />
    <br />
    <button @click="selectContract">{{ msg3 }}</button>
  </div>
</template>


<script setup lang="ts" name="WalletDemo">
import { Buffer } from "buffer";
window.Buffer = Buffer;

import { BN } from 'bn.js';
import * as borsh from "borsh";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
//import  NftAbi  from "../utils/NftAbi";

//import  NftAbiV2  from "../utils/NftAbiV2";

// import {
//   getAssociatedTokenAddressSync,
//   ASSOCIATED_TOKEN_PROGRAM_ID,
//   TOKEN_PROGRAM_ID,
// } from "@solana/spl-token";

import {
  Connection,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";
// solana mainnet rpc
// const rpc =
//   "https://solana-mainnet.g.alchemy.com/v2/vzFXAOxlxQoAAKZPr9qrVc29rB4HGOJp";
// solana devnet rpc
const rpc = "https://solana-devnet.g.alchemy.com/v2/OLI1XL9pAdLjtvpt06bqBfdbsdODRn_Y";
const connection = new Connection(rpc, "confirmed");

// solana Browser plugin wallet
// https://phantom.app/

// solana rpc node provider
// https://www.alchemy.com/

// solana faucet
// https://faucet.solana.com/

// solana devnet explorer
// https://solscan.io/?cluster=devnet

// solana mainnet explorer
// https://solscan.io/

// solana playground
// https://solana.com/zh/developers/guides/getstarted/hello-world-in-your-browser#deploy-your-program

// solana demo
// https://github.com/phantom/sandbox/tree/b57fdd0e65ce4f01290141a01e33d17fd2f539b9

// sign In With Solana
// https://github.com/phantom/sign-in-with-solana

// solana cli deployment contract
// https://solana.com/zh/developers/guides/getstarted/setup-local-development#3-install-the-solana-cli


// Deploy solana devnet contract address and abi
//const nftAddress = "8UUKMQeG6PfN8wdbU1uViZN4XjZJVfuFFzvpU72oQz7e";
const nftAddressV2 = "CyGeFwXuqGHVV5HuzJ1iFMRqeL2YxU5CYTXyy5Cpbkg1";

let msg1 = "连接钱包";
let tr = "交易";
let signMsg = "签名";
let msg2 = "调用合约";
let msg3 = "查询合约";

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
//console.log("phantom", phantom);

// 合约地址
//const programId = new PublicKey(nftAddress);
const programIdV2 = new PublicKey(nftAddressV2);
console.log("programIdV2: ", programIdV2)
// 创建合约对象
// const program = new Program(NftAbi, programId, phantom);
// console.log("program:  ", program);

// const programV2 = new Program(NftAbiV2, programIdV2, phantom);
// console.log("programV2:  ", programV2);

// 钱包相关操作
function walletOperate() {
  if (phantom !== false) {
    console.log("找到Phantom钱包,正在连接..");
  }
  try {
    // 连接到Solana
    var connect_wallet = phantom.connect();

    // 连接后
    phantom.on("connect", async (publicKey: any) => {
      // 检查连接
      console.log("Phantom已连接: " + phantom.isConnected);

      var wallet_address = publicKey;
      // 获取公钥即钱包地址
      console.log("phantom.publicKey: ", phantom.publicKey);
      console.log("Solana钱包地址: " + wallet_address);
      localStorage.setItem("from", wallet_address);
    });

    // 断开钱包
    phantom.on("disconnect", () => {
      phantom.disconnect();
      console.log("断开连接");
    });

    // 切换钱包
    phantom.on("accountChanged", (publicKey: { toBase58: () => any; }) => {
      if (publicKey) {
        console.log(`Switched to account ${publicKey.toBase58()}`);
      } else {
        phantom.connect().catch((error: any) => {
          console.log(error);
        });
      }
    });
  } catch (err) {
    console.log("连接已取消!");
    console.log(err);
  }
}

// 转账
async function transaction() {
  try {
    // 构建交易
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: phantom.publicKey,
        toPubkey: phantom.publicKey,
        lamports: 300,
      })
    );

    // 设置交易的费用支付者
    transaction.feePayer = phantom.publicKey;

    const anyTransaction: any = transaction;
    // 获取最近的区块交易哈希
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    // 签名并广播交易
    const { signature } = await phantom.signAndSendTransaction(transaction);
    // 获取交易签名
    await connection.getSignatureStatus(signature);

    // devnet网络无法显示交易记录,所以在主网进行了测试
    // 主网成功的交易https://solscan.io/tx/436v1pfJkcMZRYn5Qm3VSo8PUn9RxCqjzrgQgjCS6x9PzRD2Sz3YWQkWNAVxgUHzoVxR8NNFEh4WnnphrEhB6Hxm
  } catch (error) {
    console.warn(error);
    throw new Error(error.message);
  }
}

// 签名
async function sign() {
  try {
    const message = `hello,world!!!`;
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await phantom.signMessage(encodedMessage, "utf8");
    console.log(signedMessage);
  } catch (error) {
    console.warn(error);
    throw new Error(error.message);
  }
}

// 调用合约
// async function callContract() {
//   try {
//     // 构建交易
//     //const instruction = new TransactionInstruction({
//     //   keys: [{ pubkey: phantom.publicKey, isSigner: true, isWritable: true }],
//     //   programId: new PublicKey(contractAddress), // 替换为你的程序ID
//     //   data: Buffer.from([]), // 替换为你的合约调用数据
//     // });

//     // const transaction = new Transaction().add(instruction);
//     // transaction.feePayer = phantom.publicKey;
//     // // 签名并广播交易
//     // await phantom.signAndSendTransaction(transaction);

//     // let ix = new TransactionInstruction({
//     //       programId: program.publicKey,
//     //       keys: [
//     //             { pubkey: mintKeypair.publicKey, isSigner: true, isWritable: true },            // initializer
//     //             { pubkey: mintKeypair.publicKey, isSigner: true, isWritable: true },            // token_mint
//     //             { pubkey: payer.publicKey, isSigner: false, isWritable: true },                 // Mint authority account
//     //             { pubkey: TOKEN_METADATA_PROGRAM_ID, isSigner: false, isWritable: false },      // Token metadata program
//     //             { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },        // System program
//     //             { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },               // Token program
//     //             { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },             // Rent account            
//     //         ],

//     //       data: instructionData.toBuffer()
//     //     });

//     // 以下方法会Error: This function requires 'Provider.sendAndConfirm' to be implemented.
//     // const instruction = await program.methods
//     //   .mintTo()
//     //   .accounts({
//     //     payer: phantom.publicKey,
//     //     tokenAccount:  new PublicKey("2Uar6SX4PnvzwwANVnP6vSGHTmZZjxLa25sXbmvKPBg8"),
//     //     owner: phantom.publicKey,
//     //     mint: phantom.publicKey,
//     //     associatedTokenProgram: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
//     //     systemProgram: SystemProgram.programId,
//     //     tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
//     //   })
//     //   .instruction();


//     const instructionData = new InitializeTokenMintArgs({
//             methods: 0,
//             id: new BN(1),
//             description: "this is a nft",
//             owner: phantom.publicKey,
//             creator: phantom.publicKey,
//             authorize: false,
//             url: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/nft.json",
//             cid: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/nft.json",
//             is_mutable: false
//         });


//     let PDA;
//     PDA = await getPDA();
//     console.log("PDA: ",PDA)

//     let instruction = new TransactionInstruction({
//             programId: new PublicKey(nftAddressV2),
//             keys: [
//                 { pubkey: phantom.publicKey, isSigner: true, isWritable: true },        // Initializer     
//                 { pubkey: phantom.publicKey, isSigner: true, isWritable: true },         // token_mint      
//                 { pubkey: phantom.publicKey, isSigner: true, isWritable: false },             // mint_auth             
//                 { pubkey: new PublicKey(PDA), isSigner: false, isWritable: true },     // token_metadata     
//                 { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },        // System program  
//                 { pubkey: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), isSigner: false, isWritable: false },       // token_program      
//                 { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },      // sysvar_rent
//             ],    
//             data: Buffer.from([instructionData])
//         });



//     const transaction = new Transaction().add(instruction);



const programId = new PublicKey(
  "G1DCNUQTSGHehwdLCAmRyAG8hf51eCHrLNUqkgGKYASj"
);

async function getPDA() {
  let [pda, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("metadata")],
    programId
  );

  console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);
  return pda.toBase58();
}


async function callContract() {
  class Assignable {
    constructor(properties: { [x: string]: any; methods_id?: number; id?: number; description?: string; owner?: string; creator?: string; authorize?: boolean; url?: string; cid?: string; is_mutable?: boolean; }) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    };
  };

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
  };
  const InitializeTokenMintArgsSchema = new Map([
    [
      InitializeTokenMintArgs, {
        kind: 'struct',
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
        ]
      }
    ]
  ]);


  class InstructionData extends Assignable {
    toBuffer() {
      return Buffer.from(borsh.serialize(InstructionDataSchema, this));
    }
  }

  const InstructionDataSchema = new Map([
    [
      InstructionData,
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

  const nftMint = new InstructionData({
    methods_id: 2,
    id: 3,
    description: "hello world!",
    owner: "Ee9tjcAXwDeHtVxKePgQos3YqxGo9sxExryCT8a1DFqe",
    creator: "Ee9tjcAXwDeHtVxKePgQos3YqxGo9sxExryCT8a1DFqe",
    authorize: true,
    url: "https://green-sad-canidae-844.mypinata.cloud/ipfs/QmcUgQvRjpgg1qhsfVNE497unLzMVkHbERQcPkCWdx5tyU/0.json",
    cid: "QmcUgQvRjpgg1qhsfVNE497unLzMVkHbERQcPkCWdx5tyU",
    is_mutable: false,
  });

  const instruction = new TransactionInstruction({
    programId: new PublicKey(
      "4SqR3DmxCeoLS8pej73CSnNrTmnM58h3WZjS1dksV9ZQ"
    ),
    keys: [],
    data: nftMint.toBuffer(),
  })

  
  const transaction = new Transaction();
  // // 获取最近的区块交易哈希
  // anyTransaction.recentBlockhash = (
  //   await connection.getLatestBlockhash('finalized')
  // ).blockhash;

  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
  transaction.recentBlockhash = blockhash;

  transaction.feePayer = phantom.publicKey;
  await transaction.add(instruction)
  console.log('transaction==>', transaction)
  // 签名并广播交易
  const tx = await phantom.signAndSendTransaction(transaction);
  // console.log('signature==>', signature)
  // 获取交易签名
  await connection.getSignatureStatus(tx.signature)
  console.log('hash==>', tx)

}

</script>


<style scoped>
.walletDemo {
  color: white;
}

.walletDemo button:nth-child(1) {
  width: 100px;
  height: 100px;
  background: green;
}

.walletDemo button:nth-child(4) {
  width: 100px;
  height: 100px;
  background: red;
}

.walletDemo button:nth-child(7) {
  width: 100px;
  height: 100px;
  background: yellow;
}

.walletDemo button:nth-child(10) {
  width: 100px;
  height: 100px;
  background: blue;
}

.walletDemo button:nth-child(13) {
  width: 100px;
  height: 100px;
  background: purple;
}
</style>
