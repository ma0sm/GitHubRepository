def runTests( testSuite, Closure body ) {
    stage( "${testSuite} tests" ) {
        def mysql_image = docker.image( 'mysql:5.7' )
        mysql_image.pull()
        mysql_image.withRun( '-e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=database_name_here -e MYSQL_USER=username_here -e MYSQL_PASSWORD=password_here' ) { mysql ->
            def wp_image = docker.image( 'yoastseo/wordpress:latest' )
            wp_image.pull()
            wp_image.withRun( "-e WORDPRESS_DB_USER=username_here -e WORDPRESS_DB_PASSWORD=password_here -e WORDPRESS_DB_NAME=database_name_here -e WORDPRESS_DB_HOST=mysql --add-host www.www.github.com:127.0.0.1 --add-host www.github.com:127.0.0.1 --link ${mysql.id}:mysql" ) { wordpress ->
                def cli_image = docker.image( 'yoastseo/wordpress:cli' )
                cli_image.pull()
                cli_image.inside( "--volumes-from ${wordpress.id} --link ${mysql.id}:mysql" ) {
                    sh 'while ! mysqladmin ping -hmysql --silent; do sleep 1; done'
                    sh 'wp core install --url=http://www.github.com --admin_user=admin --admin_password=password --admin_email=testmanagement@yoast.com --title=Yoast --allow-root --path=/var/www/html'
                    sh 'cp data/custom_plugin.php /var/www/html/wp-content/plugins/'
                    sh 'wp plugin activate custom_plugin --allow-root --path=/var/www/html'
                    sh 'wp rewrite structure "%postname%/" --allow-root --path=/var/www/html'
                    sh 'wp rewrite flush --hard --allow-root --path=/var/www/html'
                    sh 'wp option update uploads_use_yearmonth_folders "" --allow-root --path=/var/www/html'
                    sh 'wp user create tester tester@yoast.com --user_pass=password1 --role=editor --allow-root --path=/var/www/html'
                    sh 'wp post create --post_title="Mypost" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_title="Newpost" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_title="Post3" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_title="testerpost" --post_status=publish --post_author=2 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_title="explore1" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_title="explore2" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_title="explore18" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_type=page --post_title="MyStaticHomepage" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_type=page --post_title="Mypage" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_type=page --post_title="Newpage" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_type=food --post_title="MyMovie" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp post create --post_type=food --post_title="MySong" --post_status=publish --post_author=1 --allow-root --path=/var/www/html'
                    sh 'wp term create category "Mycategory" --allow-root --path=/var/www/html'
                    sh 'wp term create category "Newcategory" --allow-root --path=/var/www/html'
                    sh 'wp term create category "TesterCategory" --allow-root --path=/var/www/html'
                    sh 'wp term create post_tag "Mytag" --allow-root --path=/var/www/html'
                    sh 'wp term create post_tag "Newtag" --allow-root --path=/var/www/html'
                    sh 'wp term create lunch "Early" --allow-root --path=/var/www/html'
                    sh 'rm -rf /var/www/html/wp-content/plugins/wordpress-seo'
                    sh 'cp -r wordpress-seo /var/www/html/wp-content/plugins/'
                    sh 'wp plugin activate wordpress-seo --allow-root --path=/var/www/html'
                    body()
                    sh 'mkdir /var/www/html/wp-content/uploads/pic'
                    sh 'cp data/* /var/www/html/wp-content/uploads/pic'
                    sh 'rm /var/www/html/wp-content/uploads/pic/custom_plugin.php'
                    sh 'wp media import /var/www/html/wp-content/uploads/pic/* --allow-root --path=/var/www/html'
                }

                def puppeteer_image = docker.image( 'buildkite/puppeteer:latest' )
                puppeteer_image.pull()
                puppeteer_image.inside( "--link ${wordpress.id}:www.github.com" ) {
                    try {
                        sh "npx codeceptjs run --reporter mochawesome --override '{ \"tests\": \"${testSuite}/*_test.js\", \"mocha\": { \"reporterOptions\": { \"reportDir\": \"mochawesome-report-${testSuite}\" } } }'"
                    } finally {
                        publishHTML( target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: false,
                            keepAll: true,
                            reportDir: "mochawesome-report-${testSuite}",
                            reportFiles: 'mochawesome.html',
                            reportName: "Plugins test report: ${testSuite}"
                        ] )
                    }

                }
            }
        }
    }
}

def buildPlugin( name, packages ) {
    dir( name ) {
        git url: "https://github.com/Yoast-dist/${name}.git", branch: 'trunk', credentialsId: 'Yoastbot-CI'
        withCredentials( [ file( credentialsId: 'Composer-Auth-JSON', variable: 'COMPOSER_AUTH_JSON' ) ] ) {
            sh 'mv $COMPOSER_AUTH_JSON .'
        }
        sh 'composer clear-cache'
        sh 'composer install --no-dev --no-scripts'
    }
}

def buildPluginWithoutDist( name ) {
    dir( name ) {
        git url: "https://github.com/Yoast/${name}.git", branch: 'trunk', credentialsId: 'Yoastbot-CI'
        withCredentials( [ file( credentialsId: 'Composer-Auth-JSON', variable: 'COMPOSER_AUTH_JSON' ) ] ) {
            sh 'mv $COMPOSER_AUTH_JSON .'
        }
        sh 'composer clear-cache'
        sh 'composer install --no-dev --no-scripts'
        sh 'yarn install'
        sh 'grunt build'
    }
}

node( 'docker-agent' ) {
        checkout scm
        properties(
            [
                [
                    $class: 'BuildDiscarderProperty',
                    strategy: [$class: 'LogRotator', numToKeepStr: '10']
                ],
                pipelineTriggers([[$class: "TimerTrigger", spec: "H H(0-2) * * *"]])
            ]
        )
        def workspace = pwd()
        docker.withServer( 'tcp://172.17.0.1:2375' ) {
            docker.withRegistry('', 'dockerhub') {
                docker.image( 'yoastseo/docker-php-composer-node:composer-1.10' ).inside {
                    def packages
                    parallel(
                        build_free: {
                            stage( 'build free' ) {
                                buildPlugin( 'wordpress-seo', packages )
                            }
                        },
                        build_premium: {
                            stage( 'build premium' ) {
                                buildPlugin( 'wordpress-seo-premium', packages )
                            }
                        },
 /*                       build_gutenberg: {
                            stage( 'build gutenberg' ) {
                                dir( 'gutenberg' ) {
                                    git url: 'https://github.com/WordPress/gutenberg.git', branch: 'trunk'
                                    credentialsId: 'yoastbot-ci'
                                    sh 'npm install && npm run build'
                                }
                            }
                        },
  */                      build_elementor: {
                            stage( 'build elementor' ) {
                                dir( 'elementor' ) {
                                    git url: 'https://github.com/elementor/elementor.git'
                                    branch: 'develop'
                                    credentialsId: 'yoastbot-ci'
                                    sh 'npm i && grunt build'
                                }
                            }
                        },
                        build_duplicate_post: {
                            stage( 'build duplicate post' ) {
                                buildPluginWithoutDist( 'duplicate-post' )
                            }
                        },
                        build_tests: {
                            stage( 'build_tests' ) {
                                sh 'npm install'
                            }
                        }
                    )
                }
                try {
                parallel plugins_tests: {
                    runTests( 'plugins_tests' ) {}
                }, free_console_logs: {
                    runTests( 'free_console_logs' ) {}
                }, free: {
                    runTests( 'free' ) {}
                }, free_analysis: {
                    runTests( 'free_analysis' ) {}
                }, free_json: {
                    runTests( 'free_json' ) {}
                }, free_general: {
                    runTests( 'free_general' ) {}
                }, free_query: {
                    runTests( 'free_query' ) {
                        sh 'wp plugin install https://downloads.wordpress.org/plugin/query-monitor.3.6.7.zip --activate --allow-root --path=/var/www/html'
                    }
                }, free_metabox: {
                    runTests( 'free_metabox' ) {}
                }, free_metabox_advanced: {
                    runTests( 'free_metabox_advanced' ) {}
                }, free_metabox_social: {
                    runTests( 'free_metabox_social' ) {}
                }, free_metabox_cpt: {
                    runTests( 'free_metabox_cpt' ) {}
                }, free_metabox_cpt_advanced: {
                    runTests( 'free_metabox_cpt_advanced' ) {}
                }, free_metabox_cpt_social: {
                    runTests( 'free_metabox_cpt_social' ) {}
                }, free_classic_editor: {
                    runTests( 'free_classic_editor' ) {
                        sh 'wp plugin install https://downloads.wordpress.org/plugin/classic-editor.1.6.zip --activate --allow-root --path=/var/www/html'
                    }
                }, free_classic_editor_advanced: {
                    runTests( 'free_classic_editor_advanced' ) {
                        sh 'wp plugin install https://downloads.wordpress.org/plugin/classic-editor.1.6.zip --activate --allow-root --path=/var/www/html'
                    }
                }, free_classic_editor_social: {
                    runTests( 'free_classic_editor_social' ) {
                        sh 'wp plugin install https://downloads.wordpress.org/plugin/classic-editor.1.6.zip --activate --allow-root --path=/var/www/html'
                    }
  /*              }, free_gutenberg: {
                    runTests( 'free_gutenberg' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/gutenberg'
                        sh 'cp -r gutenberg /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate wordpress-seo --allow-root --path=/var/www/html'
                        sh 'wp plugin activate gutenberg --allow-root --path=/var/www/html'
                    }
                }, free_gutenberg_advanced: {
                    runTests( 'free_gutenberg_advanced' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/gutenberg'
                        sh 'cp -r gutenberg /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate wordpress-seo --allow-root --path=/var/www/html'
                        sh 'wp plugin activate gutenberg --allow-root --path=/var/www/html'
                    }
                }, free_gutenberg_social: {
                    runTests( 'free_gutenberg_social' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/gutenberg'
                        sh 'cp -r gutenberg /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate wordpress-seo --allow-root --path=/var/www/html'
                        sh 'wp plugin activate gutenberg --allow-root --path=/var/www/html'
                    }
   */             }, free_elementor: {
                    runTests( 'free_elementor' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/elementor'
                        sh 'cp -r elementor /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate wordpress-seo --allow-root --path=/var/www/html'
                        sh 'wp plugin activate elementor --allow-root --path=/var/www/html'
                    }
                }, free_elementor_advanced: {
                    runTests( 'free_elementor_advanced' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/elementor'
                        sh 'cp -r elementor /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate wordpress-seo --allow-root --path=/var/www/html'
                        sh 'wp plugin activate elementor --allow-root --path=/var/www/html'
                    }
                }, free_elementor_social: {
                    runTests( 'free_elementor_social' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/elementor'
                        sh 'cp -r elementor /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate wordpress-seo --allow-root --path=/var/www/html'
                        sh 'wp plugin activate elementor --allow-root --path=/var/www/html'
                    }
                }, premium: {
                    runTests( 'premium' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/wordpress-seo-premium'
                        sh 'cp -r wordpress-seo-premium /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate wordpress-seo-premium --allow-root --path=/var/www/html'
                    }
                },
                 duplicate_post: {
                    runTests( 'duplicate_post' ) {
                        sh 'rm -rf /var/www/html/wp-content/plugins/duplicate-post'
                        sh 'cp -r duplicate-post /var/www/html/wp-content/plugins/'
                        sh 'wp plugin activate duplicate-post --allow-root --path=/var/www/html'
                    }
                }
            } finally {
            slackSend color: '#BADA55', channel: 'team-qa' ,  message: " '${env.JOB_NAME}': Test run has finished. Please check <${env.BUILD_URL}|Test reports>."
            }
        }
    }
}
