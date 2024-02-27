#!/bin/bash
set -e

npm install
sed -i -E "s/(\"@axonivy[^\"]*\"): \"[^\"]*\"/\1: \"~${1/SNAPSHOT/next}\"/" packages/*/package.json
npx lerna version ${1/SNAPSHOT/next} --no-git-tag-version --no-push --ignore-scripts --exact --yes
npm install
