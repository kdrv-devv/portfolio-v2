"use client";
import Ballpit from "@/components/bubble-bg";
import Header from "@/components/header";
import SignaturePad from "@/components/signature-pad";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import FeedbackList from "./feedback-list";
import { toast } from "sonner";

const Guestbook = () => {
  const { data: session, status } = useSession();
  const [signature, setSignature] = React.useState<any>("");
  const [comment, setComment] = React.useState("");
  const [feedbacks, setFeedbacks] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const getFeedbacks = async () => {
    setLoading(true);
    const res = await fetch("/api/guestbook");
    const data = await res.json();
    setFeedbacks(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getFeedbacks();
  }, []);

  const publishComment = async () => {
    if (comment.trim() === "") {
      return toast.info("Please enter a feedback !", {
        position: "top-center",
      });
    }

    if (!comment.trim() || !signature) {
      return toast.info("Please enter a feedback and signature !", {
        position: "top-center",
      });
    }

    let response: any = await fetch("/api/guestbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, signature }),
    });
    toast.success("Feedback submitted successfully !", {
      position: "top-center",
    });
    let data = await response.json();
    console.log(data);
    setFeedbacks([data, ...feedbacks]);
    setComment("");
    setSignature("");
    setOpen(false); 
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        width: "100%",
      }}
      className="!bg-[#060010]"
    >
      <Ballpit
        count={70}
        gravity={0.5}
        friction={0.9975}
        wallBounce={0.95}
        colors={["#2d15c2", "#e2e2e2", "#1a1a1a", "#5639d1", "#fff"]}
        followCursor={false}
      />

      <div className="fixed inset-0 h-[100vh]  z-30">
        <Header />
        <div className="flex items-center justify-center flex-col  ">
          {status == "loading" ? null : session && session.user ? (
            <p className="text-xl mb-1 text-center">
              Hi{" "}
              <span className="font-bold border-b border-white">
                {session?.user?.name}
              </span>{" "}
              ! You can now write your feedback.
            </p>
          ) : null}
          {status == "loading" ? null : !session ? (
            <button
              onClick={() => signIn("google", { callbackUrl: "/guestbook" })}
              className="px-4 py-2 hover:bg-white/90 hover:scale-105 active:scale-100 transition-all duration-200 cursor-pointer bg-white text-black rounded-lg"
            >
              <FcGoogle className="inline mr-2 text-2xl" />
              Sign in with Google
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="px-4 hover:bg-white/90 cursor-pointer hover:scale-105 active:scale-100 transition-all duration-200 py-2 bg-white text-black rounded-lg"
            >
              Sign out
            </button>
          )}
        </div>
        <div className="flex items-center justify-center flex-col ">
          <div className="my-3  flex items-center justify-center gap-2 w-full md:w-[60%]">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Feedback..."
              className="bg-transparent outline-js border border-white rounded-2xl p-2 w-[60%] md:w-[70%]"
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  onClick={() => {
                    if (!session) {
                      toast.info("Please sign in with Google !", {
                        position: "top-center",
                      });
                    }else{
                      setOpen(true)
                    }
                  }}
                  className="ml-2 px-4 py-2 hover:bg-white/90 hover:scale-105 active:scale-100 transition-all duration-200 bg-white cursor-pointer text-black rounded-2xl"
                >
                  Submit
                </button>
              </PopoverTrigger>

              {session && (
                <PopoverContent className="w-80">
                  <SignaturePad
                    setSignature={setSignature}
                    publishComment={publishComment}
                    loading={loading}
                  />
                </PopoverContent>
              )}
            </Popover>
          </div>

          <div className="flex w-full  items-center justify-center flex-col ">
            <FeedbackList feedbacks={feedbacks} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
