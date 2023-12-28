import { prisma } from "./config/db";
import LatestIssues from "../components/LatestIssues";
import IssueSummary from "../components/IssueSummary";
import IssueChart from "../components/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
