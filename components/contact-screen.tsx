"use client";

import { useUser } from "@/context/user-context";
import { Badge } from "./ui/badge";
import {
  Computer,
  Copy,
  MessageSquare,
  MoreVertical,
  Phone,
} from "lucide-react";

import { AddContactDrawer } from "./add-contact-drawer";

export const ContactScreen = () => {
  const { contactDevice, user } = useUser();
  const isPersonal = contactDevice === "personal";

  console.log(user.contacts);

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
          <div className="mt-6">
            <p className="text-sm text-gray-400">Contacts</p>
            {user?.contacts?.map((contact: any) => (
              <div className="mt-2 w-full max-w-md rounded-3xl bg-[#1f2937] p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-xl font-semibold">
                      {contact.name.charAt(0)}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold tracking-wide">
                        {contact.name}
                      </h2>
                      <p className="text-sm text-gray-400">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400">
                    <Copy className="h-5 w-5 cursor-pointer hover:text-white" />
                    <MoreVertical className="h-5 w-5 cursor-pointer hover:text-white" />
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gray-700/60 py-3 transition hover:bg-gray-600">
                    <MessageSquare className="h-5 w-5" />
                    Message
                  </button>

                  <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gray-700/60 py-3 transition hover:bg-gray-600">
                    <Phone className="h-5 w-5" />
                    Call
                  </button>
                </div>
              </div>
            ))}
          </div>
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

      <AddContactDrawer user={user} />
    </div>
  );
};
