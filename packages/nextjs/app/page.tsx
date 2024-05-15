"use client";

import { useEffect, useState } from "react";
import RegisterButton from "./_components/RegisterButton";
import PollDetail from "./polls/[id]/page";
import type { NextPage } from "next";
import { useAccount, useNetwork } from "wagmi";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useAuthContext } from "~~/contexts/AuthContext";
import { useAuthUserOnly } from "~~/hooks/useAuthUserOnly";

const Home: NextPage = () => {
  useAuthUserOnly({ inverted: true });

  const { address } = useAccount();
  const { chain, chains } = useNetwork();

  const { isRegistered } = useAuthContext();

  const [usable, setUsable] = useState(false);

  useEffect(() => {
    if (chain && chain.id && (chain.id == chains[0].id || chain.id == chains[1].id)) {
      setUsable(true);
    } else {
      setUsable(false);
    }
  }, [chain, address]);

  return (
    <>
      <main className="w-full h-screen bg-black relative">
        <div className="flex flex-col gap-y-5 my-10 items-center">
          <div className="">
            <h1 className="text-4xl font-bold text-center">Let's settle the debate</h1>
            <h2 className="text-3xl font-bold text-center">once and for all</h2>
          </div>
          {!usable && <RainbowKitCustomConnectButton />}
          {usable && !isRegistered && <RegisterButton />}
          {usable && isRegistered && (
            <div className="mt-16 p-6 rounded-2xl bg-slate-800 flex flex-col items-center">
              <h1 className="font-bold text-3xl">Which one do you use?</h1>

              <div className="mt-10 flex flex-col gap-y-6">
                {["I use onchain", "I use on-chain"].map((item, key) => (
                  <button
                    key={key}
                    className="text-left bg-black py-2 px-10 font-medium rounded-full flex items-center gap-x-4 text-xl group"
                  >
                    <figure className="bg-gray-500 h-[0.9em] aspect-square rounded-full outline outline-gray-400 outline-offset-2 outline-1 group-hover:bg-white duration-300 group-hover:outline-white" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
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
            <FaucetButton />
            <p className="text-xs mt-1">Get tokens from faucet</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
