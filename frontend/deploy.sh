set -e
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:rd-99/chat-app-sockets.git master:gh-pages
cd -