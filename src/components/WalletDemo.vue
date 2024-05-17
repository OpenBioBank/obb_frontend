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
//import { BN } from 'bn.js';
import * as borsh from 'borsh'

import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token'

import {
  Connection,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js'

// solana devnet rpc
const rpc =
  'https://solana-devnet.g.alchemy.com/v2/OLI1XL9pAdLjtvpt06bqBfdbsdODRn_Y'
const connection = new Connection(rpc, 'confirmed')

const nftAddressV2 = 'EF28ZCdYFXDosjFKvSg5NRsBsAtp5cG5wL3WkUHHHt9'

let msg1 = '连接钱包'
let tr = '交易'
let signMsg = '签名'
let msg2 = '调用合约'
let msg3 = '查询合约'

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana

    if (provider?.isPhantom) {
      return provider
    } else {
      return false
    }
  }
  window.open('https://phantom.app/', '_blank')
}

const phantom = getProvider()

// 钱包相关操作
function walletOperate() {
  if (phantom !== false) {
    console.log('找到Phantom钱包,正在连接..')
  }
  try {
    // 连接到Solana
    var connect_wallet = phantom.connect()

    // 连接后
    phantom.on('connect', async (publicKey) => {
      // 检查连接
      console.log('Phantom已连接: ' + phantom.isConnected)

      var wallet_address = publicKey
      // 获取公钥即钱包地址
      console.log('phantom.publicKey: ', phantom.publicKey)
      console.log('Solana钱包地址: ' + wallet_address)
      localStorage.setItem('from', wallet_address)
    })

    // 断开钱包
    phantom.on('disconnect', () => {
      phantom.disconnect()
      console.log('断开连接')
    })

    // 切换钱包
    phantom.on('accountChanged', (publicKey) => {
      if (publicKey) {
        console.log(`Switched to account ${publicKey.toBase58()}`)
      } else {
        phantom.connect().catch((error) => {
          console.log(error)
        })
      }
    })
  } catch (err) {
    console.log('连接已取消!')
    console.log(err)
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
    )

    // 设置交易的费用支付者
    transaction.feePayer = phantom.publicKey

    const anyTransaction: any = transaction
    // 获取最近的区块交易哈希
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash

    // 签名并广播交易
    const { signature } = await phantom.signAndSendTransaction(transaction)
    // 获取交易签名
    await connection.getSignatureStatus(signature)

    // devnet网络无法显示交易记录,所以在主网进行了测试
    // 主网成功的交易https://solscan.io/tx/436v1pfJkcMZRYn5Qm3VSo8PUn9RxCqjzrgQgjCS6x9PzRD2Sz3YWQkWNAVxgUHzoVxR8NNFEh4WnnphrEhB6Hxm
  } catch (error) {
    console.warn(error)
    throw new Error(error.message)
  }
}

// 签名
async function sign() {
  try {
    const message = `hello,world!!!`
    const encodedMessage = new TextEncoder().encode(message)
    const signedMessage = await phantom.signMessage(encodedMessage, 'utf8')
    console.log(signedMessage)
  } catch (error) {
    console.warn(error)
    throw new Error(error.message)
  }
}

// 调用合约
async function callContract() {
  try {
    // 步骤一 初始化账户

    //cid即上传的json哈希
    let cid = 'QmRQnHPzG7oGy5SNXcMzqPXS2rcveMXQRu42nAFrjFEgzC'
    cid = cid.slice(0, 32)

    const instructionData = new InitializeTokenMintArgs({
      methods_id: 0,
      id: 81,
      description:
        'this is a nft this is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nft',
      owner: phantom.publicKey.toBase58(),
      creator: phantom.publicKey.toBase58(),
      authorize: true,
      url: 'https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/nft.json',
      cid,
      is_mutable: false,
    })

    const [tokenMint] = PublicKey.findProgramAddressSync(
      [phantom.publicKey.toBuffer(), Buffer.from(cid)],
      new PublicKey(nftAddressV2)
    )

    const [mintAuth] = PublicKey.findProgramAddressSync(
      [tokenMint.toBuffer()],
      new PublicKey(nftAddressV2)
    )

    const [metadata] = PublicKey.findProgramAddressSync(
      [tokenMint.toBuffer(), Buffer.from(cid)],
      new PublicKey(nftAddressV2)
    )

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
    })

    const transaction = new Transaction().add(instruction)

    const anyTransaction: any = transaction
    //获取最近的区块交易哈希
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash

    transaction.feePayer = phantom.publicKey

    // 签名并广播交易
    const { signature } = await phantom.signAndSendTransaction(transaction)

    // signature即交易哈希
    console.log('初始化签名: ', signature)

    // 步骤二 创建NFT
    const userAta = await getAssociatedTokenAddress(
      tokenMint,
      phantom.publicKey
    )
    console.log('userAta:  ', userAta)
    const ataAccount = await connection.getAccountInfo(userAta)
    console.log('ataAccount: ', ataAccount)

    const blockhashInfo = await connection.getLatestBlockhash()

    // Create transaction
    const tx = new Transaction({
      ...blockhashInfo,
    })

    if (!ataAccount) {
      let ataInstruction = createAssociatedTokenAccountInstruction(
        phantom.publicKey,
        userAta,
        phantom.publicKey,
        tokenMint
      )
      tx.add(ataInstruction)
      console.log('ataInstruction: ', ataInstruction)
    }

    const instructionData2 = new InitializeTokenMintArgs({
      methods_id: 1,
      id: 81,
      description:
        'this is a nft this is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nftthis is a nft',
      owner: phantom.publicKey.toBase58(),
      creator: phantom.publicKey.toBase58(),
      authorize: true,
      url: 'https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/nft.json',
      cid,
      is_mutable: false,
    })

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
    })

    const transaction2 = tx.add(createInstruction)

    transaction2.feePayer = phantom.publicKey

    // 签名并广播交易
    const { signature2 } = await phantom.signAndSendTransaction(transaction2)

    // signature即交易哈希
    console.log('创建nft: ', signature2)
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

// 查询合约
function selectContract() {}

class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key])
    })
  }
}

function intToBool(i: number) {
  if (i == 0) {
    return false
  } else {
    return true
  }
}

function boolToInt(t: boolean) {
  if (t) {
    return 1
  } else {
    return 0
  }
}

const boolMapper = {
  encode: boolToInt,
  decode: intToBool,
}

class InitializeTokenMintArgs extends Assignable {
  toBuffer() {
    return Buffer.from(borsh.serialize(InitializeTokenMintArgsSchema, this))
  }
}

const InitializeTokenMintArgsSchema = new Map([
  [
    InitializeTokenMintArgs,
    {
      kind: 'struct',
      fields: [
        ['methods_id', 'u64'],
        ['id', 'u64'],
        ['description', 'string'],
        ['owner', 'string'],
        ['creator', 'string'],
        ['authorize', 'u8', boolMapper],
        ['url', 'string'],
        ['cid', 'string'],
        ['is_mutable', 'u8', boolMapper],
      ],
    },
  ],
])
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
