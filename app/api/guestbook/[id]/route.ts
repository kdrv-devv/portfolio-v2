import dbConnect from "@/lib/db";
import Users from "@/models/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import GuestBook from "@/models/GuestBook";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = await Users.findOne({ email: session?.user?.email });

  if (user.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  const updated = await GuestBook.findByIdAndUpdate(
    id,
    { approved: true },
    { new: true }
  );

  return Response.json(updated);
}
