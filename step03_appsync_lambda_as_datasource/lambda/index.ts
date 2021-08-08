import { App } from "@aws-cdk/core";
import { indexedAccessType } from "@babel/types";



type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    title: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  const notesArray = ["note1", "note2", "note3"];

  switch (event.info.fieldName) {
    case "notes":
      return notesArray;
    case "customNote":
      return event.arguments.title;
    default:
      return 'Welcome from Appsync lambda';
  }

};












/*are not creating a specific	resolver	inside our lambda function
with appsync we don have to worry about this you can use postman	to play with your 
graphql queries	and it will be similar to howyou will	be calling from your web application
 or	your mobile application	so that will be easy to understand
appsync service is created by the aws	specifically to create a graphql queries	
and you can have anything at the back	end your lavender function dynamodb or	any http 
endpoint
*/