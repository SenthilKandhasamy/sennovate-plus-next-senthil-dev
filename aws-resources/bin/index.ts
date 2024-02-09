#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { SennovatePlusDevStack } from "../lib/dev";
import { SennovatePlusProdStack } from "../lib/prod";

const app = new cdk.App();

// Dev Stack
new SennovatePlusDevStack(app, "SennovatePlusDev", {
  env: {
    account: "664840511427",
    region: "us-east-1",
  },
});

// Prod Stack
new SennovatePlusProdStack(app, "SennovatePlusProd", {
  env: {
    account: "664840511427",
    region: "us-east-1",
  },
});
