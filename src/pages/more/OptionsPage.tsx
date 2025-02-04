import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDocumentTitle, useStore } from "../../store";

export function OptionsPage() {
  const navigate = useNavigate();

  const [hide_track_page_stats, internal_set_hide_track_page_stats] = useState(
    localStorage.getItem("hide_track_page_stats") === "true",
  );
  const setHideTrackPageStats = (value: boolean) => {
    localStorage.setItem("hide_track_page_stats", String(value));
    internal_set_hide_track_page_stats(value);
  };

  return (
    <div className="flex h-full flex-col">
      <button className="w-full p-2 text-start" onClick={() => navigate(-1)}>
        &lt; Back
      </button>
      <hr />
      <div className="overflow-y-scroll">
        <h1 className="px-2 py-1 text-2xl">Options</h1>
        <div className="px-2">
          <label className="label cursor-pointer">
            <span className="label-text">Hide Stats Summary on Track Page</span>
            <input
              type="checkbox"
              checked={hide_track_page_stats}
              onChange={() => setHideTrackPageStats(!hide_track_page_stats)}
            />
          </label>
          <DocumentTitleOption />
        </div>
      </div>
    </div>
  );
}

function DocumentTitleOption() {
  const currentDocumentTitle = useStore((state) => state.documentTitle);
  const [title, setTitle] = useState(currentDocumentTitle);

  const updateTitle = () => {
    setDocumentTitle(title);
  };
  return (
    <label className="label cursor-pointer">
      <span className="label-text">Document Title</span>
      <input
        className="flex-grow mx-3"
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <button className="btn" onClick={updateTitle}>
        Update Title
      </button>
    </label>
  );
}
