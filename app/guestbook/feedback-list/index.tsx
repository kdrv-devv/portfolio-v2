import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FeedbackList = ({ feedbacks, loading }: any) => {
  return (
    <div
      className="
    mt-6 md:mt-8
    grid gap-4 grid-cols-1 sm:grid-cols-2
    w-full md:w-[50%]
    overflow-y-auto
    scrollbar-hide
  "
    >
      { loading ? (
        Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 p-4 w-[90%] md:w-full "/>)  
      ) : (
        feedbacks.map((feedback: any, i: number) => (
          <div
            key={i}
            className="flex relative rounded-2xl glass w-full h-14 items-center justify-between gap-4 p-4 border-b border-white"
          >
            <span className="absolute px-1 glass rounded-md -bottom-[7px] text-js left-2 text-xs">{feedback.user?.name}</span>
            <p>{feedback.comment}</p>
            <img
              src={feedback.signatureUrl}
              alt="Signature"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
