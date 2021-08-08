import * as cdk from '@aws-cdk/core';
import * as  s3 from '@aws-cdk/aws-s3';
import * as  s3deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import { CfnOutput } from '@aws-cdk/core';


export class Step02HelloWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // create a bucket to upload your app files

    const websiteBucket = new s3.Bucket(this, 'MyWebBucket', {
      versioned: true,
    });
    


 // create a CDN to deploy your website
   // Handles buckets whether or not they are configured for website hosting.

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: { origin: new origins.S3Origin(websiteBucket) }, 
      defaultRootObject: "index.html",
   });




// Prints out the web endpoint to the terminal

     new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName
  });





// housekeeping for uploading the data in bucket

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./myweb')],
      destinationBucket: websiteBucket, distribution,
      //destinationKeyPrefix: 'web/static', // optional prefix in destination bucket
      distributionPaths: ["/*"],


    });
  }
}



//Without the CloudFront 'const' it will deploy your s3 but it will not give you a particular url 
//on which you can go. So for that we need a cloud front distribution 'const distribution...'
//and also specify the 'distribution' in the Deployement bucket 
//CloudFront distribution includes origin which means the location where content is stored,
// and from which CloudFront gets content to serve to viewers
//for more info see this: "https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_Origin.html"


//This will create two s3 buckets one for the website and other as zip file
//zip file contains a website or a lambda function, the complete content

//If the destination bucket is not dedicated to the specific BucketDeployment construct (i.e shared by other entities),
// we recommend to always configure the destinationKeyPrefix property. This will prevent the deployment from accidentally deleting
// data that wasn't uploaded by it.
