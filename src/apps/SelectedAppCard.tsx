import type { AppStoreResult } from "./useAppStoreSearch";

export default function SelectedAppCard({ app, onClick }: { app?: AppStoreResult, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-xl border border-gray-400 flex flex-row p-2 gap-3 items-center whitespace-nowrap overflow-hidden text-ellipsis flex-1`}
    >
      {app
        ? <img src={app.iconUrl512} alt={app ? `Icon for ${app.name}` : "Unselected app"} className="h-[3em] rounded-2xl" />
        : <div className="bg-gray-300 rounded-2xl h-[3em] w-[3em]"></div>
      }

      <div className="flex flex-col gap text-left">
        <span className="font-bold">{app?.name ?? "Select app"}</span>
        <span className="text-sm text-gray-700">{app?.author ?? ""}</span>
      </div>
    </button>
  )
}
