#!/bin/bash

export BASE_PATH=$(pwd)
export WORDPRESS_INSTALL_PATH=$(pwd)/public_html/wordpress
export PLUGIN_PATH=${WORDPRESS_INSTALL_PATH}/wp-content/plugins

# install plugin
cd $PLUGIN_PATH
git clone -b feature/indexables-frontend git@github.com:Yoast-dist/wordpress-seo.git
cd wordpress-seo
composer install --no-dev --no-scripts
cd $WORDPRESS_INSTALL_PATH
wp plugin activate wordpress-seo
# return to base path
cd $BASE_PATH
# copy test image files
mkdir ${WORDPRESS_INSTALL_PATH}/wp-content/uploads/pic
cp data/* ${WORDPRESS_INSTALL_PATH}/wp-content/uploads/pic
# import test image files
cd $WORDPRESS_INSTALL_PATH
wp media import ${WORDPRESS_INSTALL_PATH}/wp-content/uploads/pic/*
# return to base path
cd $BASE_PATH
# copy tests for execution
cp free_json/* .
./node_modules/.bin/codeceptjs run --reporter mochawesome
