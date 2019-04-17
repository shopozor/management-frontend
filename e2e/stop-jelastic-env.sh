#!/bin/bash

if [ $# -ne 5 ] ; then
  echo "Usage: $0 hosterUrl appId login password envName"
  exit 0
fi

HOSTER_URL=$1
APPID=$2
SESSION=$(getSession $3 $4)
ENV_NAME=$5
CONTENT_TYPE="Content-Type: application/x-www-form-urlencoded; charset=UTF-8;";
USER_AGENT="Mozilla/4.73 [en] (X11; U; Linux 2.2.15 i686)"

stopEnv $SESSION $ENV_NAME

getSession() {
  local login=$1
  local password=$2
  echo "Signing in..." >&2
  local signIn=$(curl -k -H "${CONTENT_TYPE}" -A "${USER_AGENT}"  -X POST \
    -fsS "${HOSTER_URL}/1.0/users/authentication/rest/signin" -d "login=$login&password=$password");
  echo 'Response signIn user: '$signIn >&2
  echo "Signed in" >&2
  echo $( jq '.session' <<< $signIn |  sed 's/\"//g' )
}

stopEnv() {
  local session=$1
  local envName=$2
  echo "Stopping up environment <$envName>..." >&2
  curl -k \
    -H "${CONTENT_TYPE}" \
    -A "${USER_AGENT}" \
    -X POST \
    -fsS ${HOSTER_URL}/1.0/environment/control/rest/stopenv -d "session=${session}&envName=${envName}"
  echo "Environment <$envName> stopped" >&2 
  exit 0
}
