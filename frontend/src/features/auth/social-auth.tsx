import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SocialAuth() {
  return (
    <div className="grid gap-3">
      <Button variant="secondary" className="w-full" type="button">
        <Github className="h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button variant="secondary" className="w-full" type="button">
        <span className="text-sm font-semibold">G</span>
        Continue with Google
      </Button>
    </div>
  );
}
