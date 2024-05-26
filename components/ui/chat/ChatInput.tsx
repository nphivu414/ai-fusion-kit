"use client";

import React from "react";
import { Mention, MentionsInput } from "react-mentions";

import { TextArea } from "@/components/ui/TextArea";

import { defaultStyle } from "./mention-input-default-style";

type ChatTextAreaProps = React.ComponentPropsWithRef<typeof TextArea>;

const data = [
  {
    id: "assistant",
    display: "assistant",
  },
  {
    id: "vu",
    display: "vu",
  },
];

export const ChatInput = ({ value, onChange }: ChatTextAreaProps) => {
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
      value={value}
      onchange
      onChange={(e) => {
        onChange?.({
          target: {
            value: e.target.value,
          },
        });
      }}
      style={defaultStyle}
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
        // onAdd={onAdd}
        style={{
          backgroundColor: "#cee4e5",
        }}
      />
    </MentionsInput>
  );
};
