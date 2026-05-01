#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

pnpm unpublish "@axonivy/ui-icons@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/ui-components@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/ui-graph@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/jsonrpc@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/eslint-config@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/ts-config@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/prettier-config@${1}" --registry $REGISTRY
