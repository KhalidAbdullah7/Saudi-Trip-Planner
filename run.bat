@echo off
title Saudi Trip Planner
color 0A
cd /d "%~dp0"

echo ============================================
echo    Saudi Trip Planner - Launcher
echo ============================================
echo.

:: ── Kill any running instances ──────────────────────────
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im esbuild.exe >nul 2>&1
timeout /t 2 /nobreak >nul
if exist "node_modules\.prisma\client\query_engine-windows.dll.node" del /f "node_modules\.prisma\client\query_engine-windows.dll.node" >nul 2>&1

:: ── Check Node.js ──────────────────────────────────────
where node >nul 2>&1
if ERRORLEVEL 1 goto :nonode
for /f "tokens=*" %%i in ('node --version') do echo [OK] Node.js %%i found
echo.
goto :step1

:nonode
echo [ERROR] Node.js is not installed.
echo         Download from: https://nodejs.org
pause
exit /b 1

:: ── Step 1: Install dependencies ───────────────────────
:step1
if exist node_modules goto :step1skip
echo [1/5] Installing dependencies...
call npm install
if ERRORLEVEL 1 goto :installfail
echo [OK] Dependencies installed.
echo.
goto :step2

:step1skip
echo [1/5] Dependencies already installed.
echo.
goto :step2

:installfail
echo [ERROR] npm install failed.
pause
exit /b 1

:: ── Step 2: Generate Prisma Client ─────────────────────
:step2
echo [2/5] Generating Prisma client...
call npx prisma generate
if ERRORLEVEL 1 goto :prismafail
echo [OK] Prisma client ready.
echo.
goto :step3

:prismafail
echo [ERROR] Prisma generate failed.
pause
exit /b 1

:: ── Step 3: Run database migrations ────────────────────
:step3
echo [3/5] Running database migrations...
call npx prisma migrate deploy
if ERRORLEVEL 1 goto :trypush
echo [OK] Database schema is up to date.
echo.
goto :step4

:trypush
echo [WARNING] Migration failed. Trying db push instead...
call npx prisma db push --accept-data-loss
if ERRORLEVEL 1 goto :dbfail
echo [OK] Database synced via db push.
echo.
goto :step4

:dbfail
echo [ERROR] Database sync failed. Is PostgreSQL running on port 5432?
echo         Make sure DATABASE_URL is set in .env file.
pause
exit /b 1

:: ── Step 4: Seed database ──────────────────────────────
:step4
echo [4/5] Seeding database with destinations...
node node_modules\tsx\dist\cli.mjs prisma/seed/index.ts
echo [OK] Database seeded.
echo.

:: ── Step 5: Build frontend ─────────────────────────────
:step5
echo [5/5] Building frontend...
call npx vite build
if ERRORLEVEL 1 goto :buildfail
echo [OK] Frontend built successfully.
echo.
goto :startserver

:buildfail
echo [ERROR] Frontend build failed.
pause
exit /b 1

:: ── Start the server ───────────────────────────────────
:startserver
echo ============================================
echo    Starting Saudi Trip Planner...
echo.
echo    Opening: http://localhost:3001
echo.
echo    Press Ctrl+C to stop the server.
echo ============================================
echo.

:: Open browser after a short delay
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3001"

:: Set production mode and start
set NODE_ENV=production
node node_modules\tsx\dist\cli.mjs server/index.ts

pause
