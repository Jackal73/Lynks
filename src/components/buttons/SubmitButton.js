import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className = "" }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        "bg-[#5b47e0a6] disabled:bg-amber-500 text-[#9b9b9b] disabled:text-gray-200 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center " +
        className
      }
    >
      {pending && <span>Saving...</span>}
      {!pending && children}
    </button>
  );
}
