import React from 'react';

function AlgorithmSelector({ selectedAlgorithm, onAlgorithmChange }) {
  const algorithms = [
    'Bubble Sort',
    'Quick Sort',
    'Binary Search',
    'Linked List',
    'Binary Tree'
  ];

  return (
    <select
      value={selectedAlgorithm}
      onChange={(e) => onAlgorithmChange(e.target.value)}
      style={styles.select}
    >
      <option value="">Select Algorithm</option>
      {algorithms.map((algo) => (
        <option key={algo} value={algo}>
          {algo}
        </option>
      ))}
    </select>
  );
}

const styles = {
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  }
};

export default AlgorithmSelector;