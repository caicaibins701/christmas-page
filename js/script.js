// 圣诞节倒计时功能
function updateCountdown() {
    // 获取当前北京时间
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 设置圣诞节日期（12月25日 00:00:00）
    let christmas = new Date(currentYear, 11, 25, 0, 0, 0);
    
    // 如果今年圣诞节已过，计算到明年圣诞节
    if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25, 0, 0, 0);
    }
    
    // 计算时间差
    const diff = christmas - now;
    
    // 如果已经是圣诞节当天
    if (diff <= 0) {
        document.querySelector('.countdown-title').textContent = '🎅 圣诞节快乐！';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    // 计算天、小时、分钟、秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // 更新显示
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// 生成雪花 - 全屏无规律飞舞
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50; // 增加雪花数量
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // 使用不同的雪花字符
        const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉'];
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        
        // 完全随机的起始位置（包括X和Y）
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.top = -(Math.random() * 20) + '%'; // 从屏幕上方不同高度开始
        
        // 更大范围的随机大小
        const size = Math.random() * 1.2 + 0.4; // 0.4 到 1.6
        snowflake.style.fontSize = size + 'rem';
        
        // 更多样化的飘落速度
        const duration = Math.random() * 8 + 8; // 8到16秒
        snowflake.style.animationDuration = duration + 's';
        
        // 随机延迟
        const delay = Math.random() * 8;
        snowflake.style.animationDelay = delay + 's';
        
        // 随机透明度
        snowflake.style.opacity = Math.random() * 0.6 + 0.3; // 0.3 到 0.9
        
        // 随机水平漂移距离
        const drift = (Math.random() - 0.5) * 100; // -50 到 50
        snowflake.style.setProperty('--drift', drift + 'px');
        
        // 随机旋转速度
        const rotateSpeed = Math.random() * 2 + 1; // 1到3
        snowflake.style.setProperty('--rotate-speed', rotateSpeed);
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// Web Audio API 音乐生成器
let audioContext;
let masterGain;
let isPlaying = false;
let currentNoteIndex = 0;
let musicInterval;

// 初始化音频上下文
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioContext.createGain();
        masterGain.connect(audioContext.destination);
        masterGain.gain.value = 0.3; // 初始音量
    }
}

// 圣诞歌曲旋律 - "Jingle Bells" 片段
const melody = [
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.5 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.5 },
    { note: 'E4', duration: 0.25 },
    { note: 'G4', duration: 0.25 },
    { note: 'C4', duration: 0.25 },
    { note: 'D4', duration: 0.25 },
    { note: 'E4', duration: 1 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'F4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'D4', duration: 0.25 },
    { note: 'D4', duration: 0.25 },
    { note: 'E4', duration: 0.25 },
    { note: 'D4', duration: 0.5 },
    { note: 'G4', duration: 0.5 }
];

// 音符频率映射
const noteFrequencies = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88
};

// 播放单个音符
function playNote(frequency, duration) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // 音符包络
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
}

// 播放旋律
function playMelody() {
    if (!isPlaying || currentNoteIndex >= melody.length) {
        currentNoteIndex = 0;
        if (isPlaying) {
            // 循环播放
            setTimeout(playMelody, 500);
        }
        return;
    }
    
    const note = melody[currentNoteIndex];
    const frequency = noteFrequencies[note.note];
    
    if (frequency) {
        playNote(frequency, note.duration);
    }
    
    currentNoteIndex++;
    setTimeout(playMelody, note.duration * 1000);
}

// 音乐控制
const musicToggle = document.getElementById('musicToggle');
const musicStatus = document.getElementById('musicStatus');
const volumeSlider = document.getElementById('volumeSlider');

// 播放/暂停音乐
musicToggle.addEventListener('click', function() {
    initAudio();
    
    if (isPlaying) {
        isPlaying = false;
        currentNoteIndex = 0;
        musicStatus.textContent = '点击播放音乐';
    } else {
        isPlaying = true;
        currentNoteIndex = 0;
        musicStatus.textContent = '正在播放...';
        playMelody();
    }
});

// 音量控制
volumeSlider.addEventListener('input', function() {
    if (masterGain) {
        masterGain.gain.value = this.value / 100 * 0.5; // 最大音量限制为0.5
    }
});

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化倒计时
    updateCountdown();
    
    // 每秒更新倒计时
    setInterval(updateCountdown, 1000);
    
    // 生成雪花
    createSnowflakes();
    
    console.log('🎄 圣诞节网页加载完成！');
    console.log('💡 提示：如需添加背景音乐，请在 assets/music/ 目录下放置音乐文件，并在 index.html 中取消注释音频源标签');
});

// 添加一些交互效果
document.querySelector('.christmas-tree').addEventListener('click', function() {
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 300);
});

// 礼物点击效果
document.querySelectorAll('.gift').forEach(gift => {
    gift.addEventListener('click', function(e) {
        e.stopPropagation();
        // 创建一个临时的祝福文字
        const blessing = document.createElement('div');
        blessing.textContent = '🎁 圣诞快乐！';
        blessing.style.position = 'fixed';
        blessing.style.left = e.clientX + 'px';
        blessing.style.top = e.clientY + 'px';
        blessing.style.color = '#FFD700';
        blessing.style.fontSize = '2rem';
        blessing.style.fontWeight = 'bold';
        blessing.style.pointerEvents = 'none';
        blessing.style.zIndex = '9999';
        blessing.style.animation = 'fadeOut 2s forwards';
        document.body.appendChild(blessing);
        
        setTimeout(() => {
            blessing.remove();
        }, 2000);
    });
});

// 添加淡出动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
`;
document.head.appendChild(style);