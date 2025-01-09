import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function AlgorithmVisualizer({ algorithm, visualizationSteps, isRunning }) {
  const svgRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!visualizationSteps || visualizationSteps.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 500;
    const height = 400;
    const padding = 40;

    const step = visualizationSteps[currentStep];

    switch (algorithm) {
      case 'Bubble Sort':
      case 'Quick Sort':
        drawSortingVisualization(svg, step, width, height, padding);
        break;
      case 'Binary Search':
        drawBinarySearchVisualization(svg, step, width, height, padding);
        break;
      case 'Linked List':
        drawLinkedListVisualization(svg, step, width, height, padding);
        break;
      case 'Binary Tree':
        drawBinaryTreeVisualization(svg, step, width, height, padding);
        break;
      default:
        break;
    }
  }, [visualizationSteps, currentStep, algorithm]);

  const drawSortingVisualization = (svg, step, width, height, padding) => {
    const array = step.array;
    
    const xScale = d3.scaleBand()
      .domain(d3.range(array.length))
      .range([padding, width - padding])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(array)])
      .range([height - padding, padding]);

    // Draw bars
    svg.selectAll('rect')
      .data(array)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - padding - yScale(d))
      .attr('fill', (d, i) => {
        if (step.pivot === i) return '#ff8c00';
        if (step.comparing && step.comparing.includes(i)) {
          return step.swapping ? '#ff0000' : '#ffff00';
        }
        return '#3498db';
      });

    // Add values on top of bars
    svg.selectAll('text')
      .data(array)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333');
  };

  const drawBinarySearchVisualization = (svg, step, width, height, padding) => {
    const array = step.array;
    
    const xScale = d3.scaleBand()
      .domain(d3.range(array.length))
      .range([padding, width - padding])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(array)])
      .range([height - padding, padding]);

    // Draw bars
    svg.selectAll('rect')
      .data(array)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - padding - yScale(d))
      .attr('fill', (d, i) => {
        if (step.searching && step.searching.includes(i)) {
          return step.found ? '#00ff00' : '#ffff00';
        }
        if (i >= step.left && i <= step.right) {
          return '#3498db';
        }
        return '#cccccc';
      });

    // Add values on top of bars
    svg.selectAll('text')
      .data(array)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333');
  };

  const drawLinkedListVisualization = (svg, step, width, height, padding) => {
    const nodes = step.nodes;
    const nodeRadius = 20;
    const nodeSpacing = 80;

    nodes.forEach((node, i) => {
      // Draw circle
      svg.append('circle')
        .attr('cx', padding + i * nodeSpacing)
        .attr('cy', height / 2)
        .attr('r', nodeRadius)
        .attr('fill', i === step.current ? '#ffff00' : '#3498db')
        .attr('stroke', '#333')
        .attr('stroke-width', 2);

      // Draw value
      svg.append('text')
        .attr('x', padding + i * nodeSpacing)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .text(node.value);

      // Draw arrow
      if (node.next !== null) {
        svg.append('line')
          .attr('x1', padding + i * nodeSpacing + nodeRadius)
          .attr('y1', height / 2)
          .attr('x2', padding + (i + 1) * nodeSpacing - nodeRadius)
          .attr('y2', height / 2)
          .attr('stroke', '#333')
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrow)');
      }
    });

    // Add arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#333');
  };

  const drawBinaryTreeVisualization = (svg, step, width, height, padding) => {
    const tree = step.tree;
    if (!tree) return;

    const nodeRadius = 20;
    const levelHeight = 60;

    const drawNode = (node, parent = null) => {
      if (!node) return;

      const x = width/2 + node.x * 50;
      const y = padding + node.y * levelHeight;

      if (parent) {
        svg.append('line')
          .attr('x1', width/2 + parent.x * 50)
          .attr('y1', padding + parent.y * levelHeight)
          .attr('x2', x)
          .attr('y2', y)
          .attr('stroke', '#666')
          .attr('stroke-width', 2);
      }

      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', nodeRadius)
        .attr('fill', node.value === step.currentValue ? '#ffff00' : '#3498db')
        .attr('stroke', '#333')
        .attr('stroke-width', 2);

      svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#333')
        .text(node.value);

      if (node.left) drawNode(node.left, node);
      if (node.right) drawNode(node.right, node);
    };

    drawNode(tree);
  };

  useEffect(() => {
    if (!isPaused && isRunning && visualizationSteps && currentStep < visualizationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isRunning, visualizationSteps, speed, isPaused]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>{algorithm || 'Select an Algorithm'}</h3>
        {visualizationSteps && (
          <div style={styles.controls}>
            <button 
              onClick={() => setCurrentStep(0)}
              disabled={currentStep === 0}
            >
              Reset
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? 'Play' : 'Pause'}
            </button>
            <input
              type="range"
              min="100"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={styles.slider}
            />
            <span>Speed: {speed}ms</span>
            <span>Step: {currentStep + 1} / {visualizationSteps.length}</span>
          </div>
        )}
      </div>
      <svg
        ref={svgRef}
        width="500"
        height="400"
        style={styles.svg}
      />
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  slider: {
    width: '100px',
  },
  svg: {
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  }
};

export default AlgorithmVisualizer;