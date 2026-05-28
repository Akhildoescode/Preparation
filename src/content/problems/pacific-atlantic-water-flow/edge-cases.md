## Cases to mention to the interviewer

- **1x1 grid:** The single cell touches both the Pacific (top-left border) and the Atlantic (bottom-right border). It is always in the answer.
- **1xN or Mx1 grid (single row or column):** Every cell is on both borders simultaneously. All cells are in the answer.
- **Uniform height matrix:** All cells have the same height. Water can flow between any adjacent cells (equal height is allowed). All cells can reach both oceans — the answer is every cell.
- **Strictly increasing from top-left to bottom-right:** Only cells on one border can reach the Pacific, and only cells on the other border can reach the Atlantic. Few cells intersect.
- **Strictly decreasing from top-left (mountain shape):** The highest cells in the interior can drain in all directions and reach both oceans; low cells near one border can only reach one ocean.
- **No cells in the answer:** Possible if the terrain strictly funnels water toward one ocean from every interior cell — though with the equal-height rule and border definitions, this requires careful construction.
- **Large flat plateau bordered by drops:** The entire plateau is reachable from both oceans if any border cell is on the plateau, but cells that drain exclusively into one ocean won't be in the intersection.
