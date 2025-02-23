/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MeetingCard } from "./MeetingCard";
import { Loader } from "./Loader";
import { useToast } from "@/hooks/use-toast";

type CallListProps = {
  type: "upcoming" | "ended" | "recordings";
};

export function CallList({ type }: CallListProps) {
  const { endedCalls, isLoading, callRecordings, upcomingCalls } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  function getCalls() {
    if (type === "ended") return endedCalls;
    if (type === "recordings") return recordings;
    if (type === "upcoming") return upcomingCalls;
    return [];
  }

  function getNoCallsMessage() {
    if (type === "ended") return "No Previous Calls";
    if (type === "recordings") return "No Recordings";
    if (type === "upcoming") return "No Upcoming Calls";
    return "";
  }

  useEffect(() => {
    async function fetchRecordings() {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );
        const recordings = callData
          .filter((call) => call.recordings.lenght > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        console.error(error);
        toast({
          title: "Try again later",
        });
      }
    }
    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings]);

  const calls = getCalls();
  console.log("calls: ", calls);
  const noCallMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 25) ||
              meeting?.filename?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`meeting/${meeting.id}`)
            }
          />
        ))
      ) : (
        <h1>{noCallMessage}</h1>
      )}
    </div>
  );
}
