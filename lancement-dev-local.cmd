@echo off
rem constance-portfolio : site Vite (:5173).
rem Double-clic dans l'Explorateur, ou .\lancement-dev-local.cmd dans un terminal.
rem Une fenêtre par serveur. Arrêt : fermer les fenêtres, ou Ctrl+C dans chacune.
setlocal
set "ROOT=%~dp0"
set "ROOT=%ROOT:~0,-1%"

if not exist "%ROOT%\node_modules" (
  echo [constance-portfolio] npm install...
  pushd "%ROOT%" & call npm install & popd
)

start "constance-portfolio" /D "%ROOT%" cmd /k npm run dev -- --open
