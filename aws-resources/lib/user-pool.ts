import { RemovalPolicy } from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface SennovatePlusUserPoolProps {
  userPoolName: string;
  domainPrefix: string;
  removalPolicy: RemovalPolicy;
  oidc: {
    name: string;
    clientId: string;
    clientSecret: string;
    issuerUrl: string;
  };
  appClient: {
    callbackUrls: string[];
    logoutUrls: string[];
  };
}

export class SennovatePlusUserPool extends Construct {
  constructor(scope: Construct, id: string, props: SennovatePlusUserPoolProps) {
    super(scope, id);

    const userPool = new cognito.UserPool(this, "SennovatePlusUserPool", {
      userPoolName: props.userPoolName,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      signInAliases: {
        email: true,
      },
      userInvitation: {
        emailSubject: "Sennovate Plus Credentials",
        emailBody:
          "Your temporary credentials: <br>Username: <b>{username}</b><br>Password: <b>{####}</b>",
      },
      customAttributes: {
        roles: new cognito.StringAttribute({
          mutable: true,
        }),
      },
      removalPolicy: props.removalPolicy,
    });

    new cognito.UserPoolIdentityProviderOidc(
      this,
      "SennovateIdaptiveIdentityProvider",
      {
        ...props.oidc,
        userPool,
        scopes: ["openid", "email"],
        attributeMapping: {
          email: cognito.ProviderAttribute.other("email"),
          custom: {
            ["custom:roles"]: cognito.ProviderAttribute.other("roles"),
          },
        },
      }
    );

    userPool.addClient("app-client", {
      userPoolClientName: "Next Application",
      generateSecret: true,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
        ],
        ...props.appClient,
      },
    });

    userPool.addDomain("SennovatePlusDomain", {
      cognitoDomain: {
        domainPrefix: props.domainPrefix,
      },
    });
  }
}
