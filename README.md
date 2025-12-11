# 🎄 圣诞节主题网页

一个精美的圣诞节主题单页面网站，包含圣诞树、雪花动画、倒计时和背景音乐功能。

## ✨ 功能特性

- 🎄 **圣诞树装饰**：CSS绘制的圣诞树，带有闪烁的彩灯效果
- ❄️ **雪花飘落动画**：30个动态雪花，营造冬日氛围
- ⏰ **圣诞倒计时**：实时显示距离圣诞节的剩余时间（使用北京时间）
- 🎅 **圣诞祝福语**：温馨的节日祝福
- 🎵 **背景音乐控制**：可播放/暂停背景音乐，支持音量调节
- 📱 **响应式设计**：完美适配桌面、平板和移动设备
- 🎁 **交互效果**：点击圣诞树和礼物有惊喜

## 🚀 快速开始

### 方法一：直接打开
1. 双击 `index.html` 文件
2. 在浏览器中查看效果

### 方法二：使用本地服务器
```bash
# 进入项目目录
cd christmas-page

# 使用 Python 启动简单服务器
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server -p 8000
```

然后在浏览器中访问：`http://localhost:8000`

## 📁 项目结构

```
christmas-page/
├── index.html          # 主页面
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── script.js      # 交互脚本
├── assets/
│   └── music/         # 音乐文件目录（可选）
└── README.md          # 项目说明
```

## 🎵 添加背景音乐

如果想添加背景音乐：

1. 将圣诞音乐文件（MP3格式）放入 `assets/music/` 目录
2. 重命名为 `christmas.mp3`
3. 在 `index.html` 中找到以下代码并取消注释：
   ```html
   <audio id="bgMusic" loop>
       <source src="assets/music/christmas.mp3" type="audio/mpeg">
   </audio>
   ```

推荐的免费圣诞音乐来源：
- [Free Music Archive](https://freemusicarchive.org/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)
- [Incompetech](https://incompetech.com/)

## 🎨 自定义配色

在 `css/style.css` 中修改以下变量来自定义配色：

```css
/* 圣诞红 */
#C41E3A

/* 圣诞绿 */
#165B33

/* 金色 */
#FFD700

/* 背景渐变 */
linear-gradient(to bottom, #0a1628, #1a2a4a)
```

## 🌟 特色功能

### 倒计时功能
- 自动计算距离圣诞节（12月25日）的剩余时间
- 使用北京时间（UTC+8）
- 实时更新（每秒刷新）
- 圣诞节当天显示特殊祝福

### 雪花动画
- 30个雪花同时飘落
- 随机大小、速度和位置
- 轻微旋转效果
- 自然的透明度变化

### 交互效果
- 点击圣诞树：树会放大缩小
- 点击礼物：显示祝福文字动画
- 音乐控制：播放/暂停和音量调节

## 📱 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动端浏览器

## 🛠️ 技术栈

- HTML5
- CSS3 (动画、渐变、响应式)
- JavaScript (原生)
- 无需任何框架或库

## 📝 更新日志

### v1.0.0 (2024-12-11)
- ✨ 初始版本发布
- 🎄 圣诞树和彩灯效果
- ❄️ 雪花飘落动画
- ⏰ 圣诞倒计时功能
- 🎵 背景音乐控制
- 📱 响应式设计

## 🎁 使用建议

1. **最佳观看体验**：使用大屏幕设备，全屏模式
2. **音乐播放**：首次访问需要用户交互才能播放音乐（浏览器限制）
3. **性能优化**：如果设备性能较低，可以减少雪花数量（在 `script.js` 中修改 `snowflakeCount`）

## 📄 许可证

MIT License - 可自由使用和修改

## 🤝 贡献

欢迎提交问题和改进建议！

---

🎅 **祝你圣诞快乐，新年快乐！Merry Christmas & Happy New Year!** 🎄