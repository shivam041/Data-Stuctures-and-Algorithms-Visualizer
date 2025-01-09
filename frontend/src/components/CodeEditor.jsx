import React, { useState, useEffect } from 'react';
import { algorithmTemplates } from '../utils/algorithmTemplates';
import { generateSteps } from '../utils/visualizationHelpers';

function CodeEditor({ language, algorithm, onVisualize }) {
  const [code, setCode] = useState('');
  const [testArray, setTestArray] = useState([64, 34, 25, 12, 22, 11, 90]);

  useEffect(() => {
    if (algorithm && algorithmTemplates[algorithm]) {
      setCode(algorithmTemplates[algorithm][language.toLowerCase()]);
    }
  }, [algorithm, language]);

  const handleRun = () => {
    const steps = generateSteps(algorithm, testArray);
    onVisualize(steps);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>{algorithm || 'Select an Algorithm'}</span>
        <span>{language}</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={styles.textarea}
        spellCheck="false"
      />
      <div style={styles.footer}>
        <input
          type="text"
          value={testArray.join(', ')}
          onChange={(e) => setTestArray(e.target.value.split(',').map(num => parseInt(num.trim())))}
          style={styles.input}
          placeholder="Enter test array (comma-separated)"
        />
        <button 
          onClick={handleRun}
          style={styles.button}
          disabled={!algorithm}
        >
          Run Code
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    height: '400px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    resize: 'none',
  },
  footer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default CodeEditor;