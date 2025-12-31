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
        if (step.pivot === i) return '#f59e0b';
        if (step.comparing && step.comparing.includes(i)) {
          return step.swapping ? '#ef4444' : '#fbbf24';
        }
        return '#6366f1';
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
      .attr('fill', '#e2e8f0')
      .attr('font-size', '14px')
      .attr('font-weight', '600');
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
          return step.found ? '#10b981' : '#fbbf24';
        }
        if (i >= step.left && i <= step.right) {
          return '#6366f1';
        }
        return 'rgba(255, 255, 255, 0.1)';
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
      .attr('fill', '#e2e8f0')
      .attr('font-size', '14px')
      .attr('font-weight', '600');
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
        .attr('fill', i === step.current ? '#fbbf24' : '#6366f1')
        .attr('stroke', '#333')
        .attr('stroke-width', 2);

      // Draw value
      svg.append('text')
        .attr('x', padding + i * nodeSpacing)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
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
        .attr('fill', node.value === step.currentValue ? '#fbbf24' : '#6366f1')
        .attr('stroke', '#333')
        .attr('stroke-width', 2);

      svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
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
    <div className="algorithm-visualizer" style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h3 style={styles.title}>{algorithm || 'Select an Algorithm'}</h3>
          {visualizationSteps && (
            <div style={styles.stepIndicator}>
              <span style={styles.stepText}>Step {currentStep + 1} / {visualizationSteps.length}</span>
            </div>
          )}
        </div>
        {visualizationSteps && (
          <div style={styles.controls}>
            <button 
              onClick={() => setCurrentStep(0)}
              disabled={currentStep === 0}
              style={styles.controlButton}
              title="Reset"
            >
              <span style={styles.buttonIcon}>↺</span>
              Reset
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              style={styles.controlButton}
              title={isPaused ? 'Play' : 'Pause'}
            >
              <span style={styles.buttonIcon}>{isPaused ? '▶' : '⏸'}</span>
              {isPaused ? 'Play' : 'Pause'}
            </button>
            <div style={styles.sliderContainer}>
              <span style={styles.sliderLabel}>Speed</span>
              <input
                type="range"
                min="100"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                style={styles.slider}
              />
              <span style={styles.speedValue}>{speed}ms</span>
            </div>
          </div>
        )}
      </div>
      <div style={styles.visualizationWrapper}>
        {!visualizationSteps ? (
          <div style={styles.placeholder}>
            <div style={styles.placeholderIcon}>📊</div>
            <p style={styles.placeholderText}>Select an algorithm and run code to see visualization</p>
          </div>
        ) : (
          <svg
            ref={svgRef}
            width="100%"
            height="400"
            style={styles.svg}
            viewBox="0 0 500 400"
            preserveAspectRatio="xMidYMid meet"
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'all 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  stepIndicator: {
    padding: '0.375rem 0.75rem',
    background: 'rgba(99, 102, 241, 0.2)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '8px',
  },
  stepText: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#a5b4fc',
  },
  controls: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  controlButton: {
    padding: '0.625rem 1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  buttonIcon: {
    fontSize: '1rem',
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  sliderLabel: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 500,
  },
  slider: {
    width: '120px',
    height: '6px',
    borderRadius: '3px',
    background: 'rgba(255, 255, 255, 0.1)',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
  },
  speedValue: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 500,
    minWidth: '50px',
  },
  visualizationWrapper: {
    flex: 1,
    background: '#0a0e27',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '3rem',
    textAlign: 'center',
  },
  placeholderIcon: {
    fontSize: '4rem',
    opacity: 0.5,
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '1rem',
    margin: 0,
  },
  svg: {
    width: '100%',
    height: '100%',
    background: 'transparent',
  }
};

export default AlgorithmVisualizer;