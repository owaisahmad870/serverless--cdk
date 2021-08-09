import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';

export class Step03AppsyncLambdaAsDatasourceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    ///APPSYNC API gives you a graphql api with api key
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: 'cdk-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),       ///Path specified for lambda
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,     ///Defining Authorization Type
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))   ///set expiration for API Key
          }
        },
      },
      xrayEnabled: true                                             ///Enables xray debugging
    })

    ///Print Graphql Api Url on console after deploy
    new cdk.CfnOutput(this, "APIGraphQlURL", {
      value: api.graphqlUrl
    })

    ///Print API Key on console after deploy
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

    ///Lambda Fucntion
    const lambda_function = new lambda.Function(this, "LambdaFucntion", {
      runtime: lambda.Runtime.NODEJS_14_X,            ///set nodejs runtime environment
      code: lambda.Code.fromAsset('lambda'),          ///path for lambda function directory
      handler: 'index.handler',                       ///specfic fucntion in specific file
      timeout: cdk.Duration.seconds(10)               ///Time for function to break. limit upto 15 mins
    })


    ////Set lambda as a datasource
    const lambda_data_source = api.addLambdaDataSource("lamdaDataSource", lambda_function);


    ///Describing resolver for datasource
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "notes"
    })


    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "customNote"
    })

  }
}






//Appsunc helps us to create a graphql api so that our lambda function can be accessed with the graphql


//there are three type of queries in graphql1: queries which acces the data. mutation which update the data
// and subscription for real time calling

//then we need to see the url it will be availalble in appsync interface but we can output it
//from here as well: cnfoutput


/* How does app sync works	with the data sources ?
When yoy connect an appsync to a data scource and send a request to appsync, thats redirected to the data source
so we have lamda function of the data source lambda will have	
access to the entire request all the	inputs and arguments and then lambda	
would do some processing and return something index.ts It would map onto the response of the appsync  */
