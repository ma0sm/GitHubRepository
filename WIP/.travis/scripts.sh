#!/bin/bash

wp rewrite structure '%postname%/' --allow-root --path=/var/www/html
wp rewrite flush --hard --allow-root --path=/var/www/html
wp option update uploads_use_yearmonth_folders "" --allow-root --path=/var/www/html
wp user create tester tester@yoast.com --user_pass=password1 --role=editor --allow-root --path=/var/www/html
wp post create --post_title='Mypost' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_title='Newpost' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_title='Post3' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_title='testerpost' --post_status=publish --post_author=2 --allow-root --path=/var/www/html
wp post create --post_title='explore1' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_title='explore2' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_title='explore18' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_type=page --post_title='MyStaticHomepage' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_type=page --post_title='Mypage' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_type=page --post_title='Newpage' --post_status=publish --allow-root --path=/var/www/html
wp post create --post_type=food --post_title='MyMovie' --post_status=publish --allow-root --path=/var/www/html
wp term create category 'Mycategory' --allow-root --path=/var/www/html
wp term create category 'Newcategory' --allow-root --path=/var/www/html
wp term create category 'TesterCategory' --allow-root --path=/var/www/html
wp term create post_tag 'Mytag' --allow-root --path=/var/www/html
wp term create post_tag 'Newtag' --allow-root --path=/var/www/html
wp term create lunch 'Early' --allow-root --path=/var/www/html
