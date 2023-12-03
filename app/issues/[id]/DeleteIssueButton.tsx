import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div className="mb-4">
      <Button color="red">
        <MdDeleteOutline />
        Delete Issue
      </Button>
    </div>
  );
};

export default DeleteIssueButton;
