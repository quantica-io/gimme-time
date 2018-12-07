#! /bin/bash

npm install -g serverless
serverless deploy --stage $env --package $CODEBUILD_SRC_DIR/target/$env -v -r eu-central-1
