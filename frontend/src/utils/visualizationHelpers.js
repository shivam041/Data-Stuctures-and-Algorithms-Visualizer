export const generateSteps = (algorithm, array) => {
  switch (algorithm) {
    case 'Bubble Sort':
      return generateBubbleSortSteps(array);
    case 'Quick Sort':
      return generateQuickSortSteps([...array]);
    case 'Binary Search':
      return generateBinarySearchSteps([...array].sort((a, b) => a - b), array[0]);
    case 'Linked List':
      return generateLinkedListSteps(array);
    case 'Binary Tree':
      return generateBinaryTreeSteps(array);
    default:
      return [];
  }
};

export const generateBubbleSortSteps = (array) => {
  const steps = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: false
      });

      if (arr[j] > arr[j + 1]) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: true
        });

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: false
        });
      }
    }
  }
  return steps;
};

export const generateQuickSortSteps = (array) => {
  const steps = [];
  
  const quickSort = (arr, low, high) => {
    if (low < high) {
      const pivotStep = partition(arr, low, high);
      quickSort(arr, low, pivotStep.pivotIndex - 1);
      quickSort(arr, pivotStep.pivotIndex + 1, high);
    }
  };

  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      pivot: high,
      comparing: [],
      swapping: false
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        pivot: high,
        comparing: [j],
        swapping: false
      });

      if (arr[j] <= pivot) {
        i++;
        steps.push({
          array: [...arr],
          pivot: high,
          comparing: [i, j],
          swapping: true
        });

        [arr[i], arr[j]] = [arr[j], arr[i]];

        steps.push({
          array: [...arr],
          pivot: high,
          comparing: [],
          swapping: false
        });
      }
    }

    steps.push({
      array: [...arr],
      pivot: high,
      comparing: [i + 1, high],
      swapping: true
    });

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      array: [...arr],
      pivot: i + 1,
      comparing: [],
      swapping: false
    });

    return { pivotIndex: i + 1 };
  };

  quickSort(array, 0, array.length - 1);
  return steps;
};

export const generateBinarySearchSteps = (array, target) => {
  const steps = [];
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      array: array,
      searching: [mid],
      left: left,
      right: right,
      found: false
    });

    if (array[mid] === target) {
      steps.push({
        array: array,
        searching: [mid],
        left: left,
        right: right,
        found: true
      });
      break;
    }

    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return steps;
};

export const generateLinkedListSteps = (array) => {
  const steps = [];
  const nodes = array.map((value, index) => ({
    value,
    next: index < array.length - 1 ? index + 1 : null
  }));

  // Initial state
  steps.push({
    nodes: [...nodes],
    current: null,
    operation: 'initial'
  });

  // Traverse the list
  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      nodes: [...nodes],
      current: i,
      operation: 'traverse'
    });
  }

  return steps;
};

export const generateBinaryTreeSteps = (array) => {
  const steps = [];
  
  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.x = 0;
      this.y = 0;
      this.level = 0;
    }
  }

  const insertNode = (root, value, level = 0) => {
    if (!root) {
      return new TreeNode(value);
    }

    if (value < root.value) {
      root.left = insertNode(root.left, value, level + 1);
    } else {
      root.right = insertNode(root.right, value, level + 1);
    }

    return root;
  };

  const calculatePositions = (node, level = 0, position = 0, positions = {}) => {
    if (!node) return;

    const key = `${level}-${position}`;
    positions[key] = positions[key] || 0;

    node.x = position;
    node.y = level;
    node.level = level;

    calculatePositions(node.left, level + 1, position - Math.pow(2, 3 - level), positions);
    calculatePositions(node.right, level + 1, position + Math.pow(2, 3 - level), positions);
  };

  let root = null;
  
  array.forEach((value, index) => {
    root = insertNode(root, value);
    calculatePositions(root);

    const treeCopy = JSON.parse(JSON.stringify(root));
    
    steps.push({
      tree: treeCopy,
      currentValue: value,
      type: 'insert'
    });
  });

  return steps;
};