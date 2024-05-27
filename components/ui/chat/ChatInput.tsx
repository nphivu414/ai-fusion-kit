"use client";

import React from "react";
import { Mention, MentionsInput, MentionsInputProps } from "react-mentions";

import { cn } from "@/lib/utils";
import { textAreaVariants } from "@/components/ui/TextArea";

import { defaultStyle } from "./mention-input-default-style";

type ChatTextAreaProps = Omit<MentionsInputProps, "children">;

const data = [
  {
    id: "assistant",
    display: "Assistant",
  },
  {
    id: "vu",
    display: "Vu",
  },
];

export const ChatInput = (props: ChatTextAreaProps) => {
  return (
    <MentionsInput
      style={defaultStyle}
      className={cn(
        textAreaVariants,
        "min-h-32 max-w-full [&_textarea]:border [&_textarea]:p-2"
      )}
      placeholder={"Mention people using '@'"}
      a11ySuggestionsListLabel={"Suggested mentions"}
      {...props}
    >
      <Mention
        markup="@[__display__](user:__id__)"
        trigger="@"
        data={data}
        appendSpaceOnAdd
        renderSuggestion={(
          suggestion,
          search,
          highlightedDisplay,
          index,
          focused
        ) => (
          <div className={`user ${focused ? "focused" : ""}`}>
            {highlightedDisplay as any}
          </div>
        )}
        className="bg-primary/40"
      />
    </MentionsInput>
  );
};
