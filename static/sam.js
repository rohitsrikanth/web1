document.addEventListener('DOMContentLoaded', (event) => {
    let data = JSON.parse('{{ data1 | tojson | safe }}');

    // Grouping the data by 'Topic Name'
    let groupedData = data.reduce((acc, item) => {
        if (!acc[item['Topic Name']]) {
            acc[item['Topic Name']] = [];
        }
        acc[item['Topic Name']].push(item);
        return acc;
    }, {});

    // Variables to manage the current topic and video index
    let topics = Object.keys(groupedData);
    let currentTopicIndex = 0;
    let currentSubtopIndex = 0;
    let currentVideoIndex = 0;
    let topicsLen = topics.length;

    // DOM elements
    const iframe = document.getElementById('iframeCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const manarkeniTotal = document.getElementById('manarkeni-total');
    const youtubeTotal = document.getElementById('youtube-total');
    const topicIndicator = document.getElementById('topic-d');
    const videoIndicator = document.getElementById('indic');
    const subtopicIndicator = document.getElementById('subtopic-d');

    const iframe_1 = document.getElementById('iframeCarousel-1');
    const prevBtn_1 = document.getElementById('prevBtn1');
    const nextBtn_1 = document.getElementById('nextBtn1');

    const prevBtn_3 = document.getElementById('subtopic-prv-btn');
    const nextBtn_3 = document.getElementById('subtopic-nxt-btn');

    const prevBtn_2 = document.getElementById('topic-prv-btn');
    const nextBtn_2 = document.getElementById('topic-nxt-btn');

    function updateIframe() {
        let currentTopic = topics[currentTopicIndex];
        let currentGroup = groupedData[currentTopic];
        let videoLinks = [
            currentGroup[currentSubtopIndex]['Link to the Video 1'],
            currentGroup[currentSubtopIndex]['Link to the Video 2']
        ];
        
        iframe.src = videoLinks[currentVideoIndex] || ''; // Set iframe to the current video link

        // Update indicators
        videoIndicator.textContent = `${currentVideoIndex + 1} / ${videoLinks.length}`;
        topicIndicator.textContent = `${currentTopicIndex + 1} / ${topicsLen}`;
        
        // Disable/enable buttons
        prevBtn.disabled = (currentVideoIndex === 0);
        nextBtn.disabled = (currentVideoIndex === videoLinks.length - 1);
    }

    function updateIframe_1() {
        let currentTopic = topics[currentTopicIndex];
        let currentGroup = groupedData[currentTopic];
        iframe_1.src = currentGroup[currentSubtopIndex]['Link to the video in Manarkeni App'];

        // Update indicators
        videoIndicator.textContent = `${currentVideoIndex + 1} / ${currentGroup.length}`;
        
        // Disable/enable buttons
        prevBtn_1.disabled = (currentVideoIndex === 0);
        nextBtn_1.disabled = (currentVideoIndex === currentGroup.length - 1);
    }

    function updateSubTop() {
        let currentTopic = topics[currentTopicIndex];
        let currentGroup = groupedData[currentTopic];
        let subtopicLen = currentGroup.length;
        
        subtopicIndicator.textContent = `${currentSubtopIndex + 1} / ${subtopicLen}`;
        updateIframe();
        updateIframe_1();
    }

    function updateTopic() {
        let currentTopic = topics[currentTopicIndex];
        let currentGroup = groupedData[currentTopic];
        let subtopicLen = currentGroup.length;

        manarkeniTotal.textContent = ` / ${subtopicLen}`;
        youtubeTotal.textContent = ` / ${subtopicLen}`;
        
        updateSubTop();
    }

    // Initial update
    updateTopic();

    prevBtn.addEventListener('click', () => {
        if (currentVideoIndex > 0) {
            currentVideoIndex--;
        }
        updateIframe();
    });

    nextBtn.addEventListener('click', () => {
        let videoLinks = groupedData[topics[currentTopicIndex]][currentSubtopIndex] || [];
        if (currentVideoIndex < videoLinks.length - 1) {
            currentVideoIndex++;
        }
        updateIframe();
    });

    prevBtn_1.addEventListener('click', () => {
        if (currentVideoIndex > 0) {
            currentVideoIndex--;
        }
        updateIframe_1();
    });

    nextBtn_1.addEventListener('click', () => {
        let currentGroup = groupedData[topics[currentTopicIndex]];
        if (currentVideoIndex < currentGroup.length - 1) {
            currentVideoIndex++;
        }
        updateIframe_1();
    });

    prevBtn_3.addEventListener('click', () => {
        if (currentSubtopIndex > 0) {
            currentSubtopIndex--;
            currentVideoIndex = 0;
        }
        updateSubTop();
    });

    nextBtn_3.addEventListener('click', () => {
        let currentTopic = topics[currentTopicIndex];
        let currentGroup = groupedData[currentTopic];
        if (currentSubtopIndex < currentGroup.length - 1) {
            currentSubtopIndex++;
            currentVideoIndex = 0;
        }
        updateSubTop();
    });

    prevBtn_2.addEventListener('click', () => {
        if (currentTopicIndex > 0) {
            currentTopicIndex--;
            updateTopic();
        }
    });

    nextBtn_2.addEventListener('click', () => {
        if (currentTopicIndex < topicsLen - 1) {
            currentTopicIndex++;
            updateTopic();
        }
    });
});
