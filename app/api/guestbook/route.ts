import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import GuestBook from "@/models/GuestBook";
import Users from "@/models/Users";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {

  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { comment, signature } = await req.json();

  if (!signature.startsWith("data:image")) {
    return new Response("Invalid signature format", { status: 400 });
  }
  const user = await Users.findOne({ email: session.user?.email });

  const upload = await cloudinary.uploader.upload(signature, {
    folder: "guestbook-signatures",
  });

  const entry = await GuestBook.create({
    user,
    comment,
    signatureUrl: upload.secure_url,
  });

  return Response.json(entry);
}


export async function GET(req:Request){
    await dbConnect()


    let feedbacks = await GuestBook.find({ approved: true }).populate("user", "name email image");
    
    return Response.json(feedbacks);   

}