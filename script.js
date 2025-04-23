document.getElementById('runTest').addEventListener('click', runBenchmark);

function runBenchmark() {
    const button = document.getElementById('runTest');
    button.disabled = true;
    button.textContent = 'Testing...';

    const resultsDiv = document.getElementById('results');
    const tipsDiv = document.getElementById('tips');
    const scoreSpan = document.getElementById('score');
    const feedbackPara = document.getElementById('feedback');
    const progressBar = document.getElementById('progress');

    // Hide previous results
    resultsDiv.classList.remove('hidden');
    tipsDiv.classList.add('hidden');

    // Simulate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) clearInterval(progressInterval);
    }, 100);

    // Run benchmark tests (CPU, DOM, Math)
    setTimeout(() => {
        const startTime = performance.now();
        
        // Test 1: CPU (Math operations)
        let sum = 0;
        for (let i = 0; i < 10000000; i++) {
            sum += Math.sqrt(i) * Math.random();
        }

        // Test 2: DOM Rendering
        const tempDiv = document.createElement('div');
        for (let i = 0; i < 1000; i++) {
            const p = document.createElement('p');
            p.textContent = 'Test element ' + i;
            tempDiv.appendChild(p);
        }

        // Test 3: Array Operations
        const largeArray = Array(100000).fill().map(() => Math.random());
        largeArray.sort((a, b) => a - b);

        const endTime = performance.now();
        const duration = endTime - startTime;

        // Calculate score (lower duration = better)
        const score = Math.max(10, Math.floor(10000 / duration));

        // Display results
        scoreSpan.textContent = score;
        
        if (score > 800) feedbackPara.textContent = "🔥 Your browser is blazing fast!";
        else if (score > 500) feedbackPara.textContent = "🚀 Solid performance!";
        else feedbackPara.textContent = "🐢 A bit slow—check tips below.";

        tipsDiv.classList.remove('hidden');
        button.disabled = false;
        button.textContent = 'Run Again';
    }, 1500); // Simulate slight delay for UX
}