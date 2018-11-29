#!/bin/bash



echo mv -v build/static/js/*.js ../been-there-backend/public/js/bundle.js
mv -v build/static/js/*.js ../been-there-backend/public/js/bundle.js

echo mv -v build/static/js/main.*.chunk.js ../been-there-backend/public/js/main.js
mv -v build/static/js/main.*.chunk.js ../been-there-backend/public/js/main.js

echo mv -v build/static/js/*.chunk.js ../been-there-backend/public/js/chunk.js
mv -v build/static/js/*.chunk.js ../been-there-backend/public/js/chunk.js

echo cp -v build/static/css/main.*.css ../been-there-backend/public/css/main.css
cp -v build/static/css/main.*.css ../been-there-backend/public/css/main.css
