import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilter from "./StatusFilter";

const CreateNewIssueButton = () => {
  return (
    <Flex mb="4" justify="between">
      <StatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default CreateNewIssueButton;
