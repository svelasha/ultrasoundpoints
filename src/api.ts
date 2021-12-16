import JSBI from "jsbi";
import useSWR from "swr";
import { LeaderboardEntry } from "./components/BurnLeaderboard";
import { TimeFrame } from "./components/TimeFrameControl";
import * as Config from "./config";
import * as Duration from "./duration";

export const famBasePath =
  Config.apiEnv === "staging"
    ? "https://api-stag.ultrasound.money/fam"
    : Config.apiEnv === "dev"
    ? "http://localhost:8080/fam"
    : "https://api.ultrasound.money/fam";

export const feesBasePath =
  Config.apiEnv === "staging"
    ? "https://api-stag.ultrasound.money/fees"
    : Config.apiEnv === "dev"
    ? "http://localhost:8080/fees"
    : "https://api.ultrasound.money/fees";

type WeiPerMinute = number;
type Wei = number;

export type BurnRates = {
  burnRate5m: WeiPerMinute;
  burnRate5mUsd: number;
  burnRate1h: WeiPerMinute;
  burnRate1hUsd: number;
  burnRate24h: WeiPerMinute;
  burnRate24hUsd: number;
  burnRate30d: WeiPerMinute;
  burnRate30dUsd: number;
  burnRate7d: WeiPerMinute;
  burnRate7dUsd: number;
  burnRateAll: WeiPerMinute;
  burnRateAllUsd: number;
};

export type FeesBurned = {
  feesBurned5m: Wei;
  feesBurned5mUsd: number;
  feesBurned1h: Wei;
  feesBurned1hUsd: number;
  feesBurned24h: Wei;
  feesBurned24hUsd: number;
  feesBurned7d: Wei;
  feesBurned7dUsd: number;
  feesBurned30d: Wei;
  feesBurned30dUsd: number;
  feesBurnedAll: Wei;
  feesBurnedAllUsd: number;
};

export type Leaderboards = {
  leaderboard1h: LeaderboardEntry[];
  leaderboard24h: LeaderboardEntry[];
  leaderboard7d: LeaderboardEntry[];
  leaderboard30d: LeaderboardEntry[];
  leaderboardAll: LeaderboardEntry[];
};

export type LatestBlockFees = {
  fees: Wei;
  feesUsd: number;
  number: number;
  baseFeePerGas: Wei;
  minedAt: string;
};

export type FeeData = {
  baseFeePerGas: number | undefined;
  burnRates: BurnRates | undefined;
  latestBlockFees: LatestBlockFees[];
  number: number | undefined;
  feesBurned: FeesBurned | undefined;
  leaderboards: Leaderboards | undefined;
};

export const useFeeData = (): FeeData => {
  const { data } = useSWR(`${feesBasePath}/all`, {
    refreshInterval: Duration.millisFromSeconds(4),
  });

  return data !== undefined
    ? {
        baseFeePerGas: data.baseFeePerGas,
        burnRates: data.burnRates,
        latestBlockFees: data.latestBlockFees,
        number: data.number,
        feesBurned: data.feesBurned,
        leaderboards: data.leaderboards,
      }
    : {
        baseFeePerGas: undefined,
        burnRates: undefined,
        latestBlockFees: [],
        number: undefined,
        feesBurned: undefined,
        leaderboards: undefined,
      };
};

export const setContractTwitterHandle = async (
  token: string,
  address: string,
  handle: string
) => {
  const res = await fetch(
    `${feesBasePath}/set-contract-twitter-handle?address=${address}&token=${token}&handle=${handle}`
  );

  if (res.status !== 200) {
    console.error("failed to add twitter handle");
    return;
  }

  console.log(`successfully added twitter handle ${handle} for ${address}`);
};

export const setContractName = async (
  token: string,
  address: string,
  name: string
) => {
  const res = await fetch(
    `${feesBasePath}/set-contract-name?address=${address}&token=${token}&name=${name}`
  );

  if (res.status !== 200) {
    console.error("failed to add contract name");
    return;
  }

  console.log(`successfully added contract name ${name} for ${address}`);
};

export const setContractCategory = async (
  token: string,
  address: string,
  category: string
) => {
  const res = await fetch(
    `${feesBasePath}/set-contract-category?address=${address}&token=${token}&category=${category}`
  );

  if (res.status !== 200) {
    console.error("failed to add contract category");
    return;
  }

  console.log(
    `successfully added contract category ${category} for ${address}`
  );
};

export type EthPrice = {
  usd: number;
  usd24hChange: number;
  btc: number;
  btc24hChange: number;
};

type BaseFeePerGas = {
  baseFeePerGas: number;
};

export const useEthPrice = (): EthPrice | undefined => {
  const { data } = useSWR<EthPrice>(`${feesBasePath}/eth-price`, {
    refreshInterval: Duration.millisFromSeconds(4),
  });

  return data;
};

export const useBaseFeePerGas = (): number | undefined => {
  const { data } = useSWR<BaseFeePerGas>(`${feesBasePath}/base-fee-per-gas`, {
    refreshInterval: Duration.millisFromSeconds(4),
    refreshWhenHidden: true,
  });

  return data?.baseFeePerGas;
};

export type AverageEthPrice = {
  all: 3536.800133928138;
  d30: 4090.2621816488527;
  d7: 4537.676751145321;
  h1: 4751.528260560356;
  h24: 4717.513628893767;
  m5: 4743.869230769231;
};

export const newTimeframeMap: Record<TimeFrame, keyof AverageEthPrice> = {
  "5m": "m5",
  "1h": "h1",
  "24h": "h24",
  "7d": "d7",
  "30d": "d30",
  all: "all",
};

export const useAverageEthPrice = (
  timeFrame: TimeFrame
): number | undefined => {
  const { data } = useSWR<AverageEthPrice>(
    `${feesBasePath}/average-eth-price`,
    {
      refreshInterval: Duration.millisFromSeconds(8),
    }
  );

  return data === undefined ? undefined : data[newTimeframeMap[timeFrame]];
};

type MarketCaps = {
  btcMarketCap: number;
  ethMarketCap: number;
  goldMarketCap: number;
  usdM3MarketCap: number;
  timestamp: Date;
};

export const useMarketCaps = (): MarketCaps | undefined => {
  const { data } = useSWR<MarketCaps>(`${feesBasePath}/market-caps`, {
    refreshInterval: Duration.millisFromSeconds(8),
  });

  return data;
};

export type Scarcity = {
  engines: {
    burned: {
      amount: JSBI;
      name: string;
      startedOn: Date;
    };
    locked: {
      amount: number;
      name: string;
      startedOn: Date;
    };
    staked: {
      amount: JSBI;
      name: string;
      startedOn: Date;
    };
  };
  ethSupply: JSBI;
  number: number;
};

// BigInt string that uses our server-side encoding of numbers + 'n', i.e. '7825428883900n'
type BigIntString = string;

const jsbiFromBigIntString = (str: string): JSBI =>
  JSBI.BigInt(str.slice(0, -1));

type RawScarcity = {
  engines: {
    burned: {
      amount: BigIntString;
      name: string;
      startedOn: Date;
    };
    locked: {
      amount: number;
      name: string;
      startedOn: Date;
    };
    staked: {
      amount: BigIntString;
      name: string;
      startedOn: Date;
    };
  };
  ethSupply: BigIntString;
  number: number;
};

export const useScarcity = (): Scarcity | undefined => {
  const { data } = useSWR<RawScarcity>(`${feesBasePath}/scarcity`, {
    refreshInterval: Duration.millisFromHours(1),
  });

  if (data === undefined) {
    return data;
  }

  return {
    engines: {
      burned: {
        ...data.engines.burned,
        startedOn: new Date(data.engines.burned.startedOn),
        amount: jsbiFromBigIntString(data.engines.burned.amount),
      },
      locked: {
        ...data.engines.locked,
        startedOn: new Date(data.engines.locked.startedOn),
      },
      staked: {
        ...data.engines.staked,
        startedOn: new Date(data.engines.staked.startedOn),
        amount: jsbiFromBigIntString(data.engines.staked.amount),
      },
    },
    ethSupply: jsbiFromBigIntString(data.ethSupply),
    number: data.number,
  };
};
