import authOptions from "../../auth/auth";
import { getServerSession } from "next-auth";
import { updateIssueSchema } from "../../../zodSchemas";
import { prisma } from "../../../config/db";
import { NextRequest, NextResponse } from "next/server";
import { Issue } from "@prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = updateIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description, status } = body;

  if (assignedToUserId && assignedToUserId !== "Unassigned") {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  let updatedIssue: Issue | null;

  if (body.status) {
    updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        status: body.status,
      },
    });
  }

  if (body.assignedToUserId !== "Unassigned") {
    updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        assignedToUserId: body.assignedToUserId,
      },
    });
  } else {
    updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        assignedToUserId: null,
      },
    });
  }

  if (!body.description) {
    if (!body.title) {
    } else {
      updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
          title: body.title,
        },
      });
    }
  } else {
    if (!body.title) {
      updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
          description: body.description,
        },
      });
    } else {
      updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
          title: body.title,
          description: body.description,
        },
      });
    }
  }
  if (!updatedIssue) {
    return NextResponse.json(
      { error: "Something went wrong while updating issue" },
      { status: 500 }
    );
  }

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
