#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

npm unpublish "@axonivy/ui-icons@${1}" --registry $REGISTRY
npm unpublish "@axonivy/ui-components@${1}" --registry $REGISTRY
npm unpublish "@axonivy/ui-graph@${1}" --registry $REGISTRY
npm unpublish "@axonivy/jsonrpc@${1}" --registry $REGISTRY
npm unpublish "@axonivy/monaco@${1}" --registry $REGISTRY
npm unpublish "@axonivy/eslint-config@${1}" --registry $REGISTRY
npm unpublish "@axonivy/ts-config@${1}" --registry $REGISTRY
npm unpublish "@axonivy/prettier-config@${1}" --registry $REGISTRY
