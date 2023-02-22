@echo off


echo "Running npm build to build to ./dist"
npm run build
echo "github actions"
git add .
git commit -m 'dist update'
git subtree push --prefix dist origin gh-pages
