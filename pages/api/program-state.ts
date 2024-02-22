import type { NextApiRequest, NextApiResponse } from 'next'
import { checkAddress } from '@polkadot/util-crypto'
import { GearApi, HexString, ProgramMetadata } from '@gear-js/api'

type RequestData = {
  address: string
}

type ResponseData = {
  bids: {
    address: string,
    amount: number,
  }[],
  highestBid: string,
}

const ProgramId = "0x25150391f5a9f8b47246b17d2e41dfeb3381aa587ad55dbeb2172a664fa9a49a";
const Metadata = "00020000000100000000010400000000000000000105000000e503280008447a6b5f6269645f61756374696f6e5f696f0c4269640000080118616d6f756e740401107531323800011470726f6f6608011c5665633c75383e0000040000050700080000020c000c00000503001000000500001408447a6b5f6269645f61756374696f6e5f696f3041756374696f6e53746174650000080110626964731801505665633c284163746f7249642c2075313238293e00012c686967686573745f626964040110753132380000180000021c001c000004082004002010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004002401205b75383b2033325d000024000003200000000c00"
 
const api = new GearApi({ providerAddress: "wss://testnet.vara.network" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  await api.isReadyOrError;

  let metaText = Metadata;
  let meta = ProgramMetadata.from(`0x${metaText}`);

  let programId: HexString = ProgramId; // TODO: use config.app.auctionProgram;

  let result = await api.programState.read(
    {
      programId,
      payload: undefined
    },
    meta,
  );

  let state = {
    bids: (result as any).bids.map(([address, amount]: [any, any]) => ({ address, amount: Number(amount.toHuman()) })),
    highestBid: (result as any).highestBid.toHuman(),
  }

  console.log("data:", JSON.stringify(state, null, "  "));

  res.status(200).json(state);
}
