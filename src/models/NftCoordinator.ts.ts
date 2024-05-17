import * as web3 from "@solana/web3.js";
import { Nft } from "../models/Nft";

const ENV = import.meta.env;
import bs58 from "bs58";

export class NftCoordinator {
  static accounts: web3.PublicKey[] = [];

  static async prefetchAccounts(connection: web3.Connection, search: string) {
    const accounts = await connection.getProgramAccounts(
      new web3.PublicKey(ENV.VITE_APP_CONTRACT_ADDRESS),
      {
        // dataSlice: { offset: 4, length: 48 },
        filters: [
          // {
          //   dataSize: 44, // number of bytes
          // // },
          {
            memcmp: {
              offset: 8,
              bytes: bs58.encode(
                Buffer.from("https://green-sad-canidae-844.mypinata.cloud")
              ),
            },
          },
        ],
      }
    );
    console.log("accounts长度", accounts);
    this.accounts = accounts.map((account) => {
      console.log("aaaaa", account, account.pubkey.toBase58());
      return account.pubkey;
    });
  }
  static async fetchPage(
    connection: web3.Connection,
    page: number,
    perPage: number,
    search: string,
    reload: boolean = false
  ): Promise<Nft[]> {
    if (this.accounts.length === 0 || reload) {
      await this.prefetchAccounts(connection, search);
    }
    const paginatedPublicKeys = this.accounts.slice(
      (page - 1) * perPage,
      page * perPage
    );

    if (paginatedPublicKeys.length === 0) {
      return [];
    }

    const accounts = await connection.getMultipleAccountsInfo(
      paginatedPublicKeys
    );
    // paginatedPublicKeys.map((i) => {
    //   console.log("测试卷11", i.toBase58());
    // });
    const nfts = accounts.reduce((accum: Nft[], account) => {
      // console.log("测试卷", account);
      const nft = Nft.deserialize(account?.data);
      if (!nft) {
        return accum;
      }

      return [...accum, nft];
    }, []);
    // console.log("账户", accounts, nfts);
    return nfts;
  }
}
