"use client";

import React from "react";
import { Mention, MentionsInput } from "react-mentions";

import { cn } from "@/lib/utils";
import { TextArea, textAreaVariants } from "@/components/ui/TextArea";

import { defaultStyle } from "./mention-input-default-style";

type ChatTextAreaProps = React.ComponentPropsWithRef<typeof TextArea>;

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

export const ChatInput = ({ value, onChange, ref }: ChatTextAreaProps) => {
  return (
    // <TextArea
    //   placeholder="Ask me anything"
    //   containerClassName="max-w-full"
    //   className="pb-14"
    //   minRows={2}
    //   ref={props.ref}
    //   {...props}
    // />
    <MentionsInput
      ref={ref}
      value={value}
      onChange={(e) => {
        onChange?.({
          target: {
            value: e.target.value,
          },
        });
      }}
      style={defaultStyle}
      className={cn(
        textAreaVariants,
        "min-h-32 max-w-full [&_textarea]:border [&_textarea]:p-2"
      )}
      placeholder={"Mention people using '@'"}
      a11ySuggestionsListLabel={"Suggested mentions"}
    >
      <Mention
        markup="@[__display__](user:__id__)"
        trigger="@"
        data={data}
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
        // style={{
        //   backgroundColor: "#cee4e5",
        // }}
      />
    </MentionsInput>
  );
};
