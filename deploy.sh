#!/bin/bash

export PORT=5007
export MIX_ENV=prod
export GIT_PATH=/home/tasksmanager/src/tasksmanager

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "tasksmanager" ]; then
	echo "Error: must run as user 'tasksmanager'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/tasksmanager ]; then
	echo mv ~/www/tasksmanager ~/old/$NOW
	mv ~/www/tasksmanager ~/old/$NOW
fi

mkdir -p ~/www/tasksmanager
REL_TAR=~/src/tasksmanager/_build/prod/rel/tasksmanager/releases/0.0.1/tasksmanager.tar.gz
(cd ~/www/tasksmanager && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/tasksmanager/src/tasksmanager/start.sh
CRONTAB

#. start.sh
