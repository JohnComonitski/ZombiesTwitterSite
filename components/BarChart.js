import React from "react";
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = (props) => {
    const { barGraphData, height } = props

    return (
        <div>
            <Chart options={barGraphData?.options} series={barGraphData?.series} type="bar" height={height} />
        </div>
    )
}

export default BarChart