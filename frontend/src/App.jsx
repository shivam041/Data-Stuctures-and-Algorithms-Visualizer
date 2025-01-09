import React, { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import AlgorithmSelector from './components/AlgorithmSelector';
import CodeEditor from './components/CodeEditor';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [visualizationSteps, setVisualizationSteps] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleVisualize = (steps) => {
    setVisualizationSteps(steps);
    setIsRunning(true);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="controls">
          <AlgorithmSelector 
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={(algo) => {
              setSelectedAlgorithm(algo);
              setVisualizationSteps(null);
              setIsRunning(false);
            }}
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="workspace">
          <CodeEditor 
            language={selectedLanguage} 
            algorithm={selectedAlgorithm}
            onVisualize={handleVisualize}
          />
          <AlgorithmVisualizer 
            algorithm={selectedAlgorithm}
            visualizationSteps={visualizationSteps}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}

export default App;