import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FeedbackList = ({ feedbacks, loading }: any) => {

  return (
    <div
      className="
    mt-6 md:mt-8
    mx-auto
    scrollbar-hide
    flex flex-col items-center gap-4
    w-[90%] md:w-[60%]
    py-4
    overflow-y-scroll
    h-[60vh]
  "
    >
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 p-4 w-[90%] md:w-full " />
          ))
        : feedbacks.map((feedback: any, i: number) => (
            <div
              key={i}
              className="flex shadow-md shadow-white relative rounded-2xl glass w-full h-14 items-center justify-between gap-4 p-4 border-b border-white"
            >
              <span className="absolute px-1 glass rounded-md -bottom-[7px] text-js left-2 text-xs">
                {feedback.user?.name}
              </span>
              <p>{feedback.comment}</p>
              <img
                src={feedback.signatureUrl}
                alt="Signature"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          ))}
    </div>
  );
};

export default FeedbackList;
