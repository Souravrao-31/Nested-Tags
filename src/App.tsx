import React, { useState } from "react";
import type { Tag } from "./types";
import TagView from "./component/TagView";

const initialTree: Tag = {
  name: "root",
  children: [
    {
      name: "child-1",
      children: [
        { name: "1stChild", data: " Hello" },
        { name: "2ndChild", data: "---JS----" },
      ],
    },
    { name: "child-2", data: "Some data...." },
    // {}
  ],
};

function updateAtPath(
  tree: Tag,
  path: number[],
  updater: (node: Tag) => Tag
): Tag {
  if (path.length === 0) {
    return updater({ ...tree });
  }
  const [idx, ...rest] = path;
  if (!tree.children) return tree;
  const newChildren = tree.children.map((child, i) =>
    i === idx ? updateAtPath(child, rest, updater) : child
  );
  return { ...tree, children: newChildren };
}

export default function App() {
  const [tree, setTree] = useState<Tag>(initialTree);
  const [exportText, setExportText] = useState<string>("");

  const handleUpdateData = (path: number[], newData: string) => {
    setTree((prev) =>
      updateAtPath(prev, path, (node) => ({ ...node, data: newData }))
    );
  };

  const handleAddChild = (path: number[]) => {
    setTree((prev) =>
      updateAtPath(prev, path, (node) => {
        // if node has data, replace data with children
        if (node.data !== undefined) {
          return {
            name: node.name,
            children: [{ name: "New Child", data: "Data" }],
          };
        }
        // otherwise append a new child
        const existingChildren = node.children ? [...node.children] : [];
        existingChildren.push({ name: "New Child", data: "Data" });
        return { ...node, children: existingChildren };
      })
    );
  };

  const handleUpdateName = (path: number[], newName: string) => {
    setTree((prev) =>
      updateAtPath(prev, path, (node) => ({ ...node, name: newName }))
    );
  };

  // Export: Must only output name/children/data for each node — our Tag type matches that.
  const handleExport = () => {
    setExportText(JSON.stringify(tree, null, 2));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Nested Tags Tree</h1>
      </div>

      <div className="space-y-4">
        <TagView
          node={tree}
          path={[]}
          onUpdateData={handleUpdateData}
          onAddChild={handleAddChild}
          onUpdateName={handleUpdateName}
          isRoot
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleExport}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export JSON
        </button>
      </div>

      <div className="mt-6">
        <label className="block mb-2 font-medium">Exported JSON</label>
        <textarea
          className="w-full h-56 p-3 font-mono text-sm border rounded bg-gray-50"
          value={exportText}
          readOnly
        />
      </div>
    </div>
  );
}
