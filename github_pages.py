import os

# Prompt user for commit message
commit_message = input("Enter a commit message: ")

# Build with npm
print("Running npm build to build to ./dist")
os.system("npm run build")

# Commit and push to gh-pages
print("github actions")
os.system(f'git add .')
os.system(f'git commit -m "{commit_message}"')
os.system("git subtree push --prefix dist origin gh-pages")
