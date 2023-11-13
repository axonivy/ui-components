#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.io/"

npm unpublish "@axonivy/client-icons@${1}" --registry $REGISTRY
