import { useLayoutEffect, useRef, useState } from "react";
import type { AppStoreResult } from "./useAppStoreSearch";
import useAppStoreSearch from "./useAppStoreSearch";

export default function AppSelectorDialog({ selecting, onClose, onSelect }: {
  selecting: "left" | "right" | undefined,
  onClose: () => void,
  onSelect: (app: AppStoreResult) => void
}) {
  const [search, setSearch] = useState("");
  const { loading, error, results } = useAppStoreSearch(search);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [lastSelecting, setLastSelecting] = useState(selecting);
  if (selecting !== lastSelecting) {
    if (selecting !== undefined) {
      dialogRef.current?.showModal();
      searchInputRef.current?.focus();
    } else {
      dialogRef.current?.close();
    }
    setLastSelecting(selecting);
  }

  useLayoutEffect(() => {
    const handler = () => {
      onClose();
      setSearch("");
    };
    dialogRef.current!.addEventListener("close", handler);
    return () => dialogRef.current!.removeEventListener("close", handler);
  }, [dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      className="mx-auto my-15 lg:my-auto p-4 border border-gray-700 shadow-2xl w-full max-w-[800px] overflow-y-scroll"
    >
      <div className="flex flex-row justify-between">
        <h2 className="font-bold">Choose {selecting} app</h2>
        <button className="cursor-pointer" onClick={onClose}>Close</button>
      </div>
      <input
        ref={searchInputRef}
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-500 w-full px-2 py-1 rounded-lg my-2"
      />
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 pb-5">
        {results?.map(result =>
          <button key={result.id}
            className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
            onClick={() => {
              onSelect(result);
              onClose();
            }}
          >
            {/* TODO: reserve aspect ratio */}
            <img src={result.iconUrl512} className="rounded-2xl shadow" />
            <span className="text-sm">{result.name}</span>
          </button>
        )}
      </div>
      {loading && "Loading..."}
      {error && "Oh no!"}
    </dialog>
  )
};
