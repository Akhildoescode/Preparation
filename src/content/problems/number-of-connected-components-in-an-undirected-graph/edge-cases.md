## Cases to mention to the interviewer

- **No edges:** edges = []. No unions happen. Return n — every node is its own component.
- **Single node:** n = 1, edges = []. Return 1.
- **Fully connected graph:** All nodes in one component. After processing all edges, components = 1.
- **Duplicate edges:** e.g., edges = [[0,1],[0,1]]. Second edge: find(0) and find(1) have the same root (already merged) → no union, components not decremented again. Handled correctly.
- **Self-loop:** edge = [0,0]. find(0) == find(0) → roots are the same → no union. Handled correctly without special casing.
- **Disconnected graph (no path between some nodes):** e.g., n=4, edges=[[0,1],[2,3]]. Two separate components. Return 2.
- **Star graph:** Node 0 connected to all others. Each edge unites one new node with the existing component. After n-1 edges, components = 1. Path compression keeps `find` efficient even as the star has one central node with many direct children.
