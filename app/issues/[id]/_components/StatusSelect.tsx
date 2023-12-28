"use client";

import { Issue, Status, User } from "@prisma/client";
import { Select, Button } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const status = [Status.OPEN, Status.IN_PROGRESS, Status.CLOSED];
  let currentStatus = issue.status;

  const setStatus = (status: Status) => {
    axios
      .post("/api/issues/" + issue.id, {
        status: status,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
    router.refresh();
  };
  const changeStatus = (status: Status) => {
    currentStatus = status;
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {status?.map((status) => (
              <Select.Item key={status} value={status}>
                {status}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
      <Button onClick={() => setStatus(currentStatus)}>Update Status</Button>
    </>
  );
};

export default StatusSelect;
