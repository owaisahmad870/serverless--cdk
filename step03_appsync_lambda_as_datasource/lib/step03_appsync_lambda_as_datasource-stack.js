"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step03AppsyncLambdaAsDatasourceStack = void 0;
const cdk = require("@aws-cdk/core");
const appsync = require("@aws-cdk/aws-appsync");
const lambda = require("@aws-cdk/aws-lambda");
class Step03AppsyncLambdaAsDatasourceStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        ///APPSYNC API gives you a graphql api with api key
        const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
            name: 'cdk-api',
            schema: appsync.Schema.fromAsset('graphql/schema.gql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY,
                    apiKeyConfig: {
                        expires: cdk.Expiration.after(cdk.Duration.days(365)) ///set expiration for API Key
                    }
                },
            },
            xrayEnabled: true ///Enables xray debugging
        });
        ///Print Graphql Api Url on console after deploy
        new cdk.CfnOutput(this, "APIGraphQlURL", {
            value: api.graphqlUrl
        });
        ///Print API Key on console after deploy
        new cdk.CfnOutput(this, "GraphQLAPIKey", {
            value: api.apiKey || ''
        });
        ///Lambda Fucntion
        const lambda_function = new lambda.Function(this, "LambdaFucntion", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'index.handler',
            timeout: cdk.Duration.seconds(10) ///Time for function to break. limit upto 15 mins
        });
        ////Set lambda as a datasource
        const lambda_data_source = api.addLambdaDataSource("lamdaDataSource", lambda_function);
        ///Describing resolver for datasource
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "notes"
        });
        lambda_data_source.createResolver({
            typeName: "Query",
            fieldName: "customNote"
        });
    }
}
exports.Step03AppsyncLambdaAsDatasourceStack = Step03AppsyncLambdaAsDatasourceStack;
//there are three type of queries in graphql1: queries which acces the data. mutation which update the data
// and subscription for real time calling
//then we need to see the url it will be availalble in appsync interface but we can output it
//from here as well: cnfoutput
/* How does app sync works	with the data sources ?
When yoy connect an appsync to a data scource and send a request to appsync, thats redirected to the data source
so we have lamda function of the data source lambda will have
access to the entire request all the	inputs and arguments and then lambda
would do some processing and return something welcome.ts
it would map onto the response of the appsync



*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAzX2FwcHN5bmNfbGFtYmRhX2FzX2RhdGFzb3VyY2Utc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwMDNfYXBwc3luY19sYW1iZGFfYXNfZGF0YXNvdXJjZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsZ0RBQWdEO0FBQ2hELDhDQUE4QztBQUU5QyxNQUFhLG9DQUFxQyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2pFLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBRTdDLG1EQUFtRDtRQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN0RCxJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztZQUN0RCxtQkFBbUIsRUFBRTtnQkFDbkIsb0JBQW9CLEVBQUU7b0JBQ3BCLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO29CQUNwRCxZQUFZLEVBQUU7d0JBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUcsNkJBQTZCO3FCQUN0RjtpQkFDRjthQUNGO1lBQ0QsV0FBVyxFQUFFLElBQUksQ0FBNkMseUJBQXlCO1NBQ3hGLENBQUMsQ0FBQTtRQUVGLGdEQUFnRDtRQUNoRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN2QyxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQVU7U0FDdEIsQ0FBQyxDQUFBO1FBRUYsd0NBQXdDO1FBQ3hDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3ZDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUU7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCO1FBQ2xCLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDbEUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBZSxpREFBaUQ7U0FDbEcsQ0FBQyxDQUFBO1FBR0YsOEJBQThCO1FBQzlCLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBR3ZGLHFDQUFxQztRQUNyQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7WUFDaEMsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUyxFQUFFLE9BQU87U0FDbkIsQ0FBQyxDQUFBO1FBR0Ysa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQTtJQUVKLENBQUM7Q0FDRjtBQXpERCxvRkF5REM7QUF1QkQsMkdBQTJHO0FBQzNHLHlDQUF5QztBQUV6Qyw2RkFBNkY7QUFDN0YsOEJBQThCO0FBRzlCOzs7Ozs7Ozs7RUFTRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuXG5leHBvcnQgY2xhc3MgU3RlcDAzQXBwc3luY0xhbWJkYUFzRGF0YXNvdXJjZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuXG4gICAgLy8vQVBQU1lOQyBBUEkgZ2l2ZXMgeW91IGEgZ3JhcGhxbCBhcGkgd2l0aCBhcGkga2V5XG4gICAgY29uc3QgYXBpID0gbmV3IGFwcHN5bmMuR3JhcGhxbEFwaSh0aGlzLCBcIkdSQVBIUUxfQVBJXCIsIHtcbiAgICAgIG5hbWU6ICdjZGstYXBpJyxcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KCdncmFwaHFsL3NjaGVtYS5ncWwnKSwgICAgICAgLy8vUGF0aCBzcGVjaWZpZWQgZm9yIGxhbWJkYVxuICAgICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xuICAgICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBhcHBzeW5jLkF1dGhvcml6YXRpb25UeXBlLkFQSV9LRVksICAgICAvLy9EZWZpbmluZyBBdXRob3JpemF0aW9uIFR5cGVcbiAgICAgICAgICBhcGlLZXlDb25maWc6IHtcbiAgICAgICAgICAgIGV4cGlyZXM6IGNkay5FeHBpcmF0aW9uLmFmdGVyKGNkay5EdXJhdGlvbi5kYXlzKDM2NSkpICAgLy8vc2V0IGV4cGlyYXRpb24gZm9yIEFQSSBLZXlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgeHJheUVuYWJsZWQ6IHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy9FbmFibGVzIHhyYXkgZGVidWdnaW5nXG4gICAgfSlcblxuICAgIC8vL1ByaW50IEdyYXBocWwgQXBpIFVybCBvbiBjb25zb2xlIGFmdGVyIGRlcGxveVxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiQVBJR3JhcGhRbFVSTFwiLCB7XG4gICAgICB2YWx1ZTogYXBpLmdyYXBocWxVcmxcbiAgICB9KVxuXG4gICAgLy8vUHJpbnQgQVBJIEtleSBvbiBjb25zb2xlIGFmdGVyIGRlcGxveVxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiR3JhcGhRTEFQSUtleVwiLCB7XG4gICAgICB2YWx1ZTogYXBpLmFwaUtleSB8fCAnJ1xuICAgIH0pO1xuXG4gICAgLy8vTGFtYmRhIEZ1Y250aW9uXG4gICAgY29uc3QgbGFtYmRhX2Z1bmN0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkxhbWJkYUZ1Y250aW9uXCIsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLCAgICAgICAgICAgIC8vL3NldCBub2RlanMgcnVudGltZSBlbnZpcm9ubWVudFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSwgICAgICAgICAgLy8vcGF0aCBmb3IgbGFtYmRhIGZ1bmN0aW9uIGRpcmVjdG9yeVxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLCAgICAgICAgICAgICAgICAgICAgICAgLy8vc3BlY2ZpYyBmdWNudGlvbiBpbiBzcGVjaWZpYyBmaWxlXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMCkgICAgICAgICAgICAgICAvLy9UaW1lIGZvciBmdW5jdGlvbiB0byBicmVhay4gbGltaXQgdXB0byAxNSBtaW5zXG4gICAgfSlcblxuXG4gICAgLy8vL1NldCBsYW1iZGEgYXMgYSBkYXRhc291cmNlXG4gICAgY29uc3QgbGFtYmRhX2RhdGFfc291cmNlID0gYXBpLmFkZExhbWJkYURhdGFTb3VyY2UoXCJsYW1kYURhdGFTb3VyY2VcIiwgbGFtYmRhX2Z1bmN0aW9uKTtcblxuXG4gICAgLy8vRGVzY3JpYmluZyByZXNvbHZlciBmb3IgZGF0YXNvdXJjZVxuICAgIGxhbWJkYV9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcIm5vdGVzXCJcbiAgICB9KVxuXG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcbiAgICAgIGZpZWxkTmFtZTogXCJjdXN0b21Ob3RlXCJcbiAgICB9KVxuXG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy90aGVyZSBhcmUgdGhyZWUgdHlwZSBvZiBxdWVyaWVzIGluIGdyYXBocWwxOiBxdWVyaWVzIHdoaWNoIGFjY2VzIHRoZSBkYXRhLiBtdXRhdGlvbiB3aGljaCB1cGRhdGUgdGhlIGRhdGFcbi8vIGFuZCBzdWJzY3JpcHRpb24gZm9yIHJlYWwgdGltZSBjYWxsaW5nXG5cbi8vdGhlbiB3ZSBuZWVkIHRvIHNlZSB0aGUgdXJsIGl0IHdpbGwgYmUgYXZhaWxhbGJsZSBpbiBhcHBzeW5jIGludGVyZmFjZSBidXQgd2UgY2FuIG91dHB1dCBpdFxuLy9mcm9tIGhlcmUgYXMgd2VsbDogY25mb3V0cHV0XG5cblxuLyogSG93IGRvZXMgYXBwIHN5bmMgd29ya3NcdHdpdGggdGhlIGRhdGEgc291cmNlcyA/XG5XaGVuIHlveSBjb25uZWN0IGFuIGFwcHN5bmMgdG8gYSBkYXRhIHNjb3VyY2UgYW5kIHNlbmQgYSByZXF1ZXN0IHRvIGFwcHN5bmMsIHRoYXRzIHJlZGlyZWN0ZWQgdG8gdGhlIGRhdGEgc291cmNlXG5zbyB3ZSBoYXZlIGxhbWRhIGZ1bmN0aW9uIG9mIHRoZSBkYXRhIHNvdXJjZSBsYW1iZGEgd2lsbCBoYXZlXHRcbmFjY2VzcyB0byB0aGUgZW50aXJlIHJlcXVlc3QgYWxsIHRoZVx0aW5wdXRzIGFuZCBhcmd1bWVudHMgYW5kIHRoZW4gbGFtYmRhXHRcbndvdWxkIGRvIHNvbWUgcHJvY2Vzc2luZyBhbmQgcmV0dXJuIHNvbWV0aGluZyB3ZWxjb21lLnRzXG5pdCB3b3VsZCBtYXAgb250byB0aGUgcmVzcG9uc2Ugb2YgdGhlIGFwcHN5bmNcblxuXG5cbiovIl19