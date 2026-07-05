import { Badge } from "@/components/ui/badge";
import { CreateProjectWizard } from "@/features/projects/create-project-wizard";

export default function CreateProjectPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Badge>Project discovery</Badge>
      <div className="mb-8 mt-4 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Help Forge understand your idea</h1>
        <p className="mt-3 text-muted-foreground">
          Answer one question at a time. Forge will build context before giving advice.
        </p>
      </div>
      <CreateProjectWizard />
    </div>
  );
}
