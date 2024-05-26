'use client'
import { CheckCheck, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}
const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);

    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000)
  }
  const Icon = isCopied ? CheckCheck : Copy
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={onCopy}
      disabled={!value || isCopied}
    >
      <Icon className="size-4" />
    </Button>

  )
}

export default CopyButton
