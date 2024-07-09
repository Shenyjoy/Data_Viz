import React,{useRef, useState,useInsertionEffect, useEffect} from "react";
import {getData} from './utils.js'
import { scaleLinear,select } from "d3";

let colors=['#2176ae','57b8ff','#b66d0d','#fbb13c','#fe6847']
function Circles({width,height}) {
    //store the data in the state
    const [data,setData]=useState(getData())
    //store a Ref to the SVG that will allow D3 to access the DOM element
    const svgRef=useRef()

    const handleClick=() =>setData(getData())
    //when daa or dimension change, update the circle attributes- color, size and position
    useEffect(()=>{
        const maxRadius=40
        let xScale=scaleLinear().domain([0,1]).range([0,width])
        let yScale=scaleLinear().domain([0,1]).range([height,0])
        let rScale=scaleLinear().domain([0,1]).range([0,maxRadius])

        select(svgRef.current)
            .selectAll('circle')
            .data(data)
            .transition()
            .duration(1000)
            .attr('cx',(d)=>xScale(d.x))
            .attr('cy',(d)=>yScale(d.y))
            .attr('r',d=>rScale(d.r))
            .style('fill',(d)=>colors[d.color])


    }, data,width,height)
    console.log(svgRef.current)
    return (
        <div>
            <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
                {data.map(d=> <circle>fill='#FFF</circle>)}
            </svg>
            <div>
            <button onClick={handleClick}>Refresh Data</button>
            </div>
        </div>
        )
}
export default Circles;