import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../config/db";
import { createIssueSchema } from "../../zodSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  if (!newIssue) {
    return NextResponse.json(
      { error: "Something went wrong while creating new issue" },
      { status: 500 }
    );
  }

  return NextResponse.json(newIssue, { status: 201 });
}
