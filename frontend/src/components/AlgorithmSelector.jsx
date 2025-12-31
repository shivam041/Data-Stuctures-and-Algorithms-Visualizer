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
    <div style={styles.container}>
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
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    minWidth: '200px',
  },
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    paddingRight: '2.5rem',
  }
};

export default AlgorithmSelector;