# Notime
Note-taking application that mimics how you take notes in real life

Get organized with notebooks containing pages, which in turn contain content as you wish

Use Notime's Rich Text Editor to add styles to the content you add to your pages. 

Built with ❤️ by [EyePan](https://github.com/Eyepan)

## Try it out

Notime is out [here](https://eyepan.github.io/notime-vue) if you want to try it out

## Build it yourself

### Requirements
- The [backend](https://github.com/Eyepan/notime-flask-backend) repository

1. Clone the backend repository to it's own folder (preferably)
```BASH
mkdir backend 
cd backend 
https://github.com/Eyepan/notime-flask-backend 
```

2. Clone the front-end repository to it's own folder (preferably)
```BASH
cd ../    # to get to project root
mkdir frontend
cd frontend 
git clone https://eyepan.github.io/notime-vue
```



3. Install all NPM modules and setup environment files
```BASH
cd frontend/notime-vue
npm i
```
Edit the `.env` file here
```ENV
VITE_API_URL='http://localhost:5000/api/'
```

4. Start the Flask server
```BASH
cd backend/notime-flask-backend
python flask_app.py
```

5. Start the front-end vite project
```
npm run dev
```

And enjoy!