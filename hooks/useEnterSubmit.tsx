import { useRef, type RefObject } from "react";

type KeyboardEvent =
  | React.KeyboardEvent<HTMLTextAreaElement>
  | React.KeyboardEvent<HTMLInputElement>;

export function useEnterSubmit(): {
  formRef: RefObject<HTMLFormElement>;
  onKeyDown: (event: KeyboardEvent) => void;
} {
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit();
      event.preventDefault();
    }
  };

  return { formRef, onKeyDown: handleKeyDown };
}
