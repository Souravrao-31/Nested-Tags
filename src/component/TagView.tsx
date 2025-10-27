import React, { useState, useRef, useEffect } from "react";
import { Tag } from "../types";

type Props = {
  node: Tag;
  path: number[]; // path from root
  onUpdateData: (path: number[], newData: string) => void;
  onAddChild: (path: number[]) => void;
  onUpdateName: (path: number[], newName: string) => void;
  isRoot?: boolean;
};

export default function TagView({ node, path, onUpdateData, onAddChild, onUpdateName, isRoot }: Props) {
  // collapsed state is UI-only (not part of exported tree).
  const [collapsed, setCollapsed] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(node.name);

  // sync nameInput if parent updates name externally
  useEffect(() => {
    setNameInput(node.name);
  }, [node.name]);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (editingName) nameInputRef.current?.focus();
  }, [editingName]);

  const toggleCollapse = () => setCollapsed((c) => !c);

  const handleNameClick = () => {
    setEditingName(true);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitName();
    } else if (e.key === "Escape") {
      setNameInput(node.name);
      setEditingName(false);
    }
  };

  const commitName = () => {
    const trimmed = nameInput.trim();
    if (trimmed.length > 0 && trimmed !== node.name) {
      onUpdateName(path, trimmed);
    }
    setEditingName(false);
  };

  return (
    <div className="pl-4">
      <div className="tag-card p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCollapse}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100"
              aria-label="toggle"
            >
              {collapsed ? ">" : "v"}
            </button>

            <div className="min-w-0">
              {editingName ? (
                <input
                  ref={nameInputRef}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  onBlur={commitName}
                  className="px-2 py-1 rounded border text-sm"
                />
              ) : (
                <div
                  onClick={handleNameClick}
                  className="cursor-pointer select-none bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
                  title="Click to edit name (press Enter to commit)"
                >
                  {node.name}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddChild(path)}
              className="px-3 py-1 rounded border hover:bg-gray-50 text-sm"
            >
              Add Child
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="mt-3 ml-10">
            {node.data !== undefined && (
              <div className="flex items-start gap-3">
                <label className="text-sm w-16 pt-2">Data</label>
                <input
                  value={node.data}
                  onChange={(e) => onUpdateData(path, e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                />
              </div>
            )}

            {node.children && node.children.length > 0 && (
              <div className="mt-3 space-y-3">
                {node.children.map((child, idx) => (
                  <TagView
                    key={idx}
                    node={child}
                    path={[...path, idx]}
                    onUpdateData={onUpdateData}
                    onAddChild={onAddChild}
                    onUpdateName={onUpdateName}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
