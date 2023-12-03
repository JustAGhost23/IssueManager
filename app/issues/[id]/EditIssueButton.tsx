import { HiOutlinePencil } from "react-icons/hi2";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const CreateNewIssueButton = () => {
  return (
    <div className="mb-4">
      <Button>
        <HiOutlinePencil />
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default CreateNewIssueButton;
