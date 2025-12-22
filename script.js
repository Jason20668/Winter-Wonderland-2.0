const { createApp } = Vue;


createApp({
    data() {
        return {
            currentSceneId: 'start',
            sceneHistory: ['start'],
            storyData: {
                start: {
                    text: "You wake up on a magical Christmas morning. Snow is gently falling outside your window, and you can smell fresh pine and cinnamon in the air. As you look out, you notice a mysterious glowing path in the snow leading into the enchanted winter forest. What do you do?",
                    choices: [
                        { text: "Follow the glowing path into the forest", next: "forest" },
                        { text: "Stay inside and enjoy hot cocoa by the fireplace", next: "cozy" },
                        { text: "Build a snowman in your yard", next: "snowman" }
                    ]
                },
                forest: {
                    text: "The forest is breathtaking! Icicles sparkle like diamonds on every branch. You discover a group of woodland creatures decorating a massive evergreen tree. A friendly deer approaches you with a golden ornament in its mouth, offering it to you. Do you accept?",
                    choices: [
                        { text: "Accept the ornament and help decorate", next: "decorate" },
                        { text: "Politely decline and explore deeper", next: "deeper" }
                    ]
                },
                cozy: {
                    text: "You settle into your favorite armchair with a steaming mug of hot cocoa topped with marshmallows. Through the window, you watch the snowfall while reading your favorite winter story. Suddenly, you hear sleigh bells in the distance getting closer and closer...",
                    choices: [
                        { text: "Rush outside to investigate the sleigh bells", next: "sleigh" },
                        { text: "Stay cozy and continue reading", next: "reading" }
                    ]
                },
                snowman: {
                    text: "You build the most magnificent snowman anyone has ever seen! As you place the carrot nose, something magical happens - the snowman winks at you! 'Thank you for bringing me to life,' it says warmly. 'Would you like to go on an adventure?'",
                    choices: [
                        { text: "Go on an adventure with your snowman", next: "adventure" },
                        { text: "Invite the snowman inside for cookies", next: "cookies" }
                    ]
                },
                decorate: {
                    text: "You spend a wonderful afternoon decorating the forest tree with your new animal friends. When you place the final ornament, the tree lights up with thousands of twinkling lights. The forest animals cheer and dance around you. It's the most magical Christmas you've ever experienced! 🎄✨"
                },
                deeper: {
                    text: "Venturing deeper into the forest, you discover an ice palace made entirely of crystal-clear ice and snow. Inside, a winter fairy greets you and grants you one wish for being brave enough to explore. Your wish comes true, and you return home with a heart full of wonder! ❄️👑"
                },
                sleigh: {
                    text: "You race outside just in time to see a beautiful sleigh pulled by reindeer landing in your yard! The driver invites you for a moonlight ride over your snow-covered town. You soar through the starlit sky, feeling pure joy and freedom. Best Christmas ever! 🦌🌙"
                },
                reading: {
                    text: "As you continue reading, you drift into the most peaceful sleep. You dream of magical winter adventures, and when you wake, you find fresh cookies and a note saying 'Thanks for believing in magic.' You smile, knowing this Christmas was special. 📖💫"
                },
                adventure: {
                    text: "Your snowman friend takes you on a whirlwind tour of the North Pole! You meet elves, help wrap presents, and even get to pet the reindeer. As the adventure ends, your snowman gives you a magical snow globe to remember this incredible day. 🎅⛄"
                },
                cookies: {
                    text: "You and your snowman share cookies and hot cocoa (he doesn't melt - it's magic!). You laugh and tell stories all evening. As night falls, he thanks you for your kindness and promises to visit every winter. You've made a friend for life! 🍪❤️"
                }
            }
        };
    },
    computed: {
        currentScene() {
            return this.storyData[this.currentSceneId];
        }
    },
    methods: {
        makeChoice(nextSceneId) {
            this.currentSceneId = nextSceneId;
            this.sceneHistory.push(nextSceneId);
            this.saveProgress();
        },
        restartStory() {
            this.currentSceneId = 'start';
            this.sceneHistory = ['start'];
            this.saveProgress();
        },
        saveProgress() {
            const progress = {
                currentSceneId: this.currentSceneId,
                sceneHistory: this.sceneHistory
            };
            localStorage.setItem('winterWonderlandProgress', JSON.stringify(progress));
        },
        loadProgress() {
            const saved = localStorage.getItem('winterWonderlandProgress');
            if (saved) {
                const progress = JSON.parse(saved);
                this.currentSceneId = progress.currentSceneId;
                this.sceneHistory = progress.sceneHistory;
            }
        }
    },
    mounted() {
        this.loadProgress();


        // Create snowflakes
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
            snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
            snowflake.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(snowflake);
        }
    }
}).mount('#app');


function toggleMusic() {
    const audio = document.getElementById('fortMusic');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
