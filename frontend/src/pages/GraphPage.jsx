import { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

// const API_URL = import.meta.env.BACKEND_API_URL;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function GraphPage() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const fgRef = useRef();

  useEffect(() => {
    console.log("fetching:", `${API_URL}/api/notes/graph`);
    fetch(`${API_URL}/api/notes/graph`)
      .then(r => r.json())
      .then(data => { setGraphData(data); setLoading(false); })
      .catch(() => { setError("Failed to load graph"); setLoading(false); });
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading graph...</p>;
  if (error)   return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-medium">Knowledge Graph</h1>
        <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          {graphData.nodes.length} notes &nbsp;·&nbsp; {graphData.links.length} connections
        </p>
      </div>

      <div className="flex-1">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeId="id"
          nodeLabel="title"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label   = node.title;
            const fontSize = Math.max(10 / globalScale, 4);
            const r       = 6;

            ctx.beginPath();
            ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
            ctx.fillStyle   = node.status === "done" ? "#7F77DD" : "#B4B2A9";
            ctx.fill();

            if (globalScale > 0.8) {
              ctx.font          = `${fontSize}px Sans-Serif`;
              ctx.fillStyle     = "#444441";
              ctx.textAlign     = "center";
              ctx.textBaseline  = "top";
              ctx.fillText(label, node.x, node.y + r + 2);
            }
          }}
          linkWidth={link => link.similarity * 3}
          linkColor={() => "#B4B2A9"}
          onNodeClick={node => {
            window.location.href = `/note/${node.id}`;
          }}
          cooldownTicks={100}
          onEngineStop={() => fgRef.current?.zoomToFit(400, 40)}
        />
      </div>
    </div>
  );
}