import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const AddMembersForm = () => {
  return (
    <form>
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Add new members</h4>
          <p className="text-sm text-muted-foreground">
            You can add new members to this chat to discuss and share ideas.
          </p>
        </div>
        <div className="space-y-4">
          <Input
            name="email"
            type="email"
            label="Enter email address"
            autoFocus
          />
          <Button type="submit" size="sm" className="w-full">
            Add member
          </Button>
        </div>
      </div>
    </form>
  );
};
