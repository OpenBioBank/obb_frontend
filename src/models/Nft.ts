import * as borsh from "@coral-xyz/borsh";

export class Nft {
  methods_id: number;
  id: number;
  description: string;
  owner: string;
  creator: string;
  authorize: boolean;
  url: string;
  cid: string;
  is_mutable: boolean;
  constructor({
    methods_id,
    id,
    description,
    owner,
    creator,
    authorize,
    url,
    cid,
    is_mutable,
  }: any) {
    this.methods_id = methods_id;
    this.id = id;
    this.description = description;
    this.owner = owner;
    this.creator = creator;
    this.authorize = authorize;
    this.url = url;
    this.cid = cid;
    this.is_mutable = is_mutable;
  }
  static deserializeSchema = borsh.struct([
    borsh.u32("id"),
    borsh.str("description"),
    borsh.str("owner"),
    borsh.str("creator"),
    borsh.bool("authorize"),
    borsh.str("url"),
    borsh.str("cid"),
    // borsh.bool("is_mutable"),
  ]);
  static serializeSchema = borsh.struct([
    borsh.u32("methods_id"),
    borsh.u32("id"),
    borsh.str("description"),
    borsh.str("owner"),
    borsh.str("creator"),
    borsh.bool("authorize"),
    borsh.str("url"),
    borsh.str("cid"),
    borsh.bool("is_mutable"),
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    Nft.serializeSchema.encode(
      {
        ...this,
      },
      buffer
    );
    return Buffer.from(buffer.subarray(0, Nft.serializeSchema.getSpan(buffer)));
  }
  static deserialize(buffer?: Buffer): Nft | null {
    if (!buffer) {
      return null;
    }
    try {
      console.log("哈哈哈", buffer);
      const {
        id,
        description,
        owner,
        creator,
        authorize,
        url,
        cid,
        is_mutable,
      } = this.deserializeSchema.decode(buffer);
      console.log(
        "序列化成功了吗",
        id,
        description,
        owner,
        creator,
        authorize,
        url,
        cid,
        is_mutable
      );
      return new Nft({
        id,
        description,
        owner,
        creator,
        authorize,
        url,
        cid,
        is_mutable,
      });
    } catch (error) {
      console.log("Deserialization error:", error);
      return null;
    }
  }
}
