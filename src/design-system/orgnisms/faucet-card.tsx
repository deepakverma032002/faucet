"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useWriteContract } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { waitForTransactionReceipt } from "wagmi/actions";

import { Button } from "@/design-system/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/atoms/card";
import { Input } from "@/design-system/atoms/input";
import { Label } from "@/design-system/atoms/label";
import { toast } from "@/design-system/atoms/use-toast";

import { faucetABI } from "@/abi";

import { isWalletAddress } from "@/lib/utils";
import { TokenFaucetContractAddress } from "@/lib/contract";
import { config } from "@/lib/config";
import { Hex } from "viem";
import { useMutation } from "@tanstack/react-query";

export function FaucetCard() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { writeContractAsync: sendTransaction, isPending: isSending } =
    useWriteContract();

  const { mutateAsync: checkEntryMutation, isPending: isChecking } =
    useMutation({
      mutationFn: async () => await axios.post("/api"),
    });

  const isLoading = isChecking || isSending;

  const handleTransaction = async () => {
    try {
      const privateAcc = privateKeyToAccount(
        process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY as Hex
      );

      const hash = await sendTransaction({
        abi: faucetABI,
        address: TokenFaucetContractAddress,
        args: [text],
        account: privateAcc,
        functionName: "requestTokens",
      });

      await waitForTransactionReceipt(config, { hash });

      toast({
        title: "Success",
        description: "Successfully sent transaction!",
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Please try after some time",
        variant: "destructive",
      });
      console.error(e);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!text) {
        return toast({
          title: "Error",
          description: "Please enter a wallet address",
          variant: "destructive",
        });
      }

      await checkEntryMutation();

      await handleTransaction();
      setText("");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error",
          description: `Please try after ${error.response?.data?.time}`,
          variant: "destructive",
        });
      }
      console.error(error);
    }
  };

  return (
    <Card className="md:w-[550px] w-full">
      <CardHeader>
        <CardTitle>Get Test Tokens</CardTitle>
        <CardDescription>
          This faucet transfers Test Tokens and Gas Tokens on TDepo testnets.
          Confirm details before submitting.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="network">Network</Label>
              <Input
                id="network"
                name="network"
                placeholder="Name of your Network"
                value={"TDepo"}
                disabled
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                name="token"
                placeholder="Name of your Token"
                value={"tDepo"}
                disabled
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="wallet_address">Wallet Address</Label>
              <div className="flex items-center border-input border rounded-md">
                <Input
                  className="border-0"
                  id="wallet_address"
                  name="wallet_address"
                  placeholder="0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={text}
                  disabled
                />
                <Button
                  type="button"
                  className="rounded-s-none"
                  variant={"ghost"}
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    if (isWalletAddress(text)) {
                      setText(text.trim());
                      setError("");
                    } else {
                      setError("Invalid address");
                    }
                  }}
                >
                  Paste
                </Button>
              </div>
              {error ? <p className="text-red-500 text-xs">{error}</p> : null}
            </div>

            <div>
              <Button
                className="w-full"
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Get Tokens
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
