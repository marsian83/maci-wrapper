import { useScaffoldContractRead } from "./scaffold-eth";

export const useFetchPoll = (id: string | bigint | undefined) =>
  useScaffoldContractRead({
    contractName: "MACIWrapper",
    functionName: "fetchPoll",
    args: [typeof id == "string" ? BigInt(id) : id],
  });
