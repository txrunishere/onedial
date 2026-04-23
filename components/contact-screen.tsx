"use client";

import { useUser } from "@/context/user-context";
import { Badge } from "./ui/badge";
import { Computer, Phone } from "lucide-react";

import { AddContactDrawer } from "./add-contact-drawer";

export const ContactScreen = () => {
  const { contactDevice, user } = useUser();
  const isPersonal = contactDevice === "personal";

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
          <div>Contacts</div>
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
