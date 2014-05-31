#David C Moss

My personal portfolio and experiment playground

###Checkout
Checkout the code repo to your local development folder

```$ git clone git@github.com:davidmoss/davidcmoss.git```

##Locally

###Setup

To work locally you will want to ensure we work in an isolated environment where we control the packages and versions installed. Using a virtual environment will ensure this, there's also a helpful set of shortcuts to manage them aswell. Lets install them:

```
$ pip install virtualenv
$ pip install virtualenvwrapper
```

Now you will want to set it all up in your user profile `~/.profile` or `~/.bash_profile` based on your OS.

```
$ vim ~/.bash_profile

export WORKON_HOME=~/envs
source /usr/local/bin/virtualenvwrapper.sh

$ source ~/.bash_profile
$ mkdir -p $WORKON_HOME
```

There are also a set of useful Heroku tools to interact and deploy update. Install the toolbelt.

```$ wget -qO- https://toolbelt.heroku.com/install.sh | sh```

###Installation

First create everything to run our application. First lets create the virtualenv.

```$ mkvirtualenv davidcmoss```

Now install the requirements for the application.

```
(davidcmoss)$ cd davidcmoss
(davidcmoss)$ pip install -r requirements.txt
```

###Run the application

You can now start the processes in your Procfile locally using [Foreman](http://blog.daviddollar.org/2011/05/06/introducing-foreman.html) (installed as part of the Toolbelt):

```
(davidcmoss)$ foreman start -p 8000
10:12:53 web.1  | started with pid 63635
10:12:56 web.1  | 2014-05-31 10:12:56 [63635] [INFO] Starting gunicorn 18.0
10:12:56 web.1  | 2014-05-31 10:12:56 [63635] [INFO] Listening at: http://0.0.0.0:8000 (63635)
10:12:56 web.1  | 2014-05-31 10:12:56 [63635] [INFO] Using worker: sync
10:12:56 web.1  | 2014-05-31 10:12:56 [63638] [INFO] Booting worker with pid: 63638
```

Alternatively you can use the standard `django runserver` command

```
(davidcmoss)$ ./manage.py runserver
Validating models...

0 errors found
May 31, 2014 - 09:12:37
Django version 1.6.4, using settings 'davidcmoss.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

Now you can access the application at [http://127.0.0.1:8000](http://127.0.0.1:8000)

##Heroku

Heroku were the first major player in the PaaS world with quick and ease of deployment on the cloud. They are a perfect platform to use to run small, light apps.

###Create Instance

Ensure you have a Heroku user account. [Signup is free and instant](https://signup.heroku.com/signup/dc).

Once signed up login to heroku locally

```
$ heroku login
Enter your Heroku credentials.
Email: kenneth@example.com
Password:
Could not find an existing public key.
Would you like to generate one? [Yn]
Generating new SSH public key.
Uploading ssh public key /Users/kenneth/.ssh/id_rsa.pub
```

Create a place to push to from Heroku

```
$ heroku create
Creating stark-window-524... done, stack is cedar
http://stark-window-524.herokuapp.com/ | git@heroku.com:stark-window-524.git
Git remote heroku added
```

This automatically added the Heroku remote for our app (`git@heroku.com:stark-window-524.git`) to our repository. 

###Configuration

As the application uses [Grunt](gruntjs.com) to build and compress the CSS files on deployment we need to define the buildpackage that heroku should use to build and deploy the application. We have to override the automatic detection Heroku uses to define what application you are deploying so we run the node build and python deployment.

```
$ heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
$ heroku config:set NODE_ENV=production
```

###Deployment

Now do a simple `git push` to deploy the application

```
$ git push -f heroku master
Fetching repository, done.
Counting objects: 9, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 772 bytes | 0 bytes/s, done.
Total 6 (delta 3), reused 0 (delta 0)

-----> Fetching custom git buildpack... done
-----> Multipack app detected
=====> Downloading Buildpack: https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
=====> Detected Framework: Node.js

       PRO TIP: Specify a node version in package.json
       See https://devcenter.heroku.com/articles/nodejs-support

-----> Defaulting to latest stable node: 0.10.28
-----> Downloading and installing node
-----> Restoring node_modules directory from cache
-----> Pruning cached dependencies not specified in package.json
       npm WARN package.json DavidCMoss@0.1.0 No repository field.
-----> Writing a custom .npmrc to circumvent npm bugs
-----> Exporting config vars to environment
-----> Installing dependencies
       npm WARN package.json DavidCMoss@0.1.0 No repository field.
       
       > DavidCMoss@0.1.0 postinstall /tmp/build_34a3e3a3-371b-4a4c-9428-8ed522122e96
       > ./node_modules/grunt-cli/bin/grunt
       
       Running "less:production" (less) task
       File ./davidcmoss/static/css/main.css created: 1.31 kB → 1.04 kB
       
       Done, without errors.
-----> Caching node_modules directory for future builds
-----> Cleaning up node-gyp and npm artifacts
-----> Building runtime environment
-----> Exporting config vars to environment
npm WARN package.json DavidCMoss@0.1.0 No repository field.
npm http GET https://registry.npmjs.org/grunt-cli
...
grunt-cli@0.1.13 node_modules/grunt-cli
├── resolve@0.3.1
├── nopt@1.0.10 (abbrev@1.0.5)
└── findup-sync@0.1.3 (lodash@2.4.1, glob@3.2.11)
npm WARN package.json DavidCMoss@0.1.0 No repository field.
npm http GET https://registry.npmjs.org/grunt
...
grunt@0.4.5 node_modules/grunt
├── dateformat@1.0.2-1.2.3
├── which@1.0.5
├── eventemitter2@0.4.13
├── getobject@0.1.0
├── rimraf@2.2.8
├── colors@0.6.2
├── async@0.1.22
├── grunt-legacy-util@0.2.0
├── hooker@0.2.3
├── nopt@1.0.10 (abbrev@1.0.5)
├── exit@0.1.2
├── minimatch@0.2.14 (sigmund@1.0.0, lru-cache@2.5.0)
├── glob@3.1.21 (inherits@1.0.0, graceful-fs@1.2.3)
├── lodash@0.9.2
├── coffee-script@1.3.3
├── underscore.string@2.2.1
├── iconv-lite@0.2.11
├── findup-sync@0.1.3 (glob@3.2.11, lodash@2.4.1)
├── grunt-legacy-log@0.1.1 (underscore.string@2.3.3, lodash@2.4.1)
└── js-yaml@2.0.5 (esprima@1.0.4, argparse@0.1.15)
-----> Found Gruntfile, running grunt heroku:production task
Running "less:production" (less) task
File ./davidcmoss/static/css/main.css created: 1.31 kB → 1.04 kB

Done, without errors.
=====> Downloading Buildpack: https://github.com/heroku/heroku-buildpack-python.git
=====> Detected Framework: Python
-----> No runtime.txt provided; assuming python-2.7.6.
-----> Using Python runtime (python-2.7.6)
-----> Installing dependencies using Pip (1.5.6)
       Cleaning up...
-----> Preparing static assets
       Collectstatic configuration error. To debug, run:
       $ heroku run python ./manage.py collectstatic --noinput

Using release configuration from last framework (Python).
-----> Discovering process types
       Procfile declares types -> web

-----> Compressing... done, 48.0MB
-----> Launching... done, v16
-----> Deploy hooks scheduled, check output in your logs
       http://quiet-falls-4610.herokuapp.com/ deployed to Heroku

To git@heroku.com:quiet-falls-4610.git
 + [new branch] master -> master 
```

By default there are no web dynamos enabled, but you can easily scale this by executing:

```$ heroku ps:scale web=1```

and to confirm or check:

```
$ heroku ps
=== web: `gunicorn hellodjango.wsgi`
web.1: up for 10s
````

Note: Increasing the number above 1 will encure a cost

You can navigate and view the application in your browser of using the quick command:

```
$ heroku open
Opening simple-spring-9999.herokuapp.com... done
```

###Commands

You can use the heroku command line tools to access and alter your deployment but a couple of useful and familiar comands are:

```
$ heroku logs
2012-04-06T19:38:25+00:00 heroku[web.1]: State changed from created to starting
2012-04-06T19:38:29+00:00 heroku[web.1]: Starting process with command `gunicorn hellodjango.wsgi`
2012-04-06T19:38:29+00:00 app[web.1]: Validating models...
2012-04-06T19:38:29+00:00 app[web.1]:
2012-04-06T19:38:29+00:00 app[web.1]: 0 errors found
2012-04-06T19:38:29+00:00 app[web.1]: Django version 1.5, using settings 'hellodjango.settings'
2012-04-06T19:38:29+00:00 app[web.1]: Development server is running at http://0.0.0.0:6566/
2012-04-06T19:38:29+00:00 app[web.1]: Quit the server with CONTROL-C.
2012-04-06T19:38:30+00:00 heroku[web.1]: State changed from starting to up
2012-04-06T19:38:32+00:00 heroku[slugc]: Slug compilation finished

$ heroku run python manage.py shell
Running python manage.py shell attached to terminal... up, run.1
Python 2.7.6 (default, Jan 16 2014, 02:39:37)
[GCC 4.4.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> 
```

#####Reference

* Virtualenvwrapper - [http://virtualenvwrapper.readthedocs.org/en/latest/](http://virtualenvwrapper.readthedocs.org/en/latest/)
* Grunt runner - [https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt](https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt)
* Multi buildpack - [https://github.com/ddollar/heroku-buildpack-multi](https://github.com/ddollar/heroku-buildpack-multi)
* Getting started with django - [https://devcenter.heroku.com/articles/getting-started-with-django](https://devcenter.heroku.com/articles/getting-started-with-django)
* Getting started with python & Heroku - [https://devcenter.heroku.com/articles/getting-started-with-python](https://devcenter.heroku.com/articles/getting-started-with-python)
* Markdown Cheatsheet - [https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)