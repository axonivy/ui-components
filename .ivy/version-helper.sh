to_next_version() {
  if [[ "$1" =~ ^next-([0-9]+)\.([0-9]+)$ ]]; then
    echo "${BASH_REMATCH[1]}.${BASH_REMATCH[2]}.0-next"
    return
  fi
  echo "${1/SNAPSHOT/next}"
}

to_next_tag() {
  if [[ "$1" =~ ^next-[0-9]+\.[0-9]+$ ]]; then
    echo "$1"
    return
  fi
  if [[ "$1" =~ ^([0-9]+)\.([0-9]+) ]]; then
    echo "next-${BASH_REMATCH[1]}.${BASH_REMATCH[2]}"
    return
  fi
  echo "Cannot derive next tag from version '$1'" >&2
  exit 1
}
