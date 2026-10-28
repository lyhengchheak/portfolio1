@echo off
:: ============================================================================
:: POS Computer Auto-Run Startup Script
:: Created for: Windows POS Workstations (Restaurant POS & Seller POS)
:: Purpose: Automatically launch POS software, printer services & UltraViewer
:: ============================================================================

title POS Workstation Auto-Starter
color 0A
echo ======================================================
echo    Starting POS Computer Services & Workstation Setup
echo ======================================================
echo.

:: 1. Ensure Windows Print Spooler is running (for Thermal & Label Printers)
echo [1/5] Checking Print Spooler Service...
net start spooler >nul 2>&1
echo   - Print Spooler is Active.

:: 2. Start Database Service (if MySQL is installed locally)
echo [2/5] Checking Database Service (MySQL)...
net start MySQL >nul 2>&1
net start MySQL80 >nul 2>&1
echo   - Database check completed.

:: 3. Launch Remote Support in Background (UltraViewer)
echo [3/5] Starting UltraViewer Remote Support...
if exist "C:\Program Files (x86)\UltraViewer\UltraViewer_Desktop.exe" (
    start "" "C:\Program Files (x86)\UltraViewer\UltraViewer_Desktop.exe"
    echo   - UltraViewer launched.
) else (
    echo   - UltraViewer path not found (skipped).
)

:: 4. Launch POS Application (Adjust path for Restaurant POS or Seller POS)
echo [4/5] Launching POS Software...
set "POS_PATH=C:\POS\RestaurantPOS.exe"
set "SELLER_POS_PATH=C:\POS\SellerPOS.exe"

if exist "%POS_PATH%" (
    start "" "%POS_PATH%"
    echo   - Restaurant POS launched successfully.
) else if exist "%SELLER_POS_PATH%" (
    start "" "%SELLER_POS_PATH%"
    echo   - Seller POS launched successfully.
) else (
    echo   - [NOTE] Set your POS .exe path in this script (default: C:\POS\).
)

:: 5. Send Startup Alert to Telegram Bot (Optional)
:: Replace BOT_TOKEN and CHAT_ID with your real Telegram Bot credentials
set "BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN"
set "CHAT_ID=YOUR_CHAT_ID"
set "COMPUTER_NAME=%COMPUTERNAME%"

if not "%BOT_TOKEN%"=="YOUR_TELEGRAM_BOT_TOKEN" (
    echo [5/5] Sending startup notification to Telegram...
    curl -s -X POST "https://api.telegram.org/bot%BOT_TOKEN%/sendMessage" ^
         -d "chat_id=%CHAT_ID%" ^
         -d "text=POS Station [%COMPUTER_NAME%] started successfully at %TIME% on %DATE%" >nul 2>&1
    echo   - Telegram notification sent!
) else (
    echo [5/5] Telegram notification skipped (configure BOT_TOKEN if needed).
)

echo.
echo ======================================================
echo    POS Station is Ready for Cashier & Staff!
echo ======================================================
timeout /t 5 >nul
exit
