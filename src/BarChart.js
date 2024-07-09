import React from "react";
import { scaleLinear,scaleBand,max } from "d3";
const BarChart=({width, height,data}) =>{
    const margin=10
    const lines=[10,20,30,40]
//Scales
    const xScale=scaleLinear()
    .domain([0,max(data, (d)=>d.sunshine)])
    .range([0,width-2 * margin])
    
    const yScale=scaleBand()
    .domain(data)
    .range([0,height-2*margin])
    
    const rectangles = data.map((d,i)=>(
        <rect
        key={d.city}
        x={margin}
        y={yScale(d)}
        height={yScale.bandwidth()}
        width={xScale(d.sunshine)}
        fill='darkorange'
        stroke='#FFF'
        ></rect>
    ))

    //Add Text Labels
    const labels=data.map((d)=>(
        <text 
        fill='#FFF'
        textAnchor="end" 
        key={d.city} 
        x={xScale(d.sunshine)}
        y={yScale(d)+15}
        >
            {d.city}
        </text>
    ))
   const gridlines=lines.map((l,i) =>(
    <g  key={i}>
        <line
       
         y1={0}
         y2={height-margin}
         x1={xScale(l)}
            x2={xScale(l)}
            stroke='#FFF'
        ></line>
        <text 
        textAnchor="'middle" 
        fontsize='15px'
        x={xScale(l)} 
        y={height-margin}
        >{l}</text>
     <text></text>
    </g>
   ))
   

    return <svg viewBox={`0 0 ${width} ${height}`}>
        {rectangles}
        {gridlines}
        {labels}
        </svg>
}

export default BarChart