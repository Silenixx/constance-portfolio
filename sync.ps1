# Envoie ce projet vers /var/www/constance-portfolio, puis lance deploy.sh.
param([switch]$CopyOnly)
$ErrorActionPreference = "Stop"

$shared = Join-Path (Split-Path $PSScriptRoot -Parent) "sync-site.ps1"
if ($CopyOnly) {
    & $shared -Project constance-portfolio -CopyOnly
} else {
    & $shared -Project constance-portfolio
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
