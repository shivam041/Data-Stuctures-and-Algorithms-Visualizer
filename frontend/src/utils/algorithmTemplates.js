export const algorithmTemplates = {
    'Bubble Sort': {
      java: `public class BubbleSort {
      public static void bubbleSort(int[] arr) {
          int n = arr.length;
          for (int i = 0; i < n-1; i++) {
              for (int j = 0; j < n-i-1; j++) {
                  if (arr[j] > arr[j+1]) {
                      // swap arr[j] and arr[j+1]
                      int temp = arr[j];
                      arr[j] = arr[j+1];
                      arr[j+1] = temp;
                  }
              }
          }
      }
  
      // Example usage:
      public static void main(String[] args) {
          int[] arr = {64, 34, 25, 12, 22, 11, 90};
          bubbleSort(arr);
          System.out.println("Sorted array:");
          for (int i : arr) {
              System.out.print(i + " ");
          }
      }
  }`,
      python: `def bubble_sort(arr):
      n = len(arr)
      for i in range(n-1):
          for j in range(0, n-i-1):
              if arr[j] > arr[j+1]:
                  arr[j], arr[j+1] = arr[j+1], arr[j]
  
  # Example usage:
  if __name__ == "__main__":
      arr = [64, 34, 25, 12, 22, 11, 90]
      bubble_sort(arr)
      print("Sorted array:")
      print(*arr)`
    },
    'Quick Sort': {
      java: `public class QuickSort {
      public static void quickSort(int[] arr, int low, int high) {
          if (low < high) {
              int pi = partition(arr, low, high);
              quickSort(arr, low, pi - 1);
              quickSort(arr, pi + 1, high);
          }
      }
  
      private static int partition(int[] arr, int low, int high) {
          int pivot = arr[high];
          int i = (low - 1);
          for (int j = low; j < high; j++) {
              if (arr[j] <= pivot) {
                  i++;
                  int temp = arr[i];
                  arr[i] = arr[j];
                  arr[j] = temp;
              }
          }
          int temp = arr[i + 1];
          arr[i + 1] = arr[high];
          arr[high] = temp;
          return i + 1;
      }
  
      public static void main(String[] args) {
          int[] arr = {10, 7, 8, 9, 1, 5};
          quickSort(arr, 0, arr.length - 1);
          System.out.println("Sorted array:");
          for (int i : arr) {
              System.out.print(i + " ");
          }
      }
  }`,
      python: `def quick_sort(arr, low, high):
      if low < high:
          pi = partition(arr, low, high)
          quick_sort(arr, low, pi - 1)
          quick_sort(arr, pi + 1, high)
  
  def partition(arr, low, high):
      pivot = arr[high]
      i = low - 1
      for j in range(low, high):
          if arr[j] <= pivot:
              i += 1
              arr[i], arr[j] = arr[j], arr[i]
      arr[i + 1], arr[high] = arr[high], arr[i + 1]
      return i + 1
  
  # Example usage:
  if __name__ == "__main__":
      arr = [10, 7, 8, 9, 1, 5]
      quick_sort(arr, 0, len(arr)-1)
      print("Sorted array:")
      print(*arr)`
    },
    'Binary Search': {
      java: `public class BinarySearch {
      public static int binarySearch(int[] arr, int target) {
          int left = 0;
          int right = arr.length - 1;
          
          while (left <= right) {
              int mid = left + (right - left) / 2;
              
              if (arr[mid] == target)
                  return mid;
              
              if (arr[mid] < target)
                  left = mid + 1;
              else
                  right = mid - 1;
          }
          return -1;
      }
  
      public static void main(String[] args) {
          int[] arr = {2, 3, 4, 10, 40};
          int target = 10;
          int result = binarySearch(arr, target);
          if (result == -1)
              System.out.println("Element not present");
          else
              System.out.println("Element found at index " + result);
      }
  }`,
      python: `def binary_search(arr, target):
      left = 0
      right = len(arr) - 1
      
      while left <= right:
          mid = (left + right) // 2
          
          if arr[mid] == target:
              return mid
          
          if arr[mid] < target:
              left = mid + 1
          else:
              right = mid - 1
      
      return -1
  
  # Example usage:
  if __name__ == "__main__":
      arr = [2, 3, 4, 10, 40]
      target = 10
      result = binary_search(arr, target)
      if result == -1:
          print("Element not present")
      else:
          print(f"Element found at index {result}")`
    },
    'Linked List': {
      java: `public class LinkedList {
      Node head;
  
      static class Node {
          int data;
          Node next;
          
          Node(int d) {
              data = d;
              next = null;
          }
      }
  
      public void insert(int data) {
          Node new_node = new Node(data);
          if (head == null) {
              head = new_node;
              return;
          }
          Node last = head;
          while (last.next != null) {
              last = last.next;
          }
          last.next = new_node;
      }
  
      public void printList() {
          Node currNode = head;
          System.out.print("LinkedList: ");
          while (currNode != null) {
              System.out.print(currNode.data + " ");
              currNode = currNode.next;
          }
      }
  
      public static void main(String[] args) {
          LinkedList list = new LinkedList();
          list.insert(1);
          list.insert(2);
          list.insert(3);
          list.insert(4);
          list.printList();
      }
  }`,
      python: `class Node:
      def __init__(self, data):
          self.data = data
          self.next = None
  
  class LinkedList:
      def __init__(self):
          self.head = None
  
      def insert(self, data):
          new_node = Node(data)
          if self.head is None:
              self.head = new_node
              return
          last = self.head
          while last.next:
              last = last.next
          last.next = new_node
  
      def print_list(self):
          curr = self.head
          print("LinkedList:", end=" ")
          while curr:
              print(curr.data, end=" ")
              curr = curr.next
  
  # Example usage:
  if __name__ == "__main__":
      llist = LinkedList()
      llist.insert(1)
      llist.insert(2)
      llist.insert(3)
      llist.insert(4)
      llist.print_list()`
    },
    'Binary Tree': {
      java: `public class BinaryTree {
      static class Node {
          int value;
          Node left;
          Node right;
  
          Node(int value) {
              this.value = value;
              left = right = null;
          }
      }
  
      Node root;
  
      public void insert(int value) {
          root = insertRec(root, value);
      }
  
      private Node insertRec(Node root, int value) {
          if (root == null) {
              root = new Node(value);
              return root;
          }
  
          if (value < root.value)
              root.left = insertRec(root.left, value);
          else if (value > root.value)
              root.right = insertRec(root.right, value);
  
          return root;
      }
  
      public static void main(String[] args) {
          BinaryTree tree = new BinaryTree();
          tree.insert(50);
          tree.insert(30);
          tree.insert(70);
          tree.insert(20);
          tree.insert(40);
      }
  }`,
      python: `class Node:
      def __init__(self, value):
          self.value = value
          self.left = None
          self.right = None
  
  class BinaryTree:
      def __init__(self):
          self.root = None
  
      def insert(self, value):
          if not self.root:
              self.root = Node(value)
          else:
              self._insert_recursive(self.root, value)
  
      def _insert_recursive(self, node, value):
          if value < node.value:
              if node.left is None:
                  node.left = Node(value)
              else:
                  self._insert_recursive(node.left, value)
          else:
              if node.right is None:
                  node.right = Node(value)
              else:
                  self._insert_recursive(node.right, value)
  
  # Example usage:
  if __name__ == "__main__":
      tree = BinaryTree()
      tree.insert(50)
      tree.insert(30)
      tree.insert(70)
      tree.insert(20)
      tree.insert(40)`
    }
  };