document.getElementById("runButton").addEventListener("click", runAlgorithms);

function shellSortIterative(arr) {
    let n = arr.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}

function shellSortRecursive(arr, gap = Math.floor(arr.length / 2), i = 0) {
    let n = arr.length;
    if (gap <= 0) return arr;

    if (i >= n) {
        return shellSortRecursive(arr, Math.floor(gap / 2), 0);
    }

    let temp = arr[i];
    let j = i;
    while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
    }
    arr[j] = temp;

    return shellSortRecursive(arr, gap, i + 1);
}

function ternarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (right >= left) {
        let mid1 = left + Math.floor((right - left) / 3);
        let mid2 = right - Math.floor((right - left) / 3);

        if (arr[mid1] === target) return mid1;
        if (arr[mid2] === target) return mid2;

        if (target < arr[mid1]) right = mid1 - 1;
        else if (target > arr[mid2]) left = mid2 + 1;
        else {
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }
    return -1;
}

function ternarySearchRecursive(arr, left, right, target) {
    if (right >= left) {
        let mid1 = left + Math.floor((right - left) / 3);
        let mid2 = right - Math.floor((right - left) / 3);

        if (arr[mid1] === target) return mid1;
        if (arr[mid2] === target) return mid2;

        if (target < arr[mid1]) return ternarySearchRecursive(arr, left, mid1 - 1, target);
        else if (target > arr[mid2]) return ternarySearchRecursive(arr, mid2 + 1, right, target);
        else return ternarySearchRecursive(arr, mid1 + 1, mid2 - 1, target);
    }
    return -1;
}

function runAlgorithms() {
    const size = parseInt(document.getElementById("size").value); 

    const originalArr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));

    const iterations = size; 

    let iterativeArr = [...originalArr]; 
    let totalIterativeTime = 0;
    for (let i = 0; i < iterations; i++) {
        const startIterative = performance.now();
        shellSortIterative(iterativeArr); 
        let randomIndex = Math.floor(Math.random() * iterativeArr.length);
        let target = iterativeArr[randomIndex];   
        ternarySearchIterative(iterativeArr, target); 
        const endIterative = performance.now();
        totalIterativeTime += (endIterative - startIterative);
    }
    const iterativeTime = totalIterativeTime / iterations;

    let recursiveArr = [...originalArr]; 
    let totalRecursiveTime = 0;
    for (let i = 0; i < iterations; i++) {
        const startRecursive = performance.now();
        shellSortRecursive(recursiveArr); 
        let randomIndex = Math.floor(Math.random() * recursiveArr.length);
        let target = recursiveArr[randomIndex];   
        ternarySearchRecursive(recursiveArr, 0, recursiveArr.length - 1, target); 
        const endRecursive = performance.now();
        totalRecursiveTime += (endRecursive - startRecursive);
    }
    const recursiveTime = totalRecursiveTime / iterations;

    document.getElementById("iterative-time").textContent = iterativeTime.toFixed(10) + " ms";
    document.getElementById("recursive-time").textContent = recursiveTime.toFixed(10) + " ms";

    // document.getElementById("runButton").disabled = true;
}