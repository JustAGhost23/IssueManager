"use client";

import { Issue, User } from "@prisma/client";
import Skeleton from "../../../../components/Skeleton";
import { Select, Button } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();
  let currentAssignee = issue.assignedToUserId || "Unassigned";

  const assignIssue = (userId: string) => {
    axios
      .post("/api/issues/" + issue.id, {
        assignedToUserId: userId,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
    router.refresh();
  };
  const changeAssignee = (userId: string) => {
    currentAssignee = userId;
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={changeAssignee}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
      <Button onClick={() => assignIssue(currentAssignee)}>
        Update Assignee
      </Button>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
