const app = Vue.createApp({
    created() {
        fetch('adventure.json').then(response => response.json()).then(json => {
            this.adventure = json;
        }).catch(error => {
            console.error('Error loading JSON:', error);
        });
    },
    data() {
        return {
            adventure: {},
            currentIndex: parseInt(localStorage.getItem('currentIndex')) || 0,
            currentStory: localStorage.getItem('currentStory') || 'story1'
        }
    },
    computed: {
        currentStoryText() {
            return this.adventure[this.currentStory]?.[this.currentIndex] || 'Loading...';
        },
        currentOption1() {
            return this.adventure.option1?.[this.currentIndex] || '';
        },
        currentOption2() {
            return this.adventure.option2?.[this.currentIndex] || '';
        },
        isAtEnd() {
            return this.currentIndex >= (this.adventure[this.currentStory]?.length || 0) - 1;
        }
    },
    methods: {
        makeChoice(choice) {
            if (this.currentIndex < (this.adventure[this.currentStory]?.length || 0) - 1) {
                this.currentIndex++;
                if (choice === 2) this.currentStory = 'story2';
                this.saveProgress();
            }
        },
        restartStory() {
            this.currentIndex = 0;
            this.currentStory = 'story1';
            this.saveProgress();
        },
        saveProgress() {
            localStorage.setItem('currentIndex', this.currentIndex);
            localStorage.setItem('currentStory', this.currentStory);
        }
    }
});

app.mount("#app");

for(let i = 0; i< 50; i++) {
    const snowflake = document.createElement('div');
snowflake.classList.add('snowflake');
snowflake.innerHTML = '❄';
snowflake.style.left = Math.random() * 100 + '%';
snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
snowflake.style.animationDelay = Math.random() * 5 + 's';
document.body.appendChild(snowflake);
}

function toggleMusic() {
    const audio = document.getElementById('fortMusic');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
