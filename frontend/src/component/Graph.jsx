import React from 'react'
import ReactFlow from "react-flow-renderer";


const Graph = ({ path }) => {
    const start = path[0];
    const end = path[path.length - 1];

    const nodes = [
        {
            id: "A", data: { label: "Delhi" }, position: { x: 50, y: 100 },
            style: {
                background: start === "A" ? "green" : end === "A" ? "blue" : "#fff",
                color: start === "A" || end === "A" ? "#fff" : "#000",

            },
        },
        {
            id: "B", data: { label: "Noida" }, position: { x: 200, y: 50 },
            style: {
                background: start === "B" ? "green" : end === "B" ? "blue" : "#fff",
                color: start === "B" || end === "B" ? "#fff" : "#000",
            },
        },

        {
            id: "C", data: { label: "Gurugaon" }, position: { x: 200, y: 150 },
            style: {
                background: start === "C" ? "green" : end === "C" ? "blue" : "#fff",
                color: start === "C" || end === "C" ? "#fff" : "#000",

            },
        },
        {
            id: "D", data: { label: "Ghaziabad" }, position: { x: 350, y: 100 },
            style: {
                background: start === "D" ? "green" : end === "D" ? "blue" : "#fff",
                color: start === "D" || end === "D" ? "#fff" : "#000",

            },
        },
    ];

    // dynamic edges 
    const baseEdges = [
        { source: "A", target: "B" },
        { source: "A", target: "C" },
        { source: "B", target: "D" },
        { source: "C", target: "D" },
    ];

    const edges = baseEdges.map((edge, index) => {
        let isPath = false;

        // check if edge is in shortest path
        for (let i = 0; i < path.length - 1; i++) {
            if (
                (edge.source === path[i] && edge.target === path[i + 1]) ||
                (edge.source === path[i + 1] && edge.target === path[i])

            ) {
                isPath = true;
            }
        }
        return {
            id: index.toString(),
            source: edge.source,
            target: edge.target,
            animated: isPath,
            style: {
                stroke: isPath ? "red" : "grey",
                strokeWidth: isPath ? 3 : 1,
            },
        };
    });



    return (
        <div style={{ height: "300px", border: "1px solid #ccc" }}>
            <ReactFlow nodes={nodes} edges={edges} />

        </div>
    );
};

export default Graph;
