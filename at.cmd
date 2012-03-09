@IF EXIST "%~dp0"\"node.exe" (
  "%~dp0"\"node.exe"  "%~dp0\.\at gen.js" %*
) ELSE (
  node  "%~dp0\.\\at gen.js" %*
)