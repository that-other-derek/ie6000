#requires -version 5
<#
  Zero-dependency static preview server for Windows PowerShell 5.1+.
  No Node, no Python, no install step — it uses a raw TCP listener.

  Usage:
      powershell -ExecutionPolicy Bypass -File .\preview.ps1
      powershell -ExecutionPolicy Bypass -File .\preview.ps1 -Port 8080

  Then open http://localhost:5173/
  Stop with Ctrl+C.
#>
param([int]$Port = 5173)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$mime = @{
  '.html'  = 'text/html; charset=utf-8'
  '.css'   = 'text/css; charset=utf-8'
  '.js'    = 'text/javascript; charset=utf-8'
  '.mjs'   = 'text/javascript; charset=utf-8'
  '.json'  = 'application/json; charset=utf-8'
  '.svg'   = 'image/svg+xml'
  '.png'   = 'image/png'
  '.jpg'   = 'image/jpeg'
  '.jpeg'  = 'image/jpeg'
  '.webp'  = 'image/webp'
  '.gif'   = 'image/gif'
  '.ico'   = 'image/x-icon'
  '.pdf'   = 'application/pdf'
  '.woff2' = 'font/woff2'
  '.woff'  = 'font/woff'
  '.txt'   = 'text/plain; charset=utf-8'
  '.md'    = 'text/plain; charset=utf-8'
}

function Send-Response {
  param($Stream, [int]$Status, [string]$StatusText, [byte[]]$Body, [string]$ContentType)
  $header =
    "HTTP/1.1 $Status $StatusText`r`n" +
    "Content-Type: $ContentType`r`n" +
    "Content-Length: $($Body.Length)`r`n" +
    "Cache-Control: no-store`r`n" +
    "Connection: close`r`n`r`n"
  $hb = [System.Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($hb, 0, $hb.Length)
  if ($Body.Length -gt 0) { $Stream.Write($Body, 0, $Body.Length) }
  $Stream.Flush()
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()

Write-Host ""
Write-Host "  Serving  $root" -ForegroundColor Cyan
Write-Host "  Open     http://localhost:$Port/" -ForegroundColor Green
Write-Host "  Stop     Ctrl+C" -ForegroundColor DarkGray
Write-Host ""

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII)
      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) { $client.Close(); continue }

      # Drain headers
      while ($true) {
        $line = $reader.ReadLine()
        if ($null -eq $line -or $line -eq '') { break }
      }

      $parts  = $requestLine -split '\s+'
      $target = if ($parts.Length -ge 2) { $parts[1] } else { '/' }
      $rel    = $target.Split('?')[0].Split('#')[0].TrimStart('/')
      if ([string]::IsNullOrWhiteSpace($rel)) { $rel = 'index.html' }
      $rel = $rel -replace '/', '\'

      # Block directory traversal
      if ($rel -match '\.\.') {
        $body = [System.Text.Encoding]::UTF8.GetBytes('400 Bad Request')
        Send-Response -Stream $stream -Status 400 -StatusText 'Bad Request' -Body $body -ContentType 'text/plain; charset=utf-8'
        continue
      }

      $full = Join-Path $root $rel
      if (Test-Path -LiteralPath $full -PathType Container) {
        $full = Join-Path $full 'index.html'
      }

      if (Test-Path -LiteralPath $full -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
        $ct  = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
        $body = [System.IO.File]::ReadAllBytes($full)
        Send-Response -Stream $stream -Status 200 -StatusText 'OK' -Body $body -ContentType $ct
        Write-Host ("  200  " + $rel) -ForegroundColor DarkGray
      } else {
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rel")
        Send-Response -Stream $stream -Status 404 -StatusText 'Not Found' -Body $body -ContentType 'text/plain; charset=utf-8'
        Write-Host ("  404  " + $rel) -ForegroundColor DarkYellow
      }
    } catch {
      Write-Host ("  ERR  " + $_.Exception.Message) -ForegroundColor Red
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
  Write-Host "  Server stopped." -ForegroundColor DarkGray
}
