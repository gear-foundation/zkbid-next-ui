"use client"

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/JxQN1HHiOOQ
 */
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import React, { useState } from "react"

export function Component() {
  const [account, setAccount] = useState<null | { address: string; privkey: string; }>(null);

  const generateAccount = () => {
    const newAccount = {
      address: Math.floor(Math.random() * 10000).toString(), // Randomly generated ID
      privkey: Math.floor(Math.random() * 10000).toString(),
    };

    setAccount(newAccount);
  };

  return (
    <>
      <Tabs className="w-full" defaultValue="account">
        <TabsList className="grid grid-cols-3 gap-4">
          <TabsTrigger value="account">1. Generate Account</TabsTrigger>
          <TabsTrigger value="register">2. Register for Auction</TabsTrigger>
          <TabsTrigger value="bid">3. Place Bid</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Generate Account</CardTitle>
              <CardDescription>
                Creates a keypair for a temporary account and stores it on the frontend.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button onClick={generateAccount}>Generate Account</Button>
              {account && (
                <div id="address-container">
                  <code>
                    {account.address}
                  </code>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register for Auction</CardTitle>
              <CardDescription>Sends an HTTPS request to the backend to fetch a voucher.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button onClick={undefined}>Register for Auction</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bid">
          <Card>
            <CardHeader>
              <CardTitle>Place Bid</CardTitle>
              <CardDescription>
                Sends a message to the auction contract using the fetched voucher and generated account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input id="price" placeholder="Enter price" type="number" />
              <Input id="funding-proof" placeholder="Enter funding proof" type="text" />
              <Button onClick={undefined}>Place Bid</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
