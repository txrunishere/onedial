"use client";

import { useUser } from "@/context/user-context";
import { Badge } from "./ui/badge";
import { Computer, Phone, Save } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export const ContactScreen = () => {
  const { contactDevice, user } = useUser();
  const isPersonal = contactDevice === "personal";

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>(
    `Hi, it's ${user.firstName}. My phone isn't available, it's either flat, lost, broken or stolen. I'm sending this from a borrowed device. Please call me back on this number.`,
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value);

  return (
    <div className="px-2 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold">One Dial</h3>
          <Badge variant={"secondary"}>
            {isPersonal ? (
              <span className="flex items-center gap-1">
                <Phone size={12} /> Personal
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Computer size={12} /> Borrowed
              </span>
            )}
          </Badge>
        </div>
        <div>
          <div className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-blue-300 font-bold text-black">
            {user.firstName?.[0]}
          </div>
        </div>
      </div>

      <div>
        {user.contacts.length > 0 ? (
          <div></div>
        ) : (
          <div className="mt-10">
            <h5 className="text-center text-xl font-semibold text-gray-400">
              No contacts yet
            </h5>
            <p className="text-center text-sm text-gray-400">
              Tap + to add your first contact.
            </p>
          </div>
        )}
      </div>

      <Drawer>
        <DrawerTrigger className="absolute right-10 bottom-8 flex size-14 cursor-pointer items-center justify-center rounded-xl bg-blue-300 text-3xl text-neutral-600">
          +
        </DrawerTrigger>
        <DrawerContent className="mx-auto max-w-md rounded-t-2xl border-none bg-[#14192b] text-white">
          <DrawerHeader>
            <DrawerTitle className="text-start text-lg font-semibold text-white">
              Add contact
            </DrawerTitle>
          </DrawerHeader>

          <div className="space-y-4 px-4">
            <div className="space-y-2">
              <label>Name</label>
              <Input
                type="text"
                placeholder="Full name"
                className="border-zinc-700 bg-transparent focus:ring-gray-500"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="space-y-2">
              <label>Phone number</label>
              <Input
                type="text"
                placeholder="+1 234 567 8900"
                className="border-zinc-700 bg-transparent focus:ring-gray-500"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="space-y-2">
              <label>Message template</label>
              <Textarea
                className="h-28 border-zinc-700 bg-transparent focus:ring-gray-500"
                value={message}
                onChange={handleMessageChange}
              />
              <p className="text-xs text-zinc-400">
                Customise the default message for this contact.
              </p>
            </div>
          </div>

          <DrawerFooter className="flex flex-row justify-end">
            <Button variant={"ghost"}>Cancel</Button>
            <Button variant={"secondary"}>
              <Save />
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
