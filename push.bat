@echo off
setlocal
echo =======================================================
echo   Pushing JO-Collections to GitHub...
echo   Repository: https://github.com/Rahulracharla11/JO-Collections.git
echo =======================================================
echo.
cd /d "c:\Users\12rra\Desktop\JO Collections"
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Code pushed successfully to GitHub!
) else (
    echo [NOTE] If you were prompted for credentials, please sign in or use a GitHub Personal Access Token.
)
echo.
pause
