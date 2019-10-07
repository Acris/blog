pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        dir(path: 'source') {
          git(url: 'git@github.com:Acris/blog-source.git', branch: 'master', changelog: true, poll: true, credentialsId: 'oracle-cloud-tokyo')
        }
        
        dir(path: 'themes/next') {
          git(url: 'git@github.com:Acris/hexo-theme-next.git', branch: 'master', changelog: true, poll: true, credentialsId: 'oracle-cloud-tokyo')
        }
        
        echo 'Initialize success!'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn add hexo-cli && yarn && yarn run hexo clean && yarn run hexo generate'
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
    BLOG_HOME = '/srv/blog'
  }
  triggers {
    pollSCM('*/5 * * * *')
  }
}
