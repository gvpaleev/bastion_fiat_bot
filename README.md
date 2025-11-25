# Bastion Fiat Bot

Telegram bot for automated VPN and proxy service provisioning via SSH.

## Features

- VPN configuration generation (WireGuard)
- Proxy account creation (Dante)
- Session management
- Automated server provisioning via SSH

## Requirements

- Node.js
- Telegram Bot Token
- SSH access to server with WireGuard and Dante installed

## Installation

```bash
npm install
```

## Configuration

Create `.env` file:
```
BOT_TOKEN=your_telegram_bot_token
```

Configure server in `config/default.json`:
```json
{
  "servers": [{
    "host": "server_ip",
    "port": "22",
    "username": "root",
    "password": "password"
  }]
}
```

## Usage

```bash
node main.js
```

## Commands

- `/start` - Start bot and show menu

## Dependencies

- grammy - Telegram bot framework
- @grammyjs/menu - Menu plugin
- @grammyjs/storage-file - Session storage
- node-ssh - SSH client
- generate-password - Password generator
- dotenv - Environment variables
