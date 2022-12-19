import "./styles.css";
import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow";
import "reactflow/dist/style.css";

export default function App() {
  const initNodes = [
    {
      id: "root",
      position: { x: 0, y: 0 },
      type: "input",
      data: { label: "root" }
    },
    {
      id: "group1",
      data: { label: "Group A" },
      position: { x: 0, y: 50 },
      style: {
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        width: 400,
        height: 150
      }
    },
    {
      id: "1",
      parentNode: "group1",
      position: { x: 20, y: 50 },
      data: { label: "node1" }
    },
    {
      id: "1b",
      type: "output",
      parentNode: "group1",
      position: { x: 200, y: 50 },
      data: { label: "node1-b" }
    },
    { id: "2", position: { x: 100, y: 280 }, data: { label: "node2" } },
    { id: "3", position: { x: 300, y: 280 }, data: { label: "node3" } }
  ];

  const initEdges = [
    { id: "root-1", source: "root", target: "1" },
    {
      id: "root-b",
      source: "root",
      target: "1b",
      label: "straight edge",
      type: "straight",
      animated: true
    },
    { id: "1-2", source: "1", target: "2", label: "to the", type: "step" }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddNode = () => {
    const newNode = {
      id: `${Math.random()}`,
      position: { x: 200, y: 0 },
      data: { label: "new node" }
    };
    setNodes((nds) => nds.concat(newNode));
    console.log(nodes);
  };

  return (
    <div style={{ height: "500px" }}>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <button onClick={onAddNode}>Add Node</button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
