#!/bin/bash
ftp_site=$FTP_SITE
username=$FTP_USERNAME
passwd=$FTP_PASSWORD
remote='site/wwwroot'
folder=$1
cd $folder
pwd

ftp -p -in <<EOF
open $ftp_site
user $username $passwd
mkdir $remote/$folder
cd $remote/$folder
mput *
close
bye
EOF