#!/bin/bash
set -euo pipefail

export BW_SESSION=$(bw unlock --raw)

export TELEGRAM_BOT_TOKEN=$(bw get item "Fount Of Russia Telegram Bot Token" | jq -r ".notes")
export TELEGRAM_CHAT_ID=$(bw get item "Fount Of Russia Telegram Bot Chat ID" | jq -r ".notes")
