cp web.config ./build/web.config
cd build
find . -type d -exec ../scripts/recursive-ftp.sh {} \;
cd ..