#!/usr/bin/env bash
set -e

echo "============================================"
echo "   Saudi Trip Planner — Launcher"
echo "============================================"
echo

# ── Check Docker ────────────────────────────────────────
if ! command -v docker &> /dev/null; then
    echo "[ERROR] Docker is not installed."
    echo "        Install from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! docker info &> /dev/null 2>&1; then
    echo "[ERROR] Docker daemon is not running. Start Docker Desktop first."
    exit 1
fi

echo "[OK] Docker is ready."
echo

# ── Build & Start ───────────────────────────────────────
echo "[1/3] Building containers..."
docker compose build

echo
echo "[2/3] Starting database..."
docker compose up -d db
echo "      Waiting for database to be ready..."
sleep 5

echo
echo "[3/3] Running migrations + seed, then starting app..."
docker compose up -d seed
sleep 10
docker compose up -d app

echo
echo "============================================"
echo "   All services are running!"
echo
echo "   Open your browser at:"
echo "   http://localhost:3001"
echo
echo "   To stop:  docker compose down"
echo "   To reset: docker compose down -v"
echo "============================================"
echo

# ── Open browser ────────────────────────────────────────
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3001
elif command -v open &> /dev/null; then
    open http://localhost:3001
fi

echo "Press Ctrl+C to stop viewing logs..."
docker compose logs -f app
