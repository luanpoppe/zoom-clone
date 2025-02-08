import { PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type MeetingModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose: CallableFunction;
  title: string;
  className?: string;
  buttonText?: string;
  handleClick?: CallableFunction;
  image?: string;
  buttonIcon?: string;
};

export function MeetingModal({
  buttonText,
  className,
  handleClick,
  isOpen,
  onClose,
  title,
  children,
  buttonIcon,
  image,
}: MeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" height={72} width={72} />
            </div>
          )}

          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>

          {children}

          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => {
              if (handleClick) handleClick();
            }}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                height={13}
                width={13}
              />
            )}{" "}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
