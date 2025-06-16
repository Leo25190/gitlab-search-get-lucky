# GitLab Search Get Lucky 🍀

> Chrome extension for instant GitLab search navigation with Enter key

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome Web Store](https://img.shields.io/badge/chrome-extension-orange)

## ✨ Features

- **🚀 One-Key Navigation**: Press Enter in GitLab search to go directly to the first result
- **🎯 Smart Prioritization**: Automatically prioritizes projects over other result types  
- **⚡ Lightning Fast**: No page reloads, instant navigation
- **🌍 Universal Compatibility**: Works on any GitLab instance (gitlab.com, self-hosted, GitLab.io)
- **🔒 Privacy First**: No data collection, works entirely locally

## 🎥 How It Works

1. **Open GitLab search**: Press `Shift + /`
2. **Start typing**: Enter your search term
3. **Press Enter immediately**: No need to wait for suggestions!
4. **→ Automatically redirects** to the first result (prioritizing projects)

![Demo GIF](store-assets/demo.gif)

## 📥 Installation

### From Chrome Web Store
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install-blue?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore/detail/your-extension-id)

### From Source
1. Download or clone this repository
2. Open `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked" and select the extension folder
5. Done! Start using it on any GitLab site

## 🛠️ Development

### Prerequisites
- Node.js 16+
- TypeScript

### Setup
```bash
git clone https://github.com/leo25190/gitlab-search-get-lucky.git
cd gitlab-search-get-lucky
npm install