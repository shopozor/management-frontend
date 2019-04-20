#!/bin/bash

if [ $# -ne 5 ] ; then
  echo "Usage: $0 hosterUrl appId login password envName"
  exit 0
fi

. helpers.sh

getSession() {
  local login=$1
  local password=$2
  echo "Signing in..." >&2
  local cmd=$(curl -k -H "${CONTENT_TYPE}" -A "${USER_AGENT}"  -X POST \
    -fsS "${HOSTER_URL}/1.0/users/authentication/rest/signin" -d "login=$login&password=$password");
  exitOnFail $cmd
  echo 'Response signIn user: '$cmd >&2
  echo "Signed in" >&2
  echo $(jq '.session' <<< $cmd |  sed 's/\"//g')
}

HOSTER_URL=$1
APPID=$2
SESSION=$(getSession $3 $4)
ENV_NAME=$5

stopEnv() {
  local session=$1
  local envName=$2
  echo "Stopping up environment <$envName>..." >&2
  local cmd=$(curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/control/rest/stopenv -d "session=${session}&envName=${envName}")
  exitOnFail $cmd
  echo "Environment <$envName> stopped" >&2 
  exit 0
}

stopEnv $SESSION $ENV_NAME
