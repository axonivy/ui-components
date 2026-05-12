#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

pnpm unpublish "@axonivy/ui-icons@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/ui-components@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/jsonrpc@${1}" --registry $REGISTRY
