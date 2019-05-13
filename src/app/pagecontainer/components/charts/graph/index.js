import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'bizcharts/lib/components/Chart';
import Axis from 'bizcharts/lib/components/Axis';
import Legend from 'bizcharts/lib/components/Legend';
import Geom from 'bizcharts/lib/components/Geom';
import Tooltip from 'bizcharts/lib/components/Tooltip';

class Graph extends Component {
    render() {
        const { type, data, scale, x_axis, y_axis, legend, legend_position, padding, height, width, animate, forceFit, graph_border_width, tooltip_crosshairs, shape, color_key } = this.props;
        let chart_props = { data, scale, animate, forceFit };
        let geom_props = {};
        if (height) {
            chart_props = { ...chart_props, height }
        }
        if (width) {
            chart_props = { ...chart_props, width }
        }
        if (padding) {
            chart_props = { ...chart_props, padding }
        }
        if(color_key) {
            geom_props = {...geom_props, color: color_key }
        }
        if (shape) {
            geom_props = { ...geom_props, shape }
        }
        if(forceFit){
            let canvas = document.getElementById("canvas_1");
            if(canvas){
                canvas.style.width = "100%";
                canvas.style.maxheight = "100vh";
            }
        }

        return (
            <Chart {...chart_props} className="oriAreaGraphContainer">
                <Axis name={x_axis} />
                {
                    type === 'area' &&
                    <Axis name={y_axis} />
                }
                {
                    legend &&
                    <Legend position={legend_position} />
                }
                <Tooltip crosshairs={tooltip_crosshairs} />
                {
                    (type === 'line' || type === 'area') &&
                    <Geom type="line" position={`${x_axis}*${y_axis}`} {...geom_props} size={graph_border_width} />
                }
                {
                    type === 'area' &&
                    <Geom type="area" position={`${x_axis}*${y_axis}`} {...geom_props} />
                }
            </Chart>
        );
    }
}

Graph.propTypes = {
    type: PropTypes.oneOf(['line', 'area']).isRequired,
    data: PropTypes.array.isRequired,
    scale: PropTypes.object,
    x_axis: PropTypes.string.isRequired,
    y_axis: PropTypes.string.isRequired,
    padding: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number,
    graph_border_width: PropTypes.number,
    legend: PropTypes.bool,
    legend_position: PropTypes.string,
    animate: PropTypes.bool,
    forceFit: PropTypes.bool,
    tooltip_crosshairs: PropTypes.object,
    shape: PropTypes.string,
    color_key: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ])
};

Graph.defaultProps = {
    legend: false,
    legend_position: "top",
    animate: true,
    forceFit: true,
    graph_border_width: 2,
    tooltip_crosshairs: { type: 'line' },
};

export default Graph;
