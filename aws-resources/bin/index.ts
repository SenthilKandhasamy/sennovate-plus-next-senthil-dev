#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { SennovatePlusDevStack } from "../lib/dev";

const app = new cdk.App();

// Dev Stack
new SennovatePlusDevStack(app, "SennovatePlusDev", {
  env: {
    account: "664840511427",
    region: "us-east-1",
  },
});
