CONTENT_TYPE="Content-Type: application/x-www-form-urlencoded; charset=UTF-8;";
USER_AGENT="Mozilla/4.73 [en] (X11; U; Linux 2.2.15 i686)"

exitOnFail() {
  local command=$1
  local result=$(echo $command | jq '.result')
  if [[ "$result" != "0" ]] ; then
    echo "Following command failed with result $result: $command"
    exit 1
  fi
}