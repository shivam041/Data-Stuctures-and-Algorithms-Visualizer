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
    <div className="code-editor" style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.algorithmName}>{algorithm || 'Select an Algorithm'}</span>
          <span style={styles.languageBadge}>{language.toUpperCase()}</span>
        </div>
      </div>
      <div style={styles.editorWrapper}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={styles.textarea}
          spellCheck="false"
          placeholder="Select an algorithm to see the code..."
        />
      </div>
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
          <span style={styles.buttonIcon}>▶</span>
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
    gap: '1rem',
    height: '100%',
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  algorithmName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#ffffff',
    letterSpacing: '-0.01em',
  },
  languageBadge: {
    padding: '0.25rem 0.75rem',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  editorWrapper: {
    flex: 1,
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#0a0e27',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  textarea: {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    padding: '1.25rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '12px',
    fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    color: '#e2e8f0',
    resize: 'none',
    outline: 'none',
    tabSize: 2,
  },
  footer: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  button: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  },
  buttonIcon: {
    fontSize: '0.875rem',
  }
};

export default CodeEditor;