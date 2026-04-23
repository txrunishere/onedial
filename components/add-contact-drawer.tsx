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
import { Save } from "lucide-react";
import { useState } from "react";
import { addContactAction } from "@/lib/actions";

export const AddContactDrawer = ({ user }: { user: any }) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>(
    `Hi, it's ${user.firstName}. My phone isn't available, it's either flat, lost, broken or stolen. I'm sending this from a borrowed device. Please call me back on this number.`,
  );
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value);

  const handleAddContact = async () => {
    setLoading(true);

    const res = await addContactAction({
      name,
      phone,
      messageTemplate: message,
      userId: user.id,
    });

    setLoading(false);

    if (!res.success) {
      console.log(res.error);
      return;
    }

    setName("");
    setPhone("");
    setMessage("");
  };

  return (
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
          <Button
            variant={"secondary"}
            onClick={handleAddContact}
            disabled={loading}
          >
            <Save />
            {loading ? "Saving..." : "Save"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
