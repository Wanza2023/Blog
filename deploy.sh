REPOSITORY=/home/ubuntu/deploy

mv /home/ubuntu/deploy/* /var/www/html/

cd $REPOSITORY

sudo yarn install

sudo npx pm2 reload all

service nginx restart