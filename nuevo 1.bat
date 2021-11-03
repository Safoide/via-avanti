@echo off
set /p commitComentario=Commit comentario
git add .
git commit -m "%commitComentario%"
git push -u origin