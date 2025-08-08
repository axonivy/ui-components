#!/bin/bash
set -e

mvn --batch-mode -f packages/icons/pom.xml versions:set versions:commit -DnewVersion=${1}

pnpm install
pnpm run raise:version ${1/SNAPSHOT/next}
pnpm install
