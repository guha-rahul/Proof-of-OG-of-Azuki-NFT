//@ts-ignore
import { ByteArray, require } from "@hyperoracle/zkgraph-lib";
import { BigInt, Bytes, Block, Event, Address } from "@hyperoracle/zkgraph-lib";
import { addr } from "./constants/contract";
import { esig_og } from "./constants/function";

export function handleBlocks(blocks: Block[]): Bytes {
  let state: Bytes;
  let events: Event[] = blocks[0].events;
  let zero_add = Bytes.fromHexString(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  let og_minters: ByteArray = ByteArray.empty();
  for (let i = events.length - 1; i >= 0; i--) {
    if (
      events[i].address == addr &&
      events[i].topic1 == zero_add &&
      events[i].esig == esig_og
    ) {
      og_minters.concat(events[i].topic2); // this add the tokenid of the proof
    }
  }
  state = Bytes.fromByteArray(og_minters);
  return state;
}
