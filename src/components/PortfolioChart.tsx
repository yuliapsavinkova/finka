// import { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import { useQuery } from "@tanstack/react-query";

// // Fetch trades from Google Sheets API
// async function fetchTrades() {
//   const response = await fetch("/api/get-trades"); // Replace with your actual API route
//   return response.json();
// }

// const PortfolioChart = () => {
//   const {
//     data: trades,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["trades"],
//     queryFn: fetchTrades,
//   });

//   const chartRef = useRef<SVGSVGElement | null>(null);
//   const [portfolioData, setPortfolioData] = useState<{ symbol: string; amount: number }[]>([]);

//   useEffect(() => {
//     if (!trades) return;

//     // Aggregate stock holdings
//     const stockMap: Record<string, number> = {};
//     trades.forEach(([symbol, quantity]) => {
//       stockMap[symbol] = (stockMap[symbol] || 0) + Number(quantity);
//     });

//     const data = Object.entries(stockMap).map(([symbol, amount]) => ({ symbol, amount }));
//     setPortfolioData(data);

//     drawChart(data);
//   }, [trades]);

//   const drawChart = (data: { symbol: string; amount: number }[]) => {
//     if (!chartRef.current) return;

//     const width = 300,
//       height = 300,
//       radius = Math.min(width, height) / 2;
//     const svg = d3
//       .select(chartRef.current)
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2}, ${height / 2})`);

//     const color = d3.scaleOrdinal(d3.schemeCategory10);
//     const pie = d3.pie<{ symbol: string; amount: number }>().value((d) => d.amount);
//     const arc = d3.arc<d3.PieArcDatum<{ symbol: string; amount: number }>>().innerRadius(0).outerRadius(radius);

//     const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

//     arcs
//       .append("path")
//       .attr("d", arc as any)
//       .attr("fill", (d, i) => color(d.data.symbol) as string);

//     arcs
//       .append("text")
//       .attr("transform", (d) => `translate(${arc.centroid(d)})`)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "12px")
//       .text((d) => d.data.symbol);
//   };

//   return (
//     <div>
//       <h2>Portfolio Overview</h2>
//       {isLoading && <p>Loading trades...</p>}
//       {error && <p>Error loading trades</p>}
//       {!isLoading && trades && (
//         <>
//           <table>
//             <thead>
//               <tr>
//                 <th>Stock</th>
//                 <th>Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {portfolioData.map(({ symbol, amount }) => (
//                 <tr key={symbol}>
//                   <td>{symbol}</td>
//                   <td>{amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <svg ref={chartRef}></svg>
//         </>
//       )}
//     </div>
//   );
// };

// export default PortfolioChart;
