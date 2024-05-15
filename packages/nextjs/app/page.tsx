"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PollDetail from "./_components/PollDetails";
import RegisterButton from "./_components/RegisterButton";
import type { NextPage } from "next";
import { useAccount, useNetwork } from "wagmi";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useAuthContext } from "~~/contexts/AuthContext";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chains = getTargetNetworks();

  const { isRegistered } = useAuthContext();

  const [usable, setUsable] = useState(false);

  const { data: owner } = useScaffoldContractRead({ contractName: "MACIWrapper", functionName: "owner" });
  const { data: nextPollId } = useScaffoldContractRead({ contractName: "MACIWrapper", functionName: "nextPollId" });
  const currentPollId = nextPollId === undefined ? undefined : nextPollId - 1n;

  useEffect(() => {
    if (!chains) {
      return;
    }
    setUsable(chains.some(c => c.id == chain?.id));
  }, [chain, chains]);

  return (
    <>
      <main className="w-full h-screen bg-black relative">
        <div className="flex flex-col gap-y-5 my-10 items-center">
          <div className="">
            <h1 className="text-4xl font-bold text-center">Let&apos;s settle the debate</h1>
            <h2 className="text-3xl font-bold text-center">once and for all</h2>
          </div>
          {!usable ? (
            <RainbowKitCustomConnectButton />
          ) : !isRegistered ? (
            <RegisterButton />
          ) : currentPollId !== undefined ? (
            <PollDetail id={currentPollId} />
          ) : (
            <div>Poll not found</div>
          )}

          <div className="mt-14 bg-slate-600 rounded-3xl flex overflow-hidden w-2/3">
            <img className="h-[30vh] aspect-square object-cover" src="/fai.jpg" />
            <div className="flex flex-col p-5 gap-y-3">
              <h1 className="text-2xl font-bold">Cast your Vote securely and privately</h1>
              <p>
                Welcome to our privacy-focused voting platform. We prioritize your privacy and the security of your vote
                with advanced encryption technology. Cast your vote with confidence, knowing your privacy is protected.
              </p>
            </div>
          </div>

          <div className="absolute right-6 bottom-2 flex items-center flex-col">
            {/* <FaucetButton />

            <p className="text-xs mt-1">Get tokens from faucet</p> */}
            {owner == address && (
              <Link
                href={"/admin"}
                passHref
                className={`hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
              >
                Admin Panel
              </Link>
            )}
            <SwitchTheme className={`pointer-events-auto ${true ? "self-end md:self-auto" : ""}`} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
