"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "./ui/rainbow-button";

export function RainbowButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <RainbowButton variant="glass_2" size="lg" className="rounded-xl">
        Glass (Default)
      </RainbowButton>
      <RainbowButton variant="light" size="default">
        Light
      </RainbowButton>
      <RainbowButton variant="dark" size="default">
        Dark
      </RainbowButton>
      <RainbowButton variant="outline" size="default">
        Outline
      </RainbowButton>
      <Button>shadcn Default</Button>
      <Button variant="outline">shadcn Outline</Button>
      <Badge>Badge Works</Badge>
    </div>
  );
}
