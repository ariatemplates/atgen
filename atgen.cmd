@IF EXIST "%~dp0"\"node.exe" (
  "%~dp0"\"node.exe"  "%~dp0\.\atgen.js" %*
) ELSE (
  node  "%~dp0\.\\atgen.js" %*
)