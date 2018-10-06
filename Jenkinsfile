pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        dir(path: 'source') {
          git(url: 'git@gitlab.com:Acris/blog-source.git', branch: 'master', changelog: true, poll: true, credentialsId: 'amazon-linux')
        }
        
        dir(path: 'themes/next') {
          git(url: 'git@github.com:Acris/hexo-theme-next.git', branch: 'master', changelog: true, poll: true, credentialsId: 'amazon-linux')
        }
        
        echo 'Initialize success!'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn add hexo-cli gulp-cli && yarn && yarn run hexo clean && yarn run hexo generate && yarn run gulp'
        echo 'Build success!'
      }
    }
    stage('Deploy') {
      steps {
        sh 'rm -rf $BLOG_HOME/* && cp -a $WORKSPACE/public/. $BLOG_HOME'
        echo 'Deploy success!'
      }
    }
    stage('Clean') {
      steps {
        deleteDir()
        echo 'Clean success!'
      }
    }
  }
  environment {
    BLOG_HOME = '/usr/share/nginx/html/blog'
  }
  triggers {
    pollSCM('*/5 * * * *')
  }
}
