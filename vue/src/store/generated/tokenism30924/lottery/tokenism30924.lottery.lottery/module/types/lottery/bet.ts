/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tokenism30924.lottery.lottery";

export interface Bet {
  index: string;
  lotteryId: string;
  amount: string;
}

const baseBet: object = { index: "", lotteryId: "", amount: "" };

export const Bet = {
  encode(message: Bet, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.lotteryId !== "") {
      writer.uint32(18).string(message.lotteryId);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Bet {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBet } as Bet;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.lotteryId = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bet {
    const message = { ...baseBet } as Bet;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.lotteryId !== undefined && object.lotteryId !== null) {
      message.lotteryId = String(object.lotteryId);
    } else {
      message.lotteryId = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = String(object.amount);
    } else {
      message.amount = "";
    }
    return message;
  },

  toJSON(message: Bet): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.lotteryId !== undefined && (obj.lotteryId = message.lotteryId);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial(object: DeepPartial<Bet>): Bet {
    const message = { ...baseBet } as Bet;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.lotteryId !== undefined && object.lotteryId !== null) {
      message.lotteryId = object.lotteryId;
    } else {
      message.lotteryId = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = "";
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
