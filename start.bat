@echo off
setlocal
set "NODE_PATH=%USERPROFILE%\.nodejs\node-v20.18.0-win-x64"
if exist "%NODE_PATH%" (
    set "PATH=%NODE_PATH%;%PATH%"
)
echo ===================================================
echo   Jo Collections (React.js + TypeScript)
echo   Starting local development server...
echo ===================================================
echo.
call npm run dev
pause
