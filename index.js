'use strict';

 /**
  * This sample demonstrates an implementation of the Lex Code Hook Interface
  * in order to serve a sample bot which manages orders for flowers.
  * Bot, Intent, and Slot models which are compatible with this sample can be found in the Lex Console
  * as part of the 'OrderFlowers' template.
  *
  * For instructions on how to set up and test this bot, as well as additional samples,
  *  visit the Lex Getting Started documentation.
  */


 // --------------- Helpers to build responses which match the structure of the necessary dialog actions -----------------------
var globalotp='1111';
var globbalname='User';
 var mobilenumber=null;
 var isAdmin="0";
 var globalProductID='';
 var globalProductCost='0';
 var globalProductlink='';
 var globalProductDesc='';
 var dbkey='';
 var productID=0;
 var totalcnt=0;
 
    var vr_dob='';
    var vr_gender='';
    var vr_pass='';
    var vr_isMarried='';
    var vr_dom='';
    var vr_haveKids='';
    var vr_address='';
    var vr_pincode='';
function elicitSlot(sessionAttributes, intentName, slots, slotToElicit, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
        },
    };
}

function elicitResSlot(sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
            responseCard,
        },
    };
}



function DisplayCard(sessionAttributes, intentName, slots, slotToElicit, message)
{
    return {
        sessionAttributes,
          dialogAction: {
            type: 'ElicitSlot',
            intentName,
            slots,
            slotToElicit,
            message,
        },
       messageFormat: "PlainText",
       responseCard: {
       contentType: "application/vnd.amazonaws.card.generic",
      genericAttachments: [
      {
        attachmentLinkUrl: null,
        buttons: [
          {
            text: "Buy",
            value: "Cotton T Shirt Size 40"
          }
        ],
        imageUrl: "https://s3.amazonaws.com/fabricstoreimages/Assorted_T_Shirts_large.jpg",
        subTitle: "Size 40 Round Neck",
        title: "Cotton T Shirt "
      },
      {
        attachmentLinkUrl: null,
        buttons: [
          {
            text: "Buy",
            value: "Linen T shirt Size 38"
          }
        ],
        imageUrl: "https://s3.amazonaws.com/fabricstoreimages/Blue_Tshirt.jpg",
        subTitle: "Size 30 Round Neck",
        title: "Linen T Shirt"
      }
    ],
    "version": "1"
  },
  slotToElicit: "PCode",
  slots: {
    "AccountNumber": null,
    "BankName": null,
    "DeliveryDate": null,
    "DeliveryTime": null,
    "IFSC": null,
    "Mobile": "7893988172",
    "OTP": null,
    "PCode": null
  }
};


}
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function closeWithCard(sessionAttributes, fulfillmentState, message,responseCard) {
    return {
         sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
            responseCard,
        },
       
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}

// ---------------- Helper Functions --------------------------------------------------

function parseLocalDate(date) {
    /**
     * Construct a date object in the local timezone by parsing the input date string, assuming a YYYY-MM-DD format.
     * Note that the Date(dateString) constructor is explicitly avoided as it may implicitly assume a UTC timezone.
     */
    const dateComponents = date.split(/\-/);
    return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
}

function isValidDate(date) {
    try {
        return !(isNaN(parseLocalDate(date).getDate()));
    } catch (err) {
        return false;
    }
}

// function GetUser(mobilenumber,callback,intentRequest)
// {
//       var AWS= require('aws-sdk');
//     //AWS.config.update({region:'us-west-2'});
//   var ddb= new AWS.DynamoDB.DocumentClient();
   
//     var paramsgetid={
//          TableName:'Customer',
//          FilterExpression:'#ID = id',
//          ExpressionAttributeNames:{'#ID':'ID'},
//          ExpressionAttributeValues:{'id':'1'}
//       };
   
//   ddb.getItem(paramsgetid,onScan);
//   //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Before for Loop' })); 
//   function onScan(err,data)
//   {
//       if(err)
//       {
//           callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'First ifc'})); 
//           callback(err);
//       }
//       else{
//           callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'else'})); 
//           data.Items.forEach(function(itemData){
//                 callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Customer ID2 : ' +JSON.stringify(itemData)})); 
//           });
           
//           if(typeof data.LastEvaluatedKey!="undefined")
//           {
//               paramsgetid.ExclusiveStartKey=data.LastEvaluatedKey;
//               ddb.scan(paramsgetid,onScan);
//           }
//       }
//   }
//       //ddb.query(paramsgetid,function(err,result)
//       //{
//          //  callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Customer ID2 : ' })); 
//       //});
        
// callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'After for Loop' }));






// }


// function getCustomerData(mobilenumber,callback,intentRequest)
// {
    
//     var AWS= require('aws-sdk');
//     var db= new AWS.DynamoDB();
//     db.client.scan({TableName:'Customer',
//                     Limit:50
//                   },function(err,data){
//                          if(err){
//                                  return;
//                                  }
//                               else{
//                                   for(var li in data.Items)
//                                      {
//                                              li=data.Items[li];
//                                                   callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Customer data : '+ li.Name })); 
//                                       }
       
//                                   }
// });

    
// }

// function GetUserData(mobilenumber,callback,intentRequest)
// {
//       var AWS= require('aws-sdk');
//     //AWS.config.update({region:'us-west-2'});
//   var ddb= new AWS.DynamoDB();
   
//     var paramsgetid={
//          TableName:'Customer',
//          FilterExpression:'#ID = :id',
//          ExpressionAttributeNames:{'#ID':'ID'},
//          ExpressionAttributeValues:{':id':{N:'1'}}
//       };
   
//   ddb.getItem(paramsgetid,function  (err,data)
//   {
//       if(err)
//       {
//           // callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'First ifc'})); 
//           callback(err);
//       }
//       else{
//          //  callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'else'})); 
//           data.Items.forEach(function(itemData){
//                 callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Customer ID2 : ' +JSON.stringify(itemData)})); 
//           });
           
//           if(typeof data.LastEvaluatedKey!="undefined")
//           {
//               paramsgetid.ExclusiveStartKey=data.LastEvaluatedKey;
//               // ddb.scan(paramsgetid,onScan);
//           }
//       }
//   });
//   //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Before for Loop' })); 
   
//       //ddb.query(paramsgetid,function(err,result)
//       //{
//          //  callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Customer ID2 : ' })); 
//       //});
        
// //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'After for Loop' }));
// }

// function GetUserDataFromDB(callback,intentRequest)
// {
//   var AWS = require('aws-sdk');
//   var ddb = new AWS.DynamoDB();

// var params = {
//   TableName: 'Customer',
//   Key: {
//     'ID' : {N: '2'},
//   }//,
//  // ProjectionExpression: 'ATTRIBUTE_NAME'
// };

// // Call DynamoDB to read the item from the table
// ddb.getItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//   //callback(data.Items[0]);
//  callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText',    content: 'customerid: '+data.Item.DOB.S}));
//   }
// });
// }

function buildResponseCard(title, subTitle,link) {
     let buttons = null;
     var obj={text: 'Buy', value:title+'$'+subTitle+'$'+link};
        buttons = [];
        buttons.push(obj);
    
    return {
        contentType: 'application/vnd.amazonaws.card.generic',
        version: 1,
       
        genericAttachments: [{
            imageUrl: link,
            title,
            subTitle,
            buttons,
        }],
    };
}

function buildResponseCardatt(attachments) {
   
   // console.log('2.attachments:' + attachments.ObjectAt[0]);
    return {
        contentType: 'application/vnd.amazonaws.card.generic',
        version: 1,
        genericAttachments: attachments,
    };
}


function GetProductDetails(pcode,callback)
{
         var AWS= require('aws-sdk');
            var docClient = new AWS.DynamoDB.DocumentClient();
    //AWS.config.update({region:'us-west-2'});
    var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
   globalProductID=pcode;
  var params = {
    TableName: "Products"
  };
  
docClient.scan(params, onScanProduct);
  function onScanProduct(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded.");
         
        data.Items.forEach(function(itemdata) {
         console.log('pcode.toString().trim() ------'+pcode.toString().trim());
         console.log('itemdata.Description..toString().trim() ------'+itemdata.Description.toString().trim());
        if(pcode.toString().trim()===itemdata.Id.toString().trim())
        {
          globalProductCost=itemdata.Cost.toString();
          globalProductID=itemdata.Id;
          globalProductlink=itemdata.link;
          globalProductDesc=itemdata.Description;
            console.log("pcode"+pcode);
             console.log("itemdata.ProductDesc"+itemdata.Description);
             console.log("itemdata.Cost"+itemdata.Cost);
        }
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScanProduct);
        }
    }
}
//   console.log('pcode: ----'+pcode);
//       var params = {
//                           TableName: 'Products',
//                           Key: {
//                                     'Id' : {N: pcode.toString()},
//                                 }
//                   };
                   
//                     ddb.getItem(params, function(err, data) {
//                           if (err) {
//                             console.log("Error", err);
//                           } else {   
//                              console.log('data.Item'+data.Item.Cost);
                             
//                                      var nme=data.Item;
//                                     var n=JSON.stringify({"Cost" : nme});
//                                     var nm=JSON.parse(n);
//                                     var cost=nm["Cost"].S;
//                                   globalProductCost=cost;
                                  
                               
//                                     var nme=data.Item;
//                                     var n=JSON.stringify({"link" : nme});
//                                     var nm=JSON.parse(n);
//                                     var link=nm["link"].S;
//                                   globalProductlink=link;
                                  
//                           }
//                     });
  
}

function ShowProductList(intentRequest,callback)
{
   var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();
   var sleep = require('system-sleep');
  var attachments = [];
  var params = {
    TableName: "Products"
  };
 var validationResult= buildValidationResult(false, 'ProductCode', 'What Product would you like to buy?');

var totalcount=0;
//docClient.scan(params, onScanCount);

docClient.scan(params, onScan);
var count = 0;

// function onScanCount(err, data) {
//     if (err) {
//         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {        
//         console.log("Scan succeeded.");
         
//         data.Items.forEach(function(itemdata) {
          
//           totalcount++;
           
//         });

//         // continue scanning if we have more items
//         if (typeof data.LastEvaluatedKey != "undefined") {
//             console.log("Scanning for more...");
//             params.ExclusiveStartKey = data.LastEvaluatedKey;
//             docClient.scan(params, onScan);
//         }
//     }
// }

var count=0;
  
  
function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded.");
         
        data.Items.forEach(function(itemdata) {
           
          count++;
           var ProductDesc=itemdata.Description;
           var ProductCost=itemdata.Cost;
           var link=itemdata.link;
           var brandName=itemdata.BrandName;
        var productId=itemdata.Id;
       //  var obj={text: 'Buy', value:ProductDesc+'$'+ProductCost+'$'+link};
          var obj={text: 'Buy', value:productId};
           var obj2={text: 'Add To WishList', value:'Add to Wish '+productId};
           var obj3={text: 'View Feedbacks', value:'view Feeds of '+productId};
        var buttons = [];
        buttons.push(obj);
        buttons.push(obj2);
        buttons.push(obj3);
        var obj=  {
          title:brandName+'-'+ProductDesc,
          subTitle:ProductCost,
          imageUrl:link,
          buttons:buttons
         };
          attachments.push(obj);
          
           console.log('Inside Description:'+ ProductDesc);
           console.log('Inside ProductCost:'+ ProductCost);
           console.log('Inside link:'+ link);
            sleep(1000);
if(data.ScannedCount==count)
{
           callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
            intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `What product would you like to buy?` },
            buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
}
           
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
}


function ShowOrderAttachmentsCard(intentRequest,callback)
{
   var AWS = require('aws-sdk');
   AWS.config.update({
    region: 'us-east-1',
    maxRetries:1
    });
  var ddb = new AWS.DynamoDB({
            region: 'us-east-1',
            maxRetries: 1
          });
   var docClient = new AWS.DynamoDB.DocumentClient();
   
   var sleep = require('system-sleep');
   const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
  
    const pcode=intentRequest.currentIntent.slots.ProductCode;
   // const confirm=intentRequest.currentIntent.slots.Confirm;
    const task=intentRequest.currentIntent.slots.OTask;
  //  const reason=intentRequest.currentIntent.slots.Reason;
    const source = intentRequest.invocationSource;
    var orderId=0;
    var processType='T';//T means Track order C means Cancel order and R means Replace order 
   if (source === 'DialogCodeHook') {
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
        if(task===null)
        {
            var validationResult = ValidateShowOrderAttachmentsCard(mobilenumber,task,processType);
        }
        // else
        // {
        //      processType = task.split('$')[0];
        //       orderId = task.split('$')[1];
        //       validationResult = ValidateShowOrderAttachmentsCard(mobilenumber,task,processType);
        // }
        
        console.log('processType'+processType);
        console.log('orderId'+orderId);
        
        if (!validationResult.isValid) {
            if(validationResult.violatedSlot!=='OTask')
            {
                    slots[`${validationResult.violatedSlot}`] = null;
                    callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                    return;
            }
            else{
                ShowOrderList(intentRequest, callback);
                return;
            }
        }

        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      // if (flowerType) {
      ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
      // }
      
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
    
    
    // if (source !== 'DialogCodeHook') {
    //     if(processType==='T')
    //     {
    //             //   var params = {
    //             //                       TableName: 'Orders',
    //             //                       Key: {
    //             //                                 'ID' : {N: orderId.toString()},
    //             //                             }
    //             //               };
                               
    //             //                 ddb.getItem(params, function(err, data) {
    //             //                       if (err) {
    //             //                         console.log("Error", err);
    //             //                       } else {   
                                          
    //             //                          var status= data.Item.Status
                                         
    //             //                           var buttons = [];
    //             //                           var attachments=[];
                                          
    //             //                           var obj={text: 'Buy Product', value:'Product'};
    //             //                           buttons.push(obj);
                                          
    //             //                           var obj={text: 'Manage Profile', value:'Profile'};
    //             //                           buttons.push(obj);
                                        
    //             //                           var obj={text: 'View Wishlist', value:'Wishlist'};
    //             //                           buttons.push(obj);
                                          
    //             //                           var obj={text: 'View Purchase History', value:'History'};
    //             //                           buttons.push(obj);
                                          
    //             //                           var obj={text: 'Cancel', value:'Quit'};
    //             //                           buttons.push(obj);
                                  
                                
                                   
    //             //                             var obj=  {
    //             //                               title:'What would you like to do?',
    //             //                               subTitle:' ',
    //             //                               buttons:buttons
    //             //                              };
                                             
    //             //                           attachments.push(obj);
                                         
                                         
    //             //                          var outsessionAttributes=intentRequest.sessionAttributes;//||{};
    //             //                           outsessionAttributes.MobileNumber=mobilenumber;
                                         
    //             //                           callback(closeWithCard(outsessionAttributes, 'Fulfilled',
    //             //                          { contentType: 'PlainText', content: 'You Order ID:'+orderId+' Status is:'+status }, buildResponseCardatt(attachments)));
                                         
    //             //                       }
    //             //                 });
                                  
    //     }
    //     else if(processType==='C')
    //     {
    //             // var params = {
    //             // TableName:"Orders",
    //             // Key:{
    //             // "ID": {N:orderId.toString()}
    //             // },
    //             // UpdateExpression: "set ToCancel = :r, Reason= :rs",
    //             // ExpressionAttributeValues:{
    //             // ":r": "1",
    //             // ":rs":reason
    //             // },
    //             // ReturnValues:"UPDATED_NEW"
    //             // };
            
    //             // console.log("Updating the item...");
                
    //             // ddb.updateItem(params, function(err, data) {
    //             //     if (err) {
    //             //         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    //             //     } else {
    //             //         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                        
    //             //          var buttons = [];
    //             //           var attachments=[];
                          
    //             //           var obj={text: 'Buy Product', value:'Product'};
    //             //           buttons.push(obj);
                          
    //             //           var obj={text: 'Manage Profile', value:'Profile'};
    //             //           buttons.push(obj);
                        
    //             //           var obj={text: 'View Wishlist', value:'Wishlist'};
    //             //           buttons.push(obj);
                          
    //             //           var obj={text: 'View Purchase History', value:'History'};
    //             //           buttons.push(obj);
                          
    //             //           var obj={text: 'Cancel', value:'Quit'};
    //             //           buttons.push(obj);
                  
                
                   
    //             //             var obj=  {
    //             //               title:'What would you like to do?',
    //             //               subTitle:' ',
    //             //               buttons:buttons
    //             //              };
                             
    //             //           attachments.push(obj);
                         
                         
    //             //          var outsessionAttributes=intentRequest.sessionAttributes;//||{};
    //             //           outsessionAttributes.MobileNumber=mobilenumber;
                         
    //             //           callback(closeWithCard(outsessionAttributes, 'Fulfilled',
    //             //          { contentType: 'PlainText', content: 'You Cancel Request for Order ID:'+orderId+' updated successfully!' }, buildResponseCardatt(attachments)));
                        
                        
                        
                        
    //             //     }
    //             // });

    //     }
    //     else
    //     {
    //         //  var params = {
    //         //     TableName:"Orders",
    //         //     Key:{
    //         //     "ID": {N:orderId.toString()}
    //         //     },
    //         //     UpdateExpression: "set ToReplace = :r, Reason= :rs",
    //         //     ExpressionAttributeValues:{
    //         //     ":r": "1",
    //         //     ":rs":reason
    //         //     },
    //         //     ReturnValues:"UPDATED_NEW"
    //         //     };
            
    //         //     console.log("Updating the item...");
                
    //         //     ddb.updateItem(params, function(err, data) {
    //         //         if (err) {
    //         //             console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    //         //         } else {
    //         //             console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                        
    //         //               var buttons = [];
    //         //               var attachments=[];
                          
    //         //               var obj={text: 'Buy Product', value:'Product'};
    //         //               buttons.push(obj);
                          
    //         //               var obj={text: 'Manage Profile', value:'Profile'};
    //         //               buttons.push(obj);
                        
    //         //               var obj={text: 'View Wishlist', value:'Wishlist'};
    //         //               buttons.push(obj);
                          
    //         //               var obj={text: 'View Purchase History', value:'History'};
    //         //               buttons.push(obj);
                          
    //         //               var obj={text: 'Cancel', value:'Quit'};
    //         //               buttons.push(obj);
                  
                
                   
    //         //                 var obj=  {
    //         //                   title:'What would you like to do?',
    //         //                   subTitle:' ',
    //         //                   buttons:buttons
    //         //                  };
                             
    //         //               attachments.push(obj);
                         
                         
    //         //              var outsessionAttributes=intentRequest.sessionAttributes;//||{};
    //         //               outsessionAttributes.MobileNumber=mobilenumber;
                         
    //         //               callback(closeWithCard(outsessionAttributes, 'Fulfilled',
    //         //              { contentType: 'PlainText', content: 'You Replace Request for Order ID:'+orderId+' updated successfully!' }, buildResponseCardatt(attachments)));
    //         //                     }
    //         //     });
    //     }
    // }
}

function ShowOrderList(intentRequest, callback)
{
   var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();
   var sleep = require('system-sleep');
    const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
  
    const pcode=intentRequest.currentIntent.slots.ProductCode;
    const source = intentRequest.invocationSource;
    var orderId=0;
    var processType='T';//T means Track order C means Cancel order and R means Replace order 
    
  var attachments = [];
  var params = {
    TableName: "Orders"
  };
 var validationResult= buildValidationResult(false, 'OTask', 'Product List');

docClient.scan(params, onScanData);
docClient.scan(params, onScan);
var count = 0;
var totalCount=0;


///////////////////////////////

function onScanData(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("onScanData succeeded. context");
         
        data.Items.forEach(function(itemdata) {
          
             console.log("--------------"+mobilenumber);
            if(itemdata.MobileNumber===mobilenumber)
            {
                console.log('MobileNumber:'+mobilenumber);
                console.log("totalCount :", ++totalCount);
                // sleep(500);
            }
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScanData);
        }
    }
}
///////////////////////////////


function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded.");
         
        data.Items.forEach(function(itemdata) {
          
           //console.log("Item :", ++count,JSON.stringify(itemdata));
           console.log('totalCount in scan:'+ totalCount);
            console.log('Count in scan:'+ count);
            console.log('MobileNumber:'+mobilenumber);
             console.log('itemdata MobileNumber:'+itemdata.MobileNumber);
          if(itemdata.MobileNumber===mobilenumber)
          {
           var ProductDesc=itemdata.ProductDesc;
           var ProductCost=itemdata.Cost;
           var link=itemdata.Link;
           
            var buttons = [];
            var obj={text: 'Track Order', value:'Track '+itemdata.ID};
            buttons.push(obj);
            if(itemdata.OrderStatus==='Delivered')
            {
                var deliverydate=itemdata.DeliveryDate;
                var replacementDays=itemdata.ReplacementDays;
                var dt =new Date();
              dt= dt.setDate(dt.getDate() + replacementDays);
               console.log('deliverydate'+deliverydate);
               console.log('repl date'+dt);
            var obj={text: 'Replace Order', value:'Replace '+itemdata.ID};
            buttons.push(obj);
            var obj={text: 'Review', value:'Review '+itemdata.ProductID};
            buttons.push(obj);
            }
            else if(itemdata.OrderStatus!=='Cancelled'&& itemdata.OrderStatus!=='CancelRequested'){
            var obj={text: 'Cancel Order', value:'Cancel '+itemdata.ID};
            buttons.push(obj);
            }
           
         var obj=  {
           title:ProductDesc,
           subTitle:ProductCost,
           imageUrl:link,
           buttons:buttons
         };
           attachments.push(obj);
           count++;
           // attachments.push(ProductCost);
           console.log('Inside purchase Product ID:'+ ProductDesc);
           console.log('Inside purchase ProductCost:'+ ProductCost);
           console.log('Inside purchase link:'+ link);
            //console.log('Inside purchase link:'+ count);
             sleep(1000);
           if(count===totalCount)
           {
               callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
               intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Order History` },
                buildResponseCardatt(attachments)));

           }
 
          }

           
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
}

 

function buildOptions(slot, appointmentType, date, bookingMap) {
    const dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (slot === 'PCode') {
        return [
            { text: 'Cotton T shirt', value: 'Cotton T Shirt' },
            { text: 'Jeans', value: 'Jeans' },
        ];
     }
    //else if (slot === 'Date') {
    //     // Return the next five weekdays.
    //     const options = [];
    //     const potentialDate = new Date();
    //     while (options.length < 5) {
    //         potentialDate.setDate(potentialDate.getDate() + 1);
    //         if (potentialDate.getDay() > 0 && potentialDate.getDay() < 6) {
    //             options.push({ text: `${potentialDate.getMonth() + 1}-${potentialDate.getDate()} (${dayStrings[potentialDate.getDay()]})`,
    //             value: potentialDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) });
    //         }
    //     }
    //     return options;
    // } else if (slot === 'Time') {
    //     // Return the availabilities on the given date.
    //     if (!appointmentType || !date) {
    //         return null;
    //     }
    //     let availabilities = bookingMap[`${date}`];
    //     if (!availabilities) {
    //         return null;
    //     }
    //     availabilities = getAvailabilitiesForDuration(getDuration(appointmentType), availabilities);
    //     if (availabilities.length === 0) {
    //         return null;
    //     }
    //     const options = [];
    //     for (let i = 0; i < Math.min(availabilities.lenUndergth, 5); i++) {
    //         options.push({ text: buildTimeOutputString(availabilities[i]), value: buildTimeOutputString(availabilities[i]) });
    //     }
    //     return options;
    // }
}

function getRandomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

function buildValidationResult(isValid, violatedSlot, messageContent) {
    if (messageContent == null) {
        return {
            isValid,
            violatedSlot,
        };
    }
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
}


function ValidateShowOrderAttachmentsCard(mobilenumber,task,processType,confirm,reason) {
    console.log('In Validation');
if(mobilenumber)
{
  if(mobilenumber.length!==10)
  {
      return buildValidationResult(false, 'Mobile', 'Please enter Valid mobile number!');
  }
}
    console.log('Validation mobilenumber'+mobilenumber);
if(task===null)
{
    return buildValidationResult(false, 'OTask', 'Order History');
}
  console.log('Validation pcode '+task+' processType '+processType+' confirm '+confirm);
if(task!==null&&processType!=='T'&&confirm===null)
{
         console.log('In Validation Confirm');
    if(processType=='C')
    {
         console.log('In Validation Cancel');
        return buildValidationResult(false, 'Confirm', 'Are you sure you want to Cancel the Product');
    }
    else{
         console.log('In Validation replace');
         return buildValidationResult(false, 'Confirm', 'Are you sure you want to Replace the Product');
    }
}

  console.log('Validation Confirm'+confirm);
if(task!==null&&processType!=='T'&&confirm!==null&&reason===null)
{
    if(processType=='C')
    {
        return buildValidationResult(false, 'Reason', 'Please enter reason for cancellation');
    }
    else{
         return buildValidationResult(false, 'Reason', 'Please enter reason for Replacing');
    }
}
  console.log('Validation Reason'+reason);
    return buildValidationResult(true, null, null);
}



function validateOrderFlowers(isNew, date, time,mobilenumber,password,confirmPwd,isMarried,dom,haveKids,PCode,accno,otp,intentRequest,callback) {
  //  const flowerTypes = ['lilies', 'roses', 'tulips'];
    //if (flowerType && flowerTypes.indexOf(flowerType.toLowerCase()) === -1) {
    //   return buildValidationResult(false, 'FlowerType', `We do not have ${flowerType}, would you like a different type of flower?  Our most popular flowers are roses`);
//    }
if(mobilenumber)
{
  if(mobilenumber.length!==10)
  {
      return buildValidationResult(false, 'Mobile', 'Please enter Valid mobile number!');
  }
  console.log('Validation: Mobilenumber Completed');
}

if(isNew===0)
    {
if(password!==undefined&&password!==null)
{
    
        AuthenticateUser(mobilenumber,password,callback,intentRequest);
    
}
else
{
    if(mobilenumber)
    return buildValidationResult(false, 'Passcode', 'Please enter your Password');
}
}

if(isNew===1&&PCode===null)
{
    if(confirmPwd!==undefined&&confirmPwd!==null)
    {
        if(password.toString().trim()!==confirmPwd.toString().trim())
         return buildValidationResult(false, 'Confirm', 'Confirm Password does not match');
    }
    
    if(isMarried!==undefined&&isMarried!==null)
    {
        if(isMarried.toString().trim()==='Married'&&  dom===null)
        {
            return buildValidationResult(false, 'DOM', 'Please enter your Wedding Date');
        }
        
        if(isMarried.toString().trim()==='Single'&&password===null)
        {
              return buildValidationResult(false, 'Passcode', 'Please choose password');
        }
        
         if(dom!==undefined&&dom!==null&&haveKids===null)
         {
             return buildValidationResult(false, 'HaveKids', 'Do you have kids?');
         }
         
         if(haveKids!==undefined && haveKids!==null && password===null)
         {
             return buildValidationResult(false, 'Passcode', 'Please choose password');
         }
        
         if(password!==null && confirmPwd===null)
         {
            return buildValidationResult(false, 'ConfirmPasscode', 'Please confirm password1:'+password+'  confrmpwd:'+confirmPwd);
         }
        
        if(confirmPwd!==undefined && confirmPwd!==null)
        {
            //  if(password.toString().trim()!==confirmPwd.toString().trim())
            //      {
            //               return buildValidationResult(false, 'ConfirmPswd', 'Confirm Password does not match');
            //      }
            //      else
            //          {
                              return buildValidationResult(false, 'PCode', 'What Product would you like to buy?');
                    // }
         }
    }
}

   if(PCode===null)
    {
    // ShowProductList(intentRequest,callback);
     return buildValidationResult(false, 'PCode', 'What Product would you like to buy?');
    }
      console.log('Validation: PCode Completed');

    if (date) {
        if (!isValidDate(date)) {
            return buildValidationResult(false, 'DeliveryDate', 'What date would you like to pick the product up?');
        }
        if (parseLocalDate(date) < new Date()) {
            return buildValidationResult(false, 'DeliveryDate', 'You can pick up the product from tomorrow onwards.  What day would you like to pick them up?');
        }
    }
     console.log('Validation: date Completed');
    if (time) {
        if (time.length !== 5) {
            // Not a valid time; use a prompt defined on the build-time model.
            return buildValidationResult(false, 'DeliveryTime', null);
        }
        const hour = parseInt(time.substring(0, 2), 10);
        const minute = parseInt(time.substring(3), 10);
        if (isNaN(hour) || isNaN(minute)) {
            // Not a valid time; use a prompt defined on the build-time model.
            return buildValidationResult(false, 'DeliveryTime', null);
        }
        if (hour < 9 || hour > 18) {
            // Outside of business hours
            return buildValidationResult(false, 'DeliveryTime', 'Our business hours are from Nine a m. to Six p m. Can you specify a time during this range?');
        }
        
      
    }
    
    if(accno)
    {
        if(otp!==undefined&&otp!==null)
        {
            // console.log('call otp');
            // GenerateOtp(mobilenumber);
        }
        else{
             console.log('call otp');
            GenerateOtp(mobilenumber);
        }
    }
    
      console.log('Validation: time Completed');
    
    return buildValidationResult(true, null, null);
}

 // --------------- Functions that control the bot's behavior -----------------------

/**
 * Performs dialog management and fulfillment for ordering flowers.
 *
 * Beyond fulfillment, the implementation of this intent demonstrates the use of the elicitSlot dialog action
 * in slot validation and re-prompting.
 *
 */
 
//  function sendmessage()
//  {
//       var AWS = require('aws-sdk');
//             AWS.config.update({
//             accessKeyId: 'AKIAJ33PBN4552TLJ75Q',
//             secretAccessKey: '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',
//             region: 'us-east-1'
//             });
//           var sns = new AWS.SNS({apiVersion: '2010-03-31'});
           
//      var params = {
//   Message: 'Your OTP for Fabric Store is:1234', /* required */
//   MessageAttributes: {
//     'Attr': {
//       DataType: 'String', /* required */
//      // BinaryValue: new Buffer('...') || '1234' /* Strings will be Base-64 encoded on your behalf */,
//       StringValue: '1234'
//     },
//     /* '<String>': ... */
//   },
//   MessageStructure: '1234',
//   PhoneNumber: '7893988172',
//   Subject: 'Fabric Store OTP',
//  // TargetArn: '',
//  // TopicArn: 'arn:aws:sns:us-east-1:490064732961:SendSMSTopic'
// };
// sns.publish(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log('Message sent new'+data);           // successful response
// });
//  }
 

 
 function GenerateOtp(mobilenumber)
 {
         var mob='+91'+mobilenumber;
          console.log('in sendmessage2');
         var AWS = require('aws-sdk');
               
     AWS.config.update({
    accessKeyId: 'AKIAJ5WHB4F5FWLYN37Q',
    secretAccessKey: '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',
     region: 'us-east-1'
    });
    
    const snsPublish = require('aws-sns-publish');
    globalotp= getRandomInt(1,10000);
     
    snsPublish('Your OTP for Fabric Store Payment is:'+globalotp, {phone: mob}).then(messageId => {
        console.log(messageId);
        //=> '6014fe16-26c1-11e7-93ae-92361f002671'
    });

 }
 
// function ordercloth(intentRequest, callback) {
//     const name = intentRequest.currentIntent.slots.Name;
//     const gender = intentRequest.currentIntent.slots.Gender;
//     const mobilenumber = intentRequest.currentIntent.slots.Mobile;
//     const productcode = intentRequest.currentIntent.slots.PCode;
//     const deliverydate=intentRequest.currentIntent.slots.DeliveryDate;
//     const deliverytime=intentRequest.currentIntent.slots.DeliveryTime;
//     const dob=intentRequest.currentIntent.slots.DOB;
//     const accno=intentRequest.currentIntent.slots.AccountNumber;
//     const bankname=intentRequest.currentIntent.slots.BankName;
//     const ifsc=intentRequest.currentIntent.slots.IFSC;
//     const source = intentRequest.invocationSource;
//   // const accountsid='';
//   // const authToken='';
//   // const client=require('twilio')(accountsid,authToken);
    
//     var AWS= require('aws-sdk');
//     //AWS.config.update({region:'us-west-2'});
//   var ddb= new AWS.DynamoDB();
 
   
//  if (mobilenumber)
//   {
//   if(mobilenumber.length===10)
//   {
//       //console.log('Inside if')
//      var params = {
//   TableName: 'User',
//   Key: {
//     'MobileNumber' : {S: mobilenumber.S},
//   }//,
//  // ProjectionExpression: 'ATTRIBUTE_NAME'
// };

// // Call DynamoDB to read the item from the table
// ddb.getItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//   //callback(data.Items[0]);
// // callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText',    content: 'customerid: '+data.Item.DOB.S}));
// //console.log('Executed successfully');
// name=data.Item.Name.S;
// gender=data.Item.Gender.S;
//   }
// });
//   }
//   }
      
//   // }
//     // ddb.query(params, function(err,data)
//   // {
//   //   if(err)
//   //   {
//   //       console.log('Error');
//   //   }
//   //   else
//   //   {
//   //      data.Items.forEach(function(element,index,array){
//   //         console.log(element.name.S);
//   //      });
//   //    }
//     // });
    
    

//     if (source === 'DialogCodeHook') {
//         // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
//         const slots = intentRequest.currentIntent.slots;
//         const validationResult = validateOrderFlowers( deliverydate, deliverytime,mobilenumber);
//         if (!validationResult.isValid) {
//             slots[`${validationResult.violatedSlot}`] = null;
//             callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
//             return;
//         }

//         // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
//       const outputSessionAttributes = intentRequest.sessionAttributes || {};
//       // if (flowerType) {
//       ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
//       // }
//         callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
//         return;
//     }
//   //  GetUserDataFromDB(callback,intentRequest);
// //   // client.messages.create({
// //   //     body:'Your Fabric Store OTP is : 1234',
// //     //    from:mobilenumber,
// //   //     to:mobilenumber
// //   // }).then(message=> console.log('message sid'+message.sid)).done();
//  //  var dt='03-Jul-2018';

//  var params={
//       TableName: "User",
//       Item:{
//           Name:{S:name},
//           DateOfBirth:{S:dob},
//           Gender:{S:gender},
//           MobileNumber:{S:mobilenumber}
//       }
//     };
    
//     ddb.putItem(params,callback);
    
//     var params={
//       TableName: "Payments",
//       Item:{
//           AccountNumber:{S:accno},
//           BankName:{S:bankname},
//           BankIFSC:{S:ifsc},
//           CustomerID:{S:'1'},
//           PaymentDate:{S:'05-Jul-2018'}
//       }
//     };
//     ddb.putItem(params,callback);
    
//      var params={
//       TableName: "OrderDetails",
//       Item:{
//           DeliveryDate:{S:deliverydate+deliverytime},
//           PurchaseDate:{S:'05-Jul-2018'},
//           ProductID:{S:'1001'},
//           CustomerID:{S:'1'},
//           Cost:{N:'1233'}
//       }
//     };
    
//      ddb.putItem(params,callback);
    
//   // close(intentRequest.sessionAttributes, 'Fulfilled', { contentType: 'PlainText', content: ` Thanks ${name}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` });
//     // Order the clothes, and rely on the goodbye message of the bot to define the message to the end user.  In a real bot, this would likely involve a call to a backend service.
//     callback(close(intentRequest.sessionAttributes, 'Fulfilled',
//     { contentType: 'PlainText', content: ` Thanks ${name}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` }));
// }



function NewUser(intentRequest, callback) {
    var name = intentRequest.currentIntent.slots.Name;
    globbalname=name;
    var gender = intentRequest.currentIntent.slots.Gender;
    mobilenumber = intentRequest.currentIntent.slots.Mobile;
    const password=intentRequest.currentIntent.slots.Passcode;
    const confirmPassword=intentRequest.currentIntent.slots.ConfirmPasscode;
    const isMarried=intentRequest.currentIntent.slots.IsMarried;
    const haveKids=intentRequest.currentIntent.slots.HaveKids;
     const address=intentRequest.currentIntent.slots.Address;
      const pincode=intentRequest.currentIntent.slots.PinCode;
    const productcode = intentRequest.currentIntent.slots.PCode;
    const deliverydate=intentRequest.currentIntent.slots.DeliveryDate;
    const deliverytime=intentRequest.currentIntent.slots.DeliveryTime;
    const dob=intentRequest.currentIntent.slots.DOB;
    const accno=intentRequest.currentIntent.slots.AccountNumber;
    const bankname=intentRequest.currentIntent.slots.BankName;
    const ifsc=intentRequest.currentIntent.slots.IFSC;
    const otp=intentRequest.currentIntent.slots.OTP;
    const dom=intentRequest.currentIntent.slots.DOM;
    const source = intentRequest.invocationSource;
   // var sleep=require('sleep');
   // const accountsid='';
   // const authToken='';
   // const client=require('twilio')(accountsid,authToken);
    console.log('In Existing User');
    console.log("Confirm pwd"+confirmPassword);
    var AWS= require('aws-sdk');
    //AWS.config.update({region:'us-west-2'});
    var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
 
   console.log(mobilenumber);
//   if(productcode)
//  GetProductDetails(productcode,callback);
  if(productcode!==undefined&&productcode!==null&&globalProductCost==='0')
            GetProductDetails(productcode,callback);
    if (source === 'DialogCodeHook') {
        
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
         console.log('productcode:'+productcode);
        const validationResult = validateOrderFlowers(1, deliverydate, deliverytime,mobilenumber,password,confirmPassword,isMarried,dom,haveKids,productcode,accno,otp,intentRequest,callback);
        if (!validationResult.isValid) {
            console.log('violated slot'+validationResult.violatedSlot);
            // slots[`${validationResult.violatedSlot}`] = null;
            // callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            // return;
            if(validationResult.violatedSlot!=='PCode')
            {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
            }
            else
            {  
                if(mobilenumber!==null&&isMarried!==null)
                {
                console.log('Show product list');
              slots[`${validationResult.violatedSlot}`] = null;
              ShowProductList(intentRequest,callback);
              return;
                }
            }
        }

        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      // if (flowerType) {
      ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
      // }
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    console.log('Source:'+source);
        var params = {
      TableName: 'User',
      Key: {
          'MobileNumber' : {S: mobilenumber},
            }//,
 // ProjectionExpression: 'ATTRIBUTE_NAME'
  };
  
if(source !== 'DialogCodeHook'){
    
var paramsInsert={
      TableName: "User",
      Item:{
          Name:{S:name},
          DateOfBirth:{S:dob},
          Gender:{S:gender},
          MobileNumber:{S:mobilenumber},
          IsAdmin:{S:'0'},
          Password:{S:password},
          IsMarried:{S:isMarried},
          DateOfMarriage:{S:dom},
          HaveKids:{S:haveKids},
          Address:{S:address},
          PinCode:{S:pincode}
      }
    };
    
    ddb.putItem(paramsInsert,callback);    
    
    
console.log('code hook otp:'+otp)
if(otp.toString().trim()===globalotp.toString().trim())
{
  //  GetProductDetails(productcode,callback);
    console.log('correct otp'+otp);
        // Call DynamoDB to read the item from the table
ddb.getItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
// var nme=data.Item.Name;
// //callback(null,'Hello '+name+" welcome back!");
// var n=JSON.stringify({"name" : nme});
// var nm=JSON.parse(n);
// globbalname=nm["name"].S;
var dt=new Date();

console.log('Inside Name:'+ globbalname);
    var params={
      TableName: "Payments",
      Item:{
          AccountNumber:{S:accno},
          BankName:{S:bankname},
          BankIFSC:{S:ifsc},
          MobileNumber:{S:mobilenumber},
          PaymentDate:{S:dt.toString()}
      }
    };
    ddb.putItem(params,callback);
    console.log('Payments done');
 
// var link='';
// var cost='0';
// if(productcode==='Cotton T Shirt Size 40')
// {
// link='https://s3.amazonaws.com/fabricstoreimages/Assorted_T_Shirts_large.jpg';
// cost='945';
// }
// else
// {
// link='https://s3.amazonaws.com/fabricstoreimages/Blue_Tshirt.jpg';
// cost='1233';
// }
     console.log("globalProductCost"+globalProductCost);
          console.log("globalProductID"+globalProductID);
            console.log("globalProductlink"+globalProductlink);
    var params={
      TableName: "OrderDetails",
      Item:{
          DeliveryDate:{S:dt.toString()+deliverytime.toString()},
          PurchaseDate:{S:dt.toString()},
          ProductDesc:{S:globalProductDesc},
          link:{S:globalProductlink.toString()},
          MobileNumber:{S:mobilenumber.toString()},
          Cost:{N:globalProductCost.toString()},
          ProductID:{N:globalProductID.toString()}
      }
    };
    
     ddb.putItem(params,callback);
      console.log('Order done');
      
    //  callback(close(intentRequest.sessionAttributes, 'Fulfilled',
    // { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` }));
    
   
      var buttons = [];
      var attachments=[];
  var obj={text: 'Give Feedback', value:'Feedback'};
     buttons.push(obj);
    var obj={text: 'Later', value:'Later'};
     buttons.push(obj);
    
       
        var obj=  {
          title:'Please provide your valuable feedback',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
  
//   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
//             intentRequest.currentIntent.slots, evalidationResult.violatedSlot,  { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` },
//             buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
  
     var outsessionAttributes=intentRequest.sessionAttributes;//||{};
  outsessionAttributes.MobileNumber=mobilenumber;
   outsessionAttributes.IsAdmin="0";
  
  //var sessobj=new {MobileNumber: mobilenumber};
   callback(closeWithCard(outsessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` }, buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
    
    
  }
});
    }
    else
    {
        console.log('In correct otp'+otp);
        
//   callback(close(intentRequest.sessionAttributes, 'Fulfilled',
//     { contentType: 'PlainText', content: 'Sorry '+globbalname+', you  entered wrong OTP hence your transaction is cancelled' }));
    
      var buttons = [];
      var attachments=[];
    var obj={text: 'Give Feedback', value:'Feedback'};
     buttons.push(obj);
    var obj={text: 'Later', value:'Later'};
     buttons.push(obj);
    
    
       
        var obj=  {
          title:'Please provide your valuable feedback',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
  
//   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
//             intentRequest.currentIntent.slots, evalidationResult.violatedSlot,  { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' },
//             buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));

     var outsessionAttributes=intentRequest.sessionAttributes;//||{};
  outsessionAttributes.MobileNumber=mobilenumber;
   outsessionAttributes.IsAdmin="0";
   //var sessobj=new {MobileNumber: mobilenumber};
   
   callback(closeWithCard(outsessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' }, buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
    }
}
   

//console.log("End "+ name);
 //  callback(close(intentRequest.sessionAttributes, 'Fulfilled', { contentType: 'PlainText', content: ` Thanks ${name}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` }));
    // Order the clothes, and rely on the goodbye message of the bot to define the message to the end user.  In a real bot, this would likely involve a call to a backend service.
   
   
   // console.log('Last Source:'+source);
   // console.log('Welcome '+globbalname);
}

function ValidateRegisterUser(mobilenumber,password,confirmPassword,isMarried,dom,haveKids,intentRequest, callback)
{
    console.log('ValidateRegisterUser started');
    if(mobilenumber)
    {
            if(mobilenumber.length!==10)
            {
                return buildValidationResult(false, 'Mobile', 'Please enter Valid mobile number!');
            }
        console.log('Validation: Mobilenumber Completed');
    }

    if(confirmPassword!==undefined&&confirmPassword!==null)
    {
        if(password.toString().trim()!==confirmPassword.toString().trim())
         return buildValidationResult(false, 'ConfirmPasscode', 'Confirm Password does not match');
    }
    
    if(isMarried!==undefined&&isMarried!==null)
    {
        if(isMarried.toString().trim()==='Married'&&  dom===null)
        {
            return buildValidationResult(false, 'DOM', 'Please enter your Wedding Date');
        }
         if(dom!==undefined&&dom!==null&&haveKids===null)
         {
             return buildValidationResult(false, 'HaveKids', 'Do you have kids?');
         }
    }
    console.log('ValidateRegisterUser completed');
return buildValidationResult(true, null,null);
}



function RegisterUser(intentRequest, callback) {
    var name = intentRequest.currentIntent.slots.Name;
    globbalname=name;
    var dom=' ';
    var haveKids=' ';
    var gender = intentRequest.currentIntent.slots.Gender;
    mobilenumber = intentRequest.currentIntent.slots.Mobile;
    const password=intentRequest.currentIntent.slots.Passcode;
    const confirmPassword=intentRequest.currentIntent.slots.ConfirmPasscode;
    const isMarried=intentRequest.currentIntent.slots.IsMarried;
     haveKids=intentRequest.currentIntent.slots.HaveKids;
    const address=intentRequest.currentIntent.slots.Address;
    const pincode=intentRequest.currentIntent.slots.Pincode;
    const productcode = intentRequest.currentIntent.slots.PCode;
    const deliverydate=intentRequest.currentIntent.slots.DeliveryDate;
    const deliverytime=intentRequest.currentIntent.slots.DeliveryTime;
    const dob=intentRequest.currentIntent.slots.DOB;
    const accno=intentRequest.currentIntent.slots.AccountNumber;
    const bankname=intentRequest.currentIntent.slots.BankName;
    const ifsc=intentRequest.currentIntent.slots.IFSC;
    const otp=intentRequest.currentIntent.slots.OTP;
     dom=intentRequest.currentIntent.slots.DOM;
    const source = intentRequest.invocationSource;
   
    console.log('In Register User');
    console.log("Confirm pwd"+confirmPassword);
    var AWS= require('aws-sdk');
    var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
  
 isAdmin="0";
 
   console.log(mobilenumber);

    if (source === 'DialogCodeHook') {
        
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
         console.log('productcode:'+productcode);
      //  const validationResult = validateOrderFlowers(1, deliverydate, deliverytime,mobilenumber,password,confirmPassword,isMarried,dom,haveKids,productcode,accno,otp,intentRequest,callback);
          const validationResult=ValidateRegisterUser(mobilenumber,password,confirmPassword,isMarried,dom,haveKids,intentRequest, callback);
        if (!validationResult.isValid) {
            console.log('violated slot'+validationResult.violatedSlot);
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }

        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
         const outputSessionAttributes = intentRequest.sessionAttributes || {};
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    console.log('Source:'+source);
  
if(source !== 'DialogCodeHook'){
    
    console.log('mobilenumber'+mobilenumber.toString());
     console.log('password'+password.toString());
      console.log('pincode'+pincode.toString());
 if(dom===null)
  {
      dom=' ';
  }
  if(haveKids===null)
  {
      haveKids=' ';
  }
    
var paramsInsert={
      TableName: "User",
      Item:{
          Name:{S:name},
          DateOfBirth:{S:dob.toString()},
          Gender:{S:gender},
          MobileNumber:{S:mobilenumber.toString()},
          IsAdmin:{S:'0'},
          Password:{S:password.toString()},
          IsMarried:{S:isMarried},
          DateOfMarriage:{S:dom.toString()},
          HaveKids:{S:haveKids},
          Address:{S:address},
          PinCode:{S:pincode.toString()}
      }
    };
    
    ddb.putItem(paramsInsert,callback);   
      console.log('Saved User:');
}

      var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);

      const outputSessionAttributes = intentRequest.sessionAttributes || {};
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
          
       }
       
callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: ` Thanks ${globbalname}, your registration has been successfully completed!` }, buildResponseCardatt(attachments)));
}




function AuthenticateUser(mobilenumber, password,callback,intentRequest)
{
    var retVal=2;
    console.log('AuthenticateUser started');
      var AWS= require('aws-sdk');
    //AWS.config.update({region:'us-west-2'});
 //  var ddb= new AWS.DynamoDB();
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
        var params = {
      TableName: 'User',
      Key: {
          'MobileNumber' : {S: mobilenumber},
            }//,
          };
          
         
         
         ddb.getItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
var nme=data.Item.Password;
//callback(null,'Hello '+name+" welcome back!");
var n=JSON.stringify({"password" : nme});
var nm=JSON.parse(n);
var dbpwd=nm["password"].S; 
console.log('Db Password:'+dbpwd);
if(dbpwd!==password)
{
    
    console.log('Password did not match');
     retVal= 0;
     console.log('retVal not match:'+retVal);
    // callback(close(intentRequest.sessionAttributes, 'Fulfilled',
    //  { contentType: 'PlainText', content: 'Access Denied!' }));
    
}
else{
       console.log('Password  matched');
    retVal= 1;
     console.log('retVal  matched:'+retVal);
}

}
});
     console.log('AuthenticateUser Completed');  
      console.log('retVal  outside:'+retVal);
   //  return retVal;
}

function ExistingUser(intentRequest, callback) {
//     var name = ' ';
//   // var gender = ' ';
//      mobilenumber = intentRequest.currentIntent.slots.Mobile;
//       const password = intentRequest.currentIntent.slots.Passcode;
//       const operation = intentRequest.currentIntent.slots.Operation;
//     const productcode = intentRequest.currentIntent.slots.PCode;
//     const deliverydate=intentRequest.currentIntent.slots.DeliveryDate;
//     const deliverytime=intentRequest.currentIntent.slots.DeliveryTime;
//     const dob=intentRequest.currentIntent.slots.DOB;
//     const accno=intentRequest.currentIntent.slots.AccountNumber;
//     const bankname=intentRequest.currentIntent.slots.BankName;
//     const ifsc=intentRequest.currentIntent.slots.IFSC;
//     const otp=intentRequest.currentIntent.slots.OTP;
//     const source = intentRequest.invocationSource;
//   // var sleep=require('sleep');
//   // const accountsid='';
//   // const authToken='';
//   // const client=require('twilio')(accountsid,authToken);
//     console.log('In Existing User');
//     var AWS= require('aws-sdk');
//     //AWS.config.update({region:'us-west-2'});
//  //  var ddb= new AWS.DynamoDB();
//  var ddb = new AWS.DynamoDB({
//     region: 'us-east-1',
//     maxRetries: 1
//   });
 
 

 
//   console.log(mobilenumber);

//   console.log('Source '+source);
//   if(productcode!==undefined&&productcode!==null&&globalProductCost==='0')
//             GetProductDetails(productcode,callback);
//     if (source === 'DialogCodeHook') {
       
//         // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
//         const slots = intentRequest.currentIntent.slots;
//         const validationResult = validateOrderFlowers(0, deliverydate, deliverytime,mobilenumber,password,password,null,null,null,productcode,accno,otp,intentRequest,callback);
//         if (!validationResult.isValid) {
//             if(validationResult.violatedSlot!=='PCode')
//             {
//             slots[`${validationResult.violatedSlot}`] = null;
//             callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
//             return;
//             }
//             else
//             {  
//                  if(mobilenumber!==null)
//                 {
//                     // if(password!==null)
//                     // {
//                     //       var isAuth= AuthenticateUser(mobilenumber, password,callback,intentRequest);
//                     //       if(isAuth!==0)
//                     //       {
//                               slots[`${validationResult.violatedSlot}`] = null;
//                               ShowProductList(intentRequest,callback);
//                               return;
//                     //       }
//                     // }
//                 }
//             }
//         }
        
      
//       console.log('Validated sucessfully');
//         // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
//       const outputSessionAttributes = intentRequest.sessionAttributes || {};
//       if (mobilenumber) {
//           outputSessionAttributes.MobileNumber = mobilenumber; 
//       }
//         callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
//         return;
//     }
    
    
//     console.log('Source:'+source);
//         var params = {
//       TableName: 'User',
//       Key: {
//           'MobileNumber' : {S: mobilenumber},
//             }//,
//  // ProjectionExpression: 'ATTRIBUTE_NAME'
//   };
  
// if(source !== 'DialogCodeHook'){
// console.log('code hook otp:'+otp)
// if(otp.toString().trim()===globalotp.toString().trim())
// {
//   //  GetProductDetails(productcode,callback);
//         // Call DynamoDB to read the item from the table
// ddb.getItem(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
// var nme=data.Item.Name;
// //callback(null,'Hello '+name+" welcome back!");
// var n=JSON.stringify({"name" : nme});
// var nm=JSON.parse(n);
// globbalname=nm["name"].S;
// var dt=new Date();
// console.log('Inside Name:'+ globbalname);
//     var params={
//       TableName: "Payments",
//       Item:{
//           AccountNumber:{S:accno},
//           BankName:{S:bankname},
//           BankIFSC:{S:ifsc},
//           MobileNumber:{S:mobilenumber},
//           PaymentDate:{S:dt.toString()}
//       }
//     };
//     ddb.putItem(params,callback);
//     console.log('Payments done');
 

   
// //   var link='';
// // var cost='0';
// // if(productcode.toString().trim()==='Cotton T Shirt Size 40')
// // {
// // link='https://s3.amazonaws.com/fabricstoreimages/Assorted_T_Shirts_large.jpg';
// // cost='945';
// // }
// // else
// // {
// // link='https://s3.amazonaws.com/fabricstoreimages/Blue_Tshirt.jpg';
// // cost='1233';
// // }
//      console.log("globalProductCost"+globalProductCost);
//           console.log("globalProductID"+globalProductID);
//             console.log("globalProductlink"+globalProductlink);
    
//      var params={
//       TableName: "OrderDetails",
//       Item:{
//           DeliveryDate:{S:dt.toString()+deliverytime.toString()},
//           PurchaseDate:{S:dt.toString()},
//           ProductDesc:{S:productcode},
//           link:{S:globalProductlink.toString()},
//           MobileNumber:{S:mobilenumber.toString()},
//           Cost:{N:globalProductCost.toString()},
//           ProductID:{N:globalProductID.toString()}
//       }
//     };
    
//      ddb.putItem(params,callback);
//       console.log('Order done');
      
// //  callback(close(intentRequest.sessionAttributes, 'Fulfilled',
// //     { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}`
// //     }));
   
  
//       var buttons = [];
//       var attachments=[];
//   var obj={text: 'Give Feedback', value:'Feedback'};
//      buttons.push(obj);
//     var obj={text: 'Later', value:'Later'};
//      buttons.push(obj);
    
       
//         var obj=  {
//           title:'Please provide your valuable feedback',
//           subTitle:' ',
//           buttons:buttons
//          };
//           attachments.push(obj);
  
// //   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
// //             intentRequest.currentIntent.slots, evalidationResult.violatedSlot,  { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` },
// //             buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
//   var outsessionAttributes=intentRequest.sessionAttributes;//||{};
//   outsessionAttributes.MobileNumber=mobilenumber;
//   outsessionAttributes.IsAdmin=isadmin;
// //    var sessobj=new {MobileNumber: mobilenumber};
//   callback(closeWithCard(outsessionAttributes, 'Fulfilled',
//      { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` }, buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
  
//           //  callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, eslots, evalidationResult.violatedSlot, evalidationResult.message));
//             return;
//   }
// });
//  }
//     else
//     {
//         console.log('In correct otp'+otp);
        
        
// //   callback(close(intentRequest.sessionAttributes, 'Fulfilled',
// //     { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' }));
   
   
  
//       var buttons = [];
//       var attachments=[];
//     var obj={text: 'Give Feedback', value:'Feedback'};
//      buttons.push(obj);
//     var obj={text: 'Later', value:'Later'};
//      buttons.push(obj);
    
    
       
//         var obj=  {
//           title:'Please provide your valuable feedback',
//           subTitle:' ',
//           buttons:buttons
//          };
//           attachments.push(obj);
  
// //   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
// //             intentRequest.currentIntent.slots, evalidationResult.violatedSlot,  { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' },
// //             buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
// var outsessionAttributes=intentRequest.sessionAttributes;//;||{};
//   outsessionAttributes.MobileNumber=mobilenumber;
//   outsessionAttributes.IsAdmin='0';
//   //  var sessobj=new {MobileNumber: mobilenumber};
//     callback(closeWithCard(outsessionAttributes, 'Fulfilled',
//      { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' }, buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
    
//     }
//     }
    
  

//console.log("End "+ name);
 //  callback(close(intentRequest.sessionAttributes, 'Fulfilled', { contentType: 'PlainText', content: ` Thanks ${name}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` }));
    // Order the clothes, and rely on the goodbye message of the bot to define the message to the end user.  In a real bot, this would likely involve a call to a backend service.
   
   
   // console.log('Last Source:'+source);
   // console.log('Welcome '+globbalname);
}


function ValidateLoginUser(mobilenumber,password,intentRequest, callback)
{
    console.log('ValidateLoginUser started');
    
    if(mobilenumber)
    {
            if(mobilenumber.length!==10)
            {
                return buildValidationResult(false, 'MobileNumber', 'Please enter Valid mobile number!');
            }
            
            
        console.log('Validation: Mobilenumber Completed');
    }
  
    console.log('Password:'+password);
    console.log('ValidateLoginUser completed');
    
 return buildValidationResult(true, null,null);
}


function LoginUser(intentRequest, callback) 
{
    var name = ' ';
   // var gender = ' ';
     mobilenumber = intentRequest.currentIntent.slots.MobileNumber;
      const password = intentRequest.currentIntent.slots.Passcode;
       const operation = intentRequest.currentIntent.slots.Operation;
    const productcode = intentRequest.currentIntent.slots.PCode;
    const deliverydate=intentRequest.currentIntent.slots.DeliveryDate;
    const deliverytime=intentRequest.currentIntent.slots.DeliveryTime;
    const dob=intentRequest.currentIntent.slots.DOB;
    const accno=intentRequest.currentIntent.slots.AccountNumber;
    const bankname=intentRequest.currentIntent.slots.BankName;
    const ifsc=intentRequest.currentIntent.slots.IFSC;
    const otp=intentRequest.currentIntent.slots.OTP;
    const source = intentRequest.invocationSource;
 var retVal=2;
    console.log('In LoginUser');
    var AWS= require('aws-sdk');
 
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
 
   console.log(mobilenumber);

  console.log('Source '+source);

    if (source === 'DialogCodeHook') {
       
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
      //  const validationResult = validateOrderFlowers(0, deliverydate, deliverytime,mobilenumber,password,password,null,null,null,productcode,accno,otp,intentRequest,callback);
        const validationResult=ValidateLoginUser(mobilenumber,password,intentRequest, callback);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        
    //       if(password!==undefined && password !==null &&mobilenumber!==undefined&&mobilenumber!==null)
    //       {
    //           retVal=  AuthenticateUser(mobilenumber,password,callback,intentRequest);
    //           console.log('retVal'+retVal);
    //           if(retVal===0)
    //           {
    //                 callback(close(intentRequest.sessionAttributes, 'Fulfilled',
    //  { contentType: 'PlainText', content: 'Access Denied!' }));
    //  return ;
    //           }
    //       }
        
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
    
    console.log('Source:'+source);
    
        var params = 
        {
             TableName: 'User',
             Key: {
                 'MobileNumber' : {S: mobilenumber},
                 }
        };
  
if(source !== 'DialogCodeHook'){
        // Call DynamoDB to read the item from the table
    ddb.getItem(params, function(err, data) 
        {
              if (err) {
                              console.log("Error", err);
                       } else {
                                    var nme=data.Item.Name;
                                    var n=JSON.stringify({"name" : nme});
                                    var nm=JSON.parse(n);
                                    globbalname=nm["name"].S;
                                    console.log('Inside Name:'+ globbalname);
                                    
                                    
                                    var nme=data.Item.Password;
                                    var n=JSON.stringify({"password" : nme});
                                    var nm=JSON.parse(n);
                                    var dbpwd=nm["password"].S; 
                                    console.log('Db Password:'+dbpwd);
                                   
                                      var nme=data.Item.IsAdmin;
                                    var n=JSON.stringify({"isadmin" : nme});
                                    var nm=JSON.parse(n);
                                    isAdmin=nm["isadmin"].S;
                                    console.log('Inside Name:'+ isAdmin);
                                    
                                      var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);

      const outputSessionAttributes = intentRequest.sessionAttributes || {};
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
           outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
       
               if(dbpwd!==password)
                {
                         console.log('Password did not match');
                         callback(close(intentRequest.sessionAttributes, 'Fulfilled',
                            { contentType: 'PlainText', content: 'Access Denied!' }));

                }
                else{
                        callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                        { contentType: 'PlainText', content: ` Welcome ${globbalname} !` }, buildResponseCardatt(attachments)));
                }
                                    
                                    
               }
        });
}
}
 // --------------- Intents -----------------------

/**
 * Called when the user specifies an intent for this skill.
 */
 function ValidationFeedback(mobilenumber,intentRequest, callback)
 {
     if(mobilenumber===null)
     {
         return buildValidationResult(false,'Mobile','Please enter your registered Mobile Number');
     }
     
     return buildValidationResult(true,null,null);
 }
 
 
 function Feedback(intentRequest, callback)
 {
    const Rating = intentRequest.currentIntent.slots.Rating;
    const Comment = intentRequest.currentIntent.slots.Comments;
    var sleep = require('system-sleep');
    // const conversationRating = intentRequest.currentIntent.slots.ConRating;
    // const conversationComment = intentRequest.currentIntent.slots.ConComments;
    //  mobilenumber = intentRequest.intents["Feedback"].slots.Mobile;
    const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     var feedbackCount=0;
        var AWS= require('aws-sdk');
    //AWS.config.update({region:'us-west-2'});
 //  var ddb= new AWS.DynamoDB();
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
    var docClient = new AWS.DynamoDB.DocumentClient();
                     var params = {
                                    TableName: "Feedback"
                                  };
                                
                               
                               docClient.scan(params, onScanCountFeedback);
   
                              function onScanCountFeedback(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                           data.Items.forEach(function(itemdata) {
                                         
                                           feedbackCount++;
                                        });
                                        feedbackCount++;
                                    }
                              }
                              
                      sleep(500);        
   const source = intentRequest.invocationSource;
  
     if (source === 'DialogCodeHook') {
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
        const validationResult = ValidationFeedback(mobilenumber,intentRequest, callback);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
  var params = {
      TableName: 'User',
      Key: {
          'MobileNumber' : {S: mobilenumber.toString()},
            }//,
 // ProjectionExpression: 'ATTRIBUTE_NAME'
  };
        ddb.getItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
var nme=data.Item.Name;
//callback(null,'Hello '+name+" welcome back!");
var n=JSON.stringify({"name" : nme});
var nm=JSON.parse(n);
globbalname=nm["name"].S;
console.log('name in feedback from db'+globbalname);
}});
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      // if (flowerType) {
      ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
      // }
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
  
    if (source !== 'DialogCodeHook') {
    var sessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = sessionAttributes.MobileNumber;
    // console.log('new sess'+this.attributes['MobileNumber']);
   
   if(mobilenumber===undefined)
   mobilenumber='7893988172';
       
       console.log('sessionAttributes.MobileNumber'+sessionAttributes.MobileNumber);
     var dt=  GetDeliveryDate(0);
     var params={
      TableName: "Feedback",
      Item:{
          Id:{N:feedbackCount.toString()},
          PhoneNumber:{S:mobilenumber.toString()},
          Feedback:{S:Rating.toString()},
          Comment:{S:Comment.toString()},
          Name:{S:globbalname.toString()},
          CreatedDate:{S:dt.toString()}
         // Date
        //   ConversationRating:{S:conversationRating.toString()},
        //   ConversationComment:{S:conversationComment.toString()}
      }
    };
    
     ddb.putItem(params,callback);
     console.log('Feedback saved! for '+ globbalname);
     callback(close(intentRequest.sessionAttributes, 'Fulfilled',
    { contentType: 'PlainText', content: ` Thanks ${globbalname} : ${mobilenumber} for your valuable feedback!` }));
    
    }
 }
 
 function ShowOrders(intentRequest, callback)
 {
      const slots = intentRequest.currentIntent.slots;
      mobilenumber = intentRequest.currentIntent.slots.Mobile;
      // callback(DisplayCard(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, 'PCode', 'Your Order History!'));
          var validationResult= buildValidationResult(false, 'Mobile', 'I did not recognize that, can you rephrase?');
        callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
            slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Order History` },
            buildResponseCard('Order History', 'Delivered', buildOptions('PCode', '', '', ''))));
 }
 
function ValidateAdminDetails(mobilenumber,pwd,cnPwd,key) {
    console.log('In validation mob1:'+mobilenumber+'  key:'+key);
if(mobilenumber)
{
  if(mobilenumber.length!==10)
  {
      return buildValidationResult(false, 'Mobile', 'Please enter Valid mobile number!');
  }
}
if(cnPwd)
{
if(pwd!==cnPwd)
{
      return buildValidationResult(false, 'ConfirmPwd', 'Confirm password does not match');
}
}
 
if(key!==undefined&&key!==null)
{
        var AWS= require('aws-sdk');
        var ddb = new AWS.DynamoDB({
        region: 'us-east-1',
         maxRetries: 1
        });
    
    
    var params = {
      TableName: 'AdminKey',
      Key: {
          'MobileNumber' : {S: mobilenumber},
            }//,
          };
        ddb.getItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
var nme=data.Item.MobileNumber;
//callback(null,'Hello '+name+" welcome back!");
var n=JSON.stringify({"DataKey" : nme});
var nm=JSON.parse(n);

if(nm["DataKey"]!==undefined)
dbkey=nm["DataKey"].S;
else
dbkey=undefined;
console.log('In validation mob2:'+mobilenumber+'  dbkey:'+dbkey);

if(key!==dbkey)
    {
        return buildValidationResult(false, 'Key', 'Key:'+key+' dbkey:'+dbkey+' is not valid.Please enter a valid key');
    }
}
});
console.log('In Validation dbkey'+dbkey);
    
}

    return buildValidationResult(true, null, null);
} 
 
 function RegisterAdmin(intentRequest, callback){
     
    mobilenumber = intentRequest.currentIntent.slots.MobileNumber;
    const name = intentRequest.currentIntent.slots.Name;
    const identityType=intentRequest.currentIntent.slots.IdentityProofType;
    const identity=intentRequest.currentIntent.slots.Identity;
    const gender=intentRequest.currentIntent.slots.Gender;
    const dob=intentRequest.currentIntent.slots.DOB;
    const password=intentRequest.currentIntent.slots.Pwd;
    const confirmPwd=intentRequest.currentIntent.slots.ConfirmPswd;
     const subsKey=intentRequest.currentIntent.slots.AdminKey;
     
     var subsDbKey='';
    const source = intentRequest.invocationSource;
    
         var AWS= require('aws-sdk');
     var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
    
     if (source === 'DialogCodeHook') {
         
//          if(mobilenumber!==undefined&&mobilenumber!==null)
//          {
//          console.log('In reg admin mob'+mobilenumber);
          
// }
         
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
        const validationResult = ValidateAdminDetails(mobilenumber,password,confirmPwd,subsKey);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
   // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      // if (flowerType) {
      ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
      // }
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
     if (source !== 'DialogCodeHook') {
    var params={
      TableName: "User",
      Item:{
          Name:{S:name},
          DateOfBirth:{S:dob},
          Gender:{S:gender},
          MobileNumber:{S:mobilenumber.toString()},
        //   IdentityType:{S:identityType},
        //   IdentityNumber:{S:identity},
          Password:{S:password},
          IsAdmin:{S:'1'}
      }
    };
    
    ddb.putItem(params,callback);   
     }
    
     callback(close(intentRequest.sessionAttributes, 'Fulfilled',
    { contentType: 'PlainText', content: `Congrats ${name}! You are Registered as Administrator Successfully` }));
    
 }
 
 
 function ShowDashBoard(intentRequest, callback)
 {
     
      var buttons = [];
       var buttonsAdmin = [];
      var attachments=[];
    var obj={text: 'Sign UP', value:'Register'};
     buttons.push(obj);
    var obj={text: 'Login', value:'Login'};
     buttons.push(obj);
     
       var obj1={text: 'Register as Admin', value:'Admin'};
     buttonsAdmin.push(obj1);
      var obj1={text: 'Login as Admin', value:'signin'};
     buttonsAdmin.push(obj1);
    
    
       
        var obj=  {
          title:'User',
          subTitle:'     ',
          buttons:buttons
         };
            attachments.push(obj);
            
          var objAdmin=  {
          title:'Admin',
          subTitle:'     ',
          buttons:buttonsAdmin
         };
          attachments.push(objAdmin);
          
     callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: 'Welcome to Fabric Store'}, buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
 }
 
 
 function ValidationBuyProduct(PCode,date,bankName,ifsc,accno,otp,intentRequest,callback)
 {
     console.log('ValidationBuyProduct started');
      if(PCode===null)
    {
    // ShowProductList(intentRequest,callback);
     return buildValidationResult(false, 'ProductCode', 'What Product would you like to buy?');
    }
      console.log('Validation: PCode Completed');

    if (date) {
        if (!isValidDate(date)) {
            return buildValidationResult(false, 'Delivery', 'What date would you like to pick the product up?');
        }
        if (parseLocalDate(date) < new Date()) {
            return buildValidationResult(false, 'Delivery', 'You can pick up the product from tomorrow onwards.  What day would you like to pick them up?');
        }
    }
     console.log('Validation: date Completed');
    // if (time) {
    //     if (time.length !== 5) {
    //         // Not a valid time; use a prompt defined on the build-time model.
    //         return buildValidationResult(false, 'DeliveryTime', null);
    //     }
    //     const hour = parseInt(time.substring(0, 2), 10);
    //     const minute = parseInt(time.substring(3), 10);
    //     if (isNaN(hour) || isNaN(minute)) {
    //         // Not a valid time; use a prompt defined on the build-time model.
    //         return buildValidationResult(false, 'DeliveryTime', null);
    //     }
    //     if (hour < 9 || hour > 18) {
    //         // Outside of business hours
    //         return buildValidationResult(false, 'DeliveryTime', 'Our business hours are from Nine a m. to Six p m. Can you specify a time during this range?');
    //     }
        
      
    // }
    
    if(accno===null&&bankName!==null&&ifsc!==null)
    {
        console.log('acc val');
        return buildValidationResult(false, 'AccountNumber', 'Please enter Account Number');
    }
    
    if(accno!==null)
    {
        if(otp!==undefined&&otp!==null)
        {
            // console.log('call otp');
            // GenerateOtp(mobilenumber);
        }
        else{
             console.log('call otp');
            GenerateOtp(mobilenumber);
            return buildValidationResult(false, 'OTP', 'OTP is sent to your registered mobile number.Please enter OTP');
        }
    }
    
   console.log('ValidationBuyProduct completed');
    
    return buildValidationResult(true, null, null);
 }
 
 
function GetDeliveryDate(daystoAdd)
{
      var tt = new Date();

    var date = new Date(tt);
    var newdate = new Date(date);

    newdate.setDate(newdate.getDate() + parseInt(daystoAdd));
    
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();

    var someFormattedDate =y+'-'+ mm + '-' + dd ;
    console.log('someFormattedDate'+someFormattedDate);
    return someFormattedDate;
}
 function BuyProduct(intentRequest, callback)
 {
   var ordersCount=0;
   var sleep = require('system-sleep');
    const inputSessionAttributes = intentRequest.sessionAttributes;
    console.log('In Buy Product inputSessionAttributes.MobileNumber'+inputSessionAttributes.MobileNumber);
     mobilenumber = inputSessionAttributes.MobileNumber;
      isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     console.log('In Buy product');
     console.log('Session mob: '+mobilenumber);
   
    const productcode = intentRequest.currentIntent.slots.ProductCode;
    var delivery=intentRequest.currentIntent.slots.Delivery;
    

var deliveryDate=GetDeliveryDate(delivery);


console.log('deliveryDate'+deliveryDate);
   // const deliverytime=intentRequest.currentIntent.slots.DeliveryTime;
    const accno=intentRequest.currentIntent.slots.AccountNumber;
    const bankname=intentRequest.currentIntent.slots.BankName;
    const ifsc=intentRequest.currentIntent.slots.IFSC;
    const otp=intentRequest.currentIntent.slots.OTP;
    
    const source = intentRequest.invocationSource;
  
    console.log('In BuyProduct');
    var AWS= require('aws-sdk');
   
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
  var docClient = new AWS.DynamoDB.DocumentClient();
                     var params = {
                                    TableName: "Orders"
                                  };
                                
                               
                               docClient.scan(params, onScanCountOrders);
   sleep(500);
                              function onScanCountOrders(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                      
                                         //ordersCount=data.ScannedCount;
                                        data.Items.forEach(function(itemdata) {
                                         
                                           ordersCount++;
                                        });
                                         ordersCount++;
                                //  sleep(500);
                                        // continue scanning if we have more items
                                        if (typeof data.LastEvaluatedKey != "undefined") {
                                            console.log("Scanning for more...");
                                            params.ExclusiveStartKey = data.LastEvaluatedKey;
                                            docClient.scan(params, onScanCountOrders);
                                        }
                                    }
                                }
  console.log('Source '+source);
  if(productcode!==undefined&&productcode!==null&&globalProductCost==='0')
            GetProductDetails(productcode,callback);
            
    if (source === 'DialogCodeHook') {
       console.log('Account number:'+ accno);
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
        //const validationResult = validateOrderFlowers(0, deliverydate, deliverytime,mobilenumber,password,password,null,null,null,productcode,accno,otp,intentRequest,callback);
        const validationResult=ValidationBuyProduct(productcode,deliveryDate,bankname,ifsc,accno,otp,intentRequest,callback);
        
        console.log('Violated slot: '+validationResult.violatedSlot);
        
        if (!validationResult.isValid) {
            if(validationResult.violatedSlot!=='ProductCode')
            {
               slots[`${validationResult.violatedSlot}`] = null;
               callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
               return;
            }
            else
            {  
                slots[`${validationResult.violatedSlot}`] = null;
                ShowProductList(intentRequest,callback);
                return;
            }
        }
        
      
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
    
    console.log('Source:'+source);
        var params = {
      TableName: 'User',
      Key: {
          'MobileNumber' : {S: mobilenumber},
            }//,
 // ProjectionExpression: 'ATTRIBUTE_NAME'
  };
  
if(source !== 'DialogCodeHook'){
console.log('code hook otp:'+otp);

if(otp.toString().trim()===globalotp.toString().trim())
{
   //  GetProductDetails(productcode,callback);
        // Call DynamoDB to read the item from the table
ddb.getItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
var nme=data.Item.Name;
//callback(null,'Hello '+name+" welcome back!");
var n=JSON.stringify({"name" : nme});
var nm=JSON.parse(n);
globbalname=nm["name"].S;
var dt=new Date();
console.log('Inside Name:'+ globbalname);
    var params={
      TableName: "Payments",
      Item:{
          AccountNumber:{S:accno.toString()},
          BankName:{S:bankname.toString()},
          BankIFSC:{S:ifsc.toString()},
          MobileNumber:{S:mobilenumber.toString()},
          PaymentDate:{S:dt.toString()}
      }
    };
    ddb.putItem(params,callback);
    console.log('Payments done');
 

   
//   var link='';
// var cost='0';
// if(productcode.toString().trim()==='Cotton T Shirt Size 40')
// {
// link='https://s3.amazonaws.com/fabricstoreimages/Assorted_T_Shirts_large.jpg';
// cost='945';
// }
// else
// {
// link='https://s3.amazonaws.com/fabricstoreimages/Blue_Tshirt.jpg';
// cost='1233';
// }
     console.log("globalProductCost"+globalProductCost);
          console.log("globalProductID"+globalProductID);
            console.log("globalProductlink"+globalProductlink);
    ordersCount=parseInt(ordersCount)+1;
    
    console.log('ordersCount'+ordersCount.toString());
    console.log('deliveryDate.toString()'+deliveryDate.toString());
    console.log('dt.toString()'+dt.toString());
    console.log('globalProductlink.toString()'+globalProductlink.toString());
    console.log('mobilenumber.toString()'+mobilenumber.toString());
    console.log('globalProductCost.toString()'+globalProductCost.toString());
    console.log('globalProductID.toString()'+globalProductID.toString());
    
    
     var params={
      TableName: "Orders",
      Item:{
          ID:{N:ordersCount.toString()},
          DeliveryDate:{S:deliveryDate.toString()},
          PurchaseDate:{S:dt.toString()},
          ProductDesc:{S:globalProductDesc},
          Link:{S:globalProductlink.toString()},
          MobileNumber:{S:mobilenumber.toString()},
          Cost:{N:globalProductCost.toString()},
          ProductID:{N:globalProductID.toString()},
          OrderStatus:{S:'OrderConfirm'},
          ToReplace:{N:'0'},
          ToCancel:{N:'0'},
          Reason:{S:' '}
      }
    };
    
     ddb.putItem(params,callback);
      console.log('Order done');
      
//  callback(close(intentRequest.sessionAttributes, 'Fulfilled',
//     { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}`
//     }));
   
  
      var buttons = [];
      var attachments=[];
  var obj={text: 'Give Feedback', value:'Feedback'};
     buttons.push(obj);
    var obj={text: 'Later', value:'Later'};
     buttons.push(obj);
    
       
        var obj=  {
          title:'Please provide your valuable feedback',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
  
//   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
//             intentRequest.currentIntent.slots, evalidationResult.violatedSlot,  { contentType: 'PlainText', content: ` Thanks ${globbalname}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` },
//             buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
  var outsessionAttributes=intentRequest.sessionAttributes;//||{};
  outsessionAttributes.MobileNumber=mobilenumber;
   outsessionAttributes.IsAdmin=isAdmin;
//    var sessobj=new {MobileNumber: mobilenumber};
   callback(closeWithCard(outsessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: ` Thanks ${globbalname}, your Order with OrderID : ${ordersCount} for Product :${globalProductDesc} has been placed and will be ready for pickup on ${deliveryDate} in our business hours 10 a.m. to 6 p.m.` }, buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
  
          //  callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, eslots, evalidationResult.violatedSlot, evalidationResult.message));
            return;
  }
});
 }
    else
    {
        console.log('In correct otp'+otp);
        
        
//   callback(close(intentRequest.sessionAttributes, 'Fulfilled',
//     { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' }));
   
   
  
      var buttons = [];
      var attachments=[];
    var obj={text: 'Give Feedback', value:'Feedback'};
     buttons.push(obj);
    var obj={text: 'Later', value:'Later'};
     buttons.push(obj);
    
    
       
        var obj=  {
          title:'Please provide your valuable feedback',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
  
//   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
//             intentRequest.currentIntent.slots, evalidationResult.violatedSlot,  { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' },
//             buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
var outsessionAttributes=intentRequest.sessionAttributes;//;||{};
  outsessionAttributes.MobileNumber=mobilenumber;
   outsessionAttributes.IsAdmin=isAdmin;
  //  var sessobj=new {MobileNumber: mobilenumber};
    callback(closeWithCard(outsessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: 'Sorry '+globbalname+' otp: '+otp+' globalotp: '+globalotp+', you  entered wrong OTP hence your transaction is cancelled' }, buildResponseCardatt(attachments, buildOptions('PCode', '', '', ''))));
    
    }
    }
    
  

//console.log("End "+ name);
 //  callback(close(intentRequest.sessionAttributes, 'Fulfilled', { contentType: 'PlainText', content: ` Thanks ${name}, your order for ${productcode} has been placed and will be ready for pickup by ${deliverytime} on ${deliverydate}` }));
    // Order the clothes, and rely on the goodbye message of the bot to define the message to the end user.  In a real bot, this would likely involve a call to a backend service.
   
   
   // console.log('Last Source:'+source);
   // console.log('Welcome '+globbalname);
}
 
 
 function SignInAdmin(intentRequest, callback)
 {
    var name = ' ';
   // var gender = ' ';
     mobilenumber = intentRequest.currentIntent.slots.MobileNumber;
      const password = intentRequest.currentIntent.slots.adminPassword;
       const operation = intentRequest.currentIntent.slots.Operation;
    const productcode = intentRequest.currentIntent.slots.PCode;
    const deliverydate=intentRequest.currentIntent.slots.DeliveryDate;
    const deliverytime=intentRequest.currentIntent.slots.DeliveryTime;
    const dob=intentRequest.currentIntent.slots.DOB;
    const accno=intentRequest.currentIntent.slots.AccountNumber;
    const bankname=intentRequest.currentIntent.slots.BankName;
    const ifsc=intentRequest.currentIntent.slots.IFSC;
    const otp=intentRequest.currentIntent.slots.OTP;
    const source = intentRequest.invocationSource;
 var retVal=2;
    console.log('In SignInAdmin');
    var AWS= require('aws-sdk');
 
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
 
   console.log(mobilenumber);

  console.log('Source '+source);

    if (source === 'DialogCodeHook') {
       
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
      //  const validationResult = validateOrderFlowers(0, deliverydate, deliverytime,mobilenumber,password,password,null,null,null,productcode,accno,otp,intentRequest,callback);
        const validationResult=ValidateLoginUser(mobilenumber,password,intentRequest, callback);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        
    //       if(password!==undefined && password !==null &&mobilenumber!==undefined&&mobilenumber!==null)
    //       {
    //           retVal=  AuthenticateUser(mobilenumber,password,callback,intentRequest);
    //           console.log('retVal'+retVal);
    //           if(retVal===0)
    //           {
    //                 callback(close(intentRequest.sessionAttributes, 'Fulfilled',
    //  { contentType: 'PlainText', content: 'Access Denied!' }));
    //  return ;
    //           }
    //       }
        
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
    
    console.log('Source:'+source);
    
        var params = 
        {
             TableName: 'User',
             Key: {
                 'MobileNumber' : {S: mobilenumber},
                 }
        };
  
if(source !== 'DialogCodeHook'){
        // Call DynamoDB to read the item from the table
    ddb.getItem(params, function(err, data) 
        {
              if (err) {
                              console.log("Error", err);
                       } else {
                                    var nme=data.Item.Name;
                                    var n=JSON.stringify({"name" : nme});
                                    var nm=JSON.parse(n);
                                    globbalname=nm["name"].S;
                                    console.log('Inside Name:'+ globbalname);
                                    
                                    
                                    var nme=data.Item.Password;
                                    var n=JSON.stringify({"password" : nme});
                                    var nm=JSON.parse(n);
                                    var dbpwd=nm["password"].S; 
                                    console.log('Db Password:'+dbpwd);
                                   
                                   
                                    var nme=data.Item.IsAdmin;
                                    var n=JSON.stringify({"isadmin" : nme});
                                    var nm=JSON.parse(n);
                                    isAdmin=nm["isadmin"].S; 
                                    console.log('Db isadmin:'+isAdmin);
                                    
                                      var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);

      const outputSessionAttributes = intentRequest.sessionAttributes || {};
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
           outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
       
           if(dbpwd!==password)
            {
                     console.log('Password did not match');
                     callback(close(intentRequest.sessionAttributes, 'Fulfilled',
                        { contentType: 'PlainText', content: 'Access Denied!' }));

            }
            else{
                if(isAdmin.toString().trim()==="1")
                {
                    callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Welcome ${globbalname} !` }, buildResponseCardatt(attachments)));
                }
                else{
                console.log('Not Admin');
                     callback(close(intentRequest.sessionAttributes, 'Fulfilled',
                        { contentType: 'PlainText', content: 'You are not authorized to view these options!' }));
                }
            }
                                    
                                    
           }
        });
}
}
 
 
 function ValidateManageProfile(field,newMobile,dom,addr,pincode,otp,oldpassword,password,confirmpassword,intentRequest, callback)
 {
       console.log('ValidateManageProfile started');
       console.log('Field:' + field);
    if(field===null)
    {
     return buildValidationResult(false, 'Field', 'What would you like to update');
    }
    if(newMobile===null&&field==='Mobile')
    {
    // ShowProductList(intentRequest,callback);
     return buildValidationResult(false, 'MobileNumber', 'Please enter your new mobile number');
    }
    
    if(newMobile!==null&&field==='Mobile'&&otp===null)
    {
            console.log('call otp');
            GenerateOtp(mobilenumber);
            return buildValidationResult(false, 'OTP', 'OTP is sent to your new registered mobile number.Please enter OTP');
    }
      console.log('Validation: Mobile Completed');


    if(dom===null&&field==='DOM')
    {
        return buildValidationResult(false, 'DOM', 'Please enter wedding date');
    }
    
    if (dom!==null&&field==='DOM') {
        if (!isValidDate(dom)) {
            return buildValidationResult(false, 'DOM', 'Please enter valid date');
        }
        if (parseLocalDate(dom) > new Date()) {
            return buildValidationResult(false, 'DOM', 'Wedding Date cannot be future date. Please enter correct wedding date');
        }
    }
     console.log('Validation: date Completed');
   
     if(addr===null&&field==='Address')
    {
        console.log('addr val');
        return buildValidationResult(false, 'Address', 'Please enter your new Address');
    }
    
    if(addr!==null&&field==='Address'&&pincode===null)
    {
        console.log('pincode val');
        return buildValidationResult(false, 'Pincode', 'Please enter your new Pincode');
    }
    
    if(oldpassword===null&&field==='Password')
    {
        
        // GenerateOtp(mobilenumber);
          return buildValidationResult(false, 'OldPassword', 'Please enter your old password');
    }
    
    if(oldpassword!==null&&password===null&&field==='Password')
    {
        return buildValidationResult(false, 'Passcode', 'Please enter your new password');
    }
    
     if(oldpassword!==null&&password!==null&&confirmpassword===null&&field==='Password')
    {
        return buildValidationResult(false, 'ConfirmPasscode', 'Please confirm new password');
    }
    
     if(oldpassword!==null&&password!==null&&confirmpassword!==null&&field==='Password'&&otp===null)
    {
        if(password.toString().trim()!==confirmpassword.toString().trim())
        {
            return buildValidationResult(false, 'ConfirmPasscode', 'Confirm password does not match');
        }
        else{
         GenerateOtp(mobilenumber);
         return buildValidationResult(false, 'OTP', 'OTP is sent your registered mobilenumber.Please enter OTP.');
        }
    }
   
    
    
    
   console.log('ValidateManageProfile completed');
    
    return buildValidationResult(true, null, null);
 }
 
 function ManageProfile(intentRequest, callback)
 {
  var sleep = require('system-sleep');
     const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     
     console.log('In ManageProfile');
     console.log('ManageProfile Session mob: '+mobilenumber);
     var isMarried='';
     
     const field = intentRequest.currentIntent.slots.Field;
     const dom = intentRequest.currentIntent.slots.DOM;
     const pincode = intentRequest.currentIntent.slots.Pincode;
     const address=intentRequest.currentIntent.slots.Address;
     const newmobilenumber=intentRequest.currentIntent.slots.MobileNumber;
     
     const password=intentRequest.currentIntent.slots.Passcode;
    const confirmpassword=intentRequest.currentIntent.slots.ConfirmPasscode;
    const oldpassword=intentRequest.currentIntent.slots.OldPassword;
    
    const otp = intentRequest.currentIntent.slots.OTP;
    
    const source = intentRequest.invocationSource;

    var AWS= require('aws-sdk');
 
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
 
   console.log(mobilenumber);

  console.log('Source '+source);
  
  
  
  if(mobilenumber!==null)
  {
      console.log('Retrieving user info');
        var params = 
              {
                 TableName: 'User',
                 Key: {
                            'MobileNumber' : {S: mobilenumber},
                      }
              };
              
        ddb.getItem(params, function(err, data) 
                            {
         if (err) {
                        console.log("Error", err);
                    } else {
                       
                                 var nme=data.Item.Name;
                                 var n=JSON.stringify({"name" : nme});
                                 var nm=JSON.parse(n);
                                globbalname=nm["name"].S;
                                
                                  console.log('Inside Name:'+ globbalname);
                                
                                 var nme=data.Item.DateOfBirth;
                                 var n=JSON.stringify({"dob" : nme});
                                 var nm=JSON.parse(n);
                                 vr_dob=nm["dob"].S;
                                
                                    console.log('Inside dob:'+ vr_dob);
                                
                                console.log('data.Item.Gender'+data.Item.Gender);
                                
                                 var nme=data.Item.Gender;
                                 var n=JSON.stringify({"gender" : nme});
                                 console.log('n'+n);
                                 var nm=JSON.parse(n);
                                  console.log('nm'+nm);
                                 vr_gender=nm["gender"].S;
                                    console.log('nm["gender"]'+nm["gender"]);
                                 console.log('Inside gender:'+ vr_gender);
                                
                                 var nme=data.Item.Password;
                                 var n=JSON.stringify({"pass" : nme});
                                 var nm=JSON.parse(n);
                                 vr_pass=nm["pass"].S;
                                
                                console.log('Inside pass:'+ vr_pass);
                                
                                var nme=data.Item.IsMarried;
                                 var n=JSON.stringify({"isMarried" : nme});
                                 var nm=JSON.parse(n);
                                vr_isMarried=nm["isMarried"].S;
                                
                                 console.log('Inside isMarried:'+ vr_isMarried);
                                
                                 var nme=data.Item.DateOfMarriage;
                                 var n=JSON.stringify({"dom" : nme});
                                 var nm=JSON.parse(n);
                                 if(nm["dom"]!==null && nm["dom"]!==undefined)
                                vr_dom=nm["dom"].S;
                                else
                                vr_dom=' ';
                                
                                 console.log('Inside dom:'+ vr_dom);
                                
                                  var nme=data.Item.HaveKids;
                                 var n=JSON.stringify({"haveKids" : nme});
                                 var nm=JSON.parse(n);
                                 
                                  if(nm["haveKids"]!==null && nm["haveKids"]!==undefined)
                                vr_haveKids=nm["haveKids"].S;
                                else
                                vr_haveKids=' ';
                                
                                console.log('Inside haveKids:'+ vr_haveKids);
                                
                                  var nme=data.Item.Address;
                                 var n=JSON.stringify({"address" : nme});
                                 var nm=JSON.parse(n);
                                  if(nm["address"]!==null && nm["address"]!==undefined)
                                vr_address=nm["address"].S;
                                else
                                vr_address=' ';
                                
                                  console.log('Inside address:'+ vr_address);
                               
                                 var nme=data.Item.PinCode;
                                 var n=JSON.stringify({"pincode" : nme});
                                 var nm=JSON.parse(n);
                                   if(nm["pincode"]!==null && nm["pincode"]!==undefined)
                                 vr_pincode=nm["pincode"].S;
                                else
                                vr_pincode=' ';
                                 sleep(500);
                                  console.log('Inside nm["pincode"].S:'+ vr_pincode);
                            }
                        });   
      
      
  }

     if (source === 'DialogCodeHook') {
       
    //     // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
    
        const validationResult=ValidateManageProfile(field,newmobilenumber,dom,address,pincode,otp,oldpassword,password,confirmpassword,intentRequest, callback);
        console.log('validationResult.violatedSlot: '+validationResult.violatedSlot);
        console.log('validationResult.isValid: '+validationResult.isValid);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
    //     // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
      console.log('Dialog code hook completed');
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
     }
     
     
     
     if(source !=='DialogCodeHook')
     {
          
         if(field=='DOM')
         {
             isMarried='Married';
             
            //   var paramsDOM={
            //                         TableName: "User",
            //                          Item:{
            //                                  Name:{S:globbalname},
            //                                  DateOfBirth:{S:vr_dob},
            //                                  Gender:{S:vr_gender},
            //                                  MobileNumber:{S:JSON.stringify(mobilenumber)},
            //                                  IsAdmin:{S:'0'},
            //                                  Password:{S:vr_pass},
            //                                  IsMarried:{S:isMarried},
            //                                  DateOfMarriage:{S:dom},
            //                                  HaveKids:{S:vr_haveKids},
            //                                  Address:{S:vr_address},
            //                                  PinCode:{S:vr_pincode}
            //                              }
            //                          };

            //  ddb.putItem(paramsDOM,callback);    
             
               var paramsUpdate = {
                                        TableName:"User",
                                        Key:{
                                         'MobileNumber' : {S: mobilenumber}
                                        },
                                        UpdateExpression: "set IsMarried=:rss, DateOfMarriage = :r",
                                        ExpressionAttributeValues:{
                                        ":r": {S:dom.toString()},
                                        ":rss":{S:isMarried}
                                        },
                                        ReturnValues:"UPDATED_NEW"
                                        };
                                
                                 ddb.updateItem(paramsUpdate, function (err, data) {
                            if (err) {
                              //  context.fail('FAIL:  Error updateItem from dynamodb - ' + err);
                                 console.log('FAIL:  Error updateItem from dynamodb - ' + err);
                            } else {
                                console.log("DEBUG:  updateItem worked. ");
                                                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                                            }
                                        });
             
             
            //   callback(close(intentRequest.sessionAttributes, 'Fulfilled',
            //  { contentType: 'PlainText', content: field+' Updated successfully' }));
             
             var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
             
             
             var outsessionAttributes=intentRequest.sessionAttributes;//||{};
              outsessionAttributes.MobileNumber=mobilenumber;
               outsessionAttributes.IsAdmin='0';
             
              callback(closeWithCard(outsessionAttributes, 'Fulfilled',
             { contentType: 'PlainText', content: field+' Updated successfully' }, buildResponseCardatt(attachments)));
          
            console.log('Wedding dete updated successfully!');
         }
         if(field==='Address')
         {
         
            //      var paramsInsert={
            //                         TableName: "User",
            //                          Item:{
            //                                  Name:{S:globbalname},
            //                                  DateOfBirth:{S:vr_dob},
            //                                  Gender:{S:vr_gender},
            //                                  MobileNumber:{S:mobilenumber},
            //                                  IsAdmin:{S:'0'},
            //                                  Password:{S:vr_pass},
            //                                  IsMarried:{S:vr_isMarried},
            //                                  DateOfMarriage:{S:vr_dom},
            //                                  HaveKids:{S:vr_haveKids},
            //                                  Address:{S:address},
            //                                  PinCode:{S:pincode}
            //                              }
            //                          };

            //  ddb.putItem(paramsInsert,callback);  
           //  console.log('Address details updated successfully!');
            //   callback(close(intentRequest.sessionAttributes, 'Fulfilled',
            //  { contentType: 'PlainText', content: field+' Updated successfully' }));
            
             var paramsUpdate = {
                                        TableName:"User",
                                        Key:{
                                         'MobileNumber' : {S: mobilenumber}
                                        },
                                        UpdateExpression: "set Address=:r, PinCode = :rss",
                                        ExpressionAttributeValues:{
                                        ":r": {S:address.toString()},
                                        ":rss":{S:pincode.toString()}
                                        },
                                        ReturnValues:"UPDATED_NEW"
                                        };
                                
                                 ddb.updateItem(paramsUpdate, function (err, data) {
                            if (err) {
                              //  context.fail('FAIL:  Error updateItem from dynamodb - ' + err);
                                 console.log('FAIL:  Error updateItem from dynamodb - ' + err);
                            } else {
                                console.log("DEBUG:  updateItem worked. ");
                                                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                                            }
                                        });
            
            
            
            
            var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
             
             
             var outsessionAttributes=intentRequest.sessionAttributes;//||{};
              outsessionAttributes.MobileNumber=mobilenumber;
               outsessionAttributes.IsAdmin='0';
             
              callback(closeWithCard(outsessionAttributes, 'Fulfilled',
             { contentType: 'PlainText', content: field+' Updated successfully' }, buildResponseCardatt(attachments)));
         }
         
          if(field==='Mobile') 
          {
              if(globalotp.toString().trim()===otp.toString().trim())
              {
                  
                  console.log('globbalname'+globbalname);
                  console.log('vr_dob'+vr_dob.toString());
                  console.log('newmobilenumber'+newmobilenumber.toString());     
                  console.log('vr_pass'+vr_pass.toString());    
                  console.log('vr_dom'+vr_dom.toString());    
                  console.log('vr_pincode'+vr_pincode.toString());    
                       
                  
                  
              var paramsMobile={
                                    TableName: "User",
                                     Item:{
                                             Name:{S:globbalname},
                                             DateOfBirth:{S:vr_dob.toString()},
                                             Gender:{S:vr_gender},
                                             MobileNumber:{S:newmobilenumber.toString()},
                                             IsAdmin:{S:'0'},
                                             Password:{S:vr_pass.toString()},
                                             IsMarried:{S:vr_isMarried},
                                             DateOfMarriage:{S:vr_dom.toString()},
                                             HaveKids:{S:vr_haveKids},
                                             Address:{S:vr_address},
                                             PinCode:{S:vr_pincode.toString()}
                                         }
                                     };

             ddb.putItem(paramsMobile,callback); 
             
            // var docClient = new AWS.DynamoDB.DocumentClient();
            
           
            var params = {
                TableName:"User",
                 Key: {
                            'MobileNumber' : {S: mobilenumber},
                      }
              // ConditionExpression:"info.rating <= :val",
                // ExpressionAttributeValues: {
                //     ":val": 5.0
                // }
            };
            
            console.log("Attempting a conditional delete...");
            
            ddb.deleteItem(params, function(err, data) {
                if (err) {
                    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
             
             
            //   callback(close(intentRequest.sessionAttributes, 'Fulfilled',
            //  { contentType: 'PlainText', content: field+' Updated successfully '}));
            
            
            var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
             
             
             var outsessionAttributes=intentRequest.sessionAttributes;//||{};
              outsessionAttributes.MobileNumber=newmobilenumber;
               outsessionAttributes.IsAdmin='0';
             
              callback(closeWithCard(outsessionAttributes, 'Fulfilled',
             { contentType: 'PlainText', content: field+' Updated successfully' }, buildResponseCardatt(attachments)));
              }
              else{
            //       callback(close(intentRequest.sessionAttributes, 'Fulfilled',
            //  { contentType: 'PlainText', content: 'You entered wrong OTP. Update is cancelled.' }));
            
            var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
             
             
             var outsessionAttributes=intentRequest.sessionAttributes;//||{};
              outsessionAttributes.MobileNumber=mobilenumber;
               outsessionAttributes.IsAdmin='0';
             
              callback(closeWithCard(outsessionAttributes, 'Fulfilled',
             { contentType: 'PlainText', content: 'You entered wrong OTP. Update is cancelled.' }, buildResponseCardatt(attachments)));
              }
             
             console.log('Mobile Number updated successfully!');
          }
         
         
         
         if(field=='Password')
         {
              if(globalotp.toString().trim()===otp.toString().trim())
              {
                  if(oldpassword===vr_pass)
                  {
                        //       var paramsInsert={
                        //                         TableName: "User",
                        //                          Item:{
                        //                                  Name:{S:globbalname},
                        //                                  DateOfBirth:{S:vr_dob},
                        //                                  Gender:{S:vr_gender},
                        //                                  MobileNumber:{S:mobilenumber},
                        //                                  IsAdmin:{S:'0'},
                        //                                  Password:{S:password},
                        //                                  IsMarried:{S:vr_isMarried},
                        //                                  DateOfMarriage:{S:vr_dom},
                        //                                  HaveKids:{S:vr_haveKids},
                        //                                  Address:{S:vr_address},
                        //                                  PinCode:{S:vr_pincode}
                        //                              }
                        //                          };
            
                        //  ddb.putItem(paramsInsert,callback); 
                        
                        
                         var paramsUpdate = {
                                        TableName:"User",
                                        Key:{
                                         'MobileNumber' : {S: mobilenumber}
                                        },
                                        UpdateExpression: "set Password=:r",
                                        ExpressionAttributeValues:{
                                        ":r": {S:password.toString()}
                                        },
                                        ReturnValues:"UPDATED_NEW"
                                        };
                                
                                 ddb.updateItem(paramsUpdate, function (err, data) {
                            if (err) {
                              //  context.fail('FAIL:  Error updateItem from dynamodb - ' + err);
                                 console.log('FAIL:  Error updateItem from dynamodb - ' + err);
                            } else {
                                console.log("DEBUG:  updateItem worked. ");
                                                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                                            }
                                        });
                         
                        //   callback(close(intentRequest.sessionAttributes, 'Fulfilled',
                        //  { contentType: 'PlainText', content: field+' Updated successfully' }));
                        
                       var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
                         
                         
                         var outsessionAttributes=intentRequest.sessionAttributes;//||{};
                          outsessionAttributes.MobileNumber=mobilenumber;
                           outsessionAttributes.IsAdmin='0';
                         
                          callback(closeWithCard(outsessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: field+' Updated successfully' }, buildResponseCardatt(attachments)));
                          console.log('Password updated successfully!');
                  }
                  else{
                                 var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
                                 
                                 
                                 var outsessionAttributes=intentRequest.sessionAttributes;//||{};
                                  outsessionAttributes.MobileNumber=mobilenumber;
                                   outsessionAttributes.IsAdmin='0';
                                 
                                          callback(closeWithCard(outsessionAttributes, 'Fulfilled',
                                         { contentType: 'PlainText', content: 'You entered wrong old password. Update is cancelled.' }, buildResponseCardatt(attachments)));
                  }
              }
              else{
                                //       callback(close(intentRequest.sessionAttributes, 'Fulfilled',
                                //  { contentType: 'PlainText', content: 'You entered wrong OTP. Update is cancelled.' }));
                                
                                var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
                                 
                                 
                                 var outsessionAttributes=intentRequest.sessionAttributes;//||{};
                                  outsessionAttributes.MobileNumber=mobilenumber;
                                   outsessionAttributes.IsAdmin='0';
                                 
                                          callback(closeWithCard(outsessionAttributes, 'Fulfilled',
                                         { contentType: 'PlainText', content: 'You entered wrong OTP. Update is cancelled.' }, buildResponseCardatt(attachments)));
              }
              
         }
    
 }
 }
 
 function ValidateAddProduct(quantity,image,desc,category,intentRequest, callback)
 {
       console.log('ValidateAddProduct started');
     
     if(desc!==null&&category===null)
     {
         return buildValidationResult(false, 'CName', 'Please select category of product');
     }
       
    if(quantity!==null)
    {
        if(parseInt(quantity)<1 || parseInt(quantity)>50)
     return buildValidationResult(false, 'Quantity', 'Quantity can be between 1 to 50 only');
    }
    
    if(image!==null)
    {
        var path = require('path');
       var ext= path.extname(image).toString().toLowerCase();
       console.log('extension'+ext);
       if(ext!==undefined&&ext!==null)
       {
           if(ext==='.jpg'|| ext ==='.png'||ext ==='.jpeg')
           {
            //
           }
           else{
                return buildValidationResult(false, 'Image', 'Only jpg and png files are allowed');
           }
       }
       else
       {
            return buildValidationResult(false, 'Image', 'Only jpg and png files are allowed');
       }
    // ShowProductList(intentRequest,callback);
   //  return buildValidationResult(false, 'Mobile', 'Please enter your new mobile number');
    }
    
    
      console.log('ValidateAddProduct completed');
      return buildValidationResult(true, null, null);
 }
 
 function AddProduct(intentRequest, callback)
 {
     const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
      isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     
     if(isAdmin.toString().trim()=="0")
     {
          callback(close(inputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` You are not auhtorized for this operation` }));
         return;
         
     }
     
     
     var sleep = require('system-sleep');
    const title = intentRequest.currentIntent.slots.Title;
    const productDescription=intentRequest.currentIntent.slots.Subtitle;
    const productCost=intentRequest.currentIntent.slots.Cost;
    const quantity=intentRequest.currentIntent.slots.Quantity;
    const category=intentRequest.currentIntent.slots.CName;
    const image=intentRequest.currentIntent.slots.ImageUrl;
      const brandName=intentRequest.currentIntent.slots.Brand;
     const replaceDays=intentRequest.currentIntent.slots.ReplaceDays;
    
     var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();
    
    const source = intentRequest.invocationSource;
 var retVal=2;
    console.log('In AddProduct');
    var AWS= require('aws-sdk');
 
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
 
   console.log('mobilenumber '+mobilenumber);
   
                    // var params = {
                    //             TableName: "ClothCategories"
                    //           };
                    //              docClient.scan(params, onScanRowCount);
                             
                            
                    //           function onScanRowCount(err, data) {
                    //             if (err) {
                    //                 console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                    //             } else {        
                    //                 console.log("Count Scan succeeded. count"+data.ScannedCount);
                                     
                                    
                    //                 // data.Items.forEach(function(itemdata) {
                    //                 //      var category=itemdata.Category;
                                         
                                   
                    //                 // //  console.log('totalcnt:'+totalcnt++);
                    //                 // //  inputSessionAttributes.ProductID=totalcnt;
                    //                 // });
                            
                    //                 // continue scanning if we have more items
                    //                 if (typeof data.LastEvaluatedKey != "undefined") {
                    //                     console.log("Scanning for more...");
                    //                     params.ExclusiveStartKey = data.LastEvaluatedKey;
                    //                     docClient.scan(params, onScanRowCount);
                    //                 }
                    //             }
                    //         }

  console.log('Source '+source);

    if (source === 'DialogCodeHook') {
       
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
      //  const validationResult = validateOrderFlowers(0, deliverydate, deliverytime,mobilenumber,password,password,null,null,null,productcode,accno,otp,intentRequest,callback);
        const validationResult=ValidateAddProduct(quantity,image,productDescription,category,intentRequest, callback);
        
       console.log('validationResult.violatedSlot'+validationResult.violatedSlot);
        if (!validationResult.isValid) {
             if(validationResult.violatedSlot!=='CName')
             {
                    slots[`${validationResult.violatedSlot}`] = null;
                    callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                    return;
             }
             else{
                   
                   var cnt=0;
                   var pid=0;
                     
                            var attachments=[];
                            var buttons = [];
                               var params = {
                                TableName: "ClothCategories"
                              };
                                
                                docClient.scan(params, onScanCat);
                            
                            function onScanCat(err, data) {
                                if (err) {
                                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                } else {        
                                    console.log("ClothCategories Scan succeeded.");
                                     
                                    data.Items.forEach(function(itemdata) {
                                       
                                         var category=itemdata.Category;
                                    cnt++;
                                  console.log('Categories:'+category);
                                      var obj={text: category, value:category};
                                    
                                    buttons.push(obj);
                                    
                                        
                                        console.log('totalcnt: '+totalcnt+'  cnt:'+cnt);
                                         sleep(500);
                                     if((data.ScannedCount===cnt&&data.ScannedCount<=5)||(data.ScannedCount>5 && cnt===5))
                                     {
                                                 var obj=  {
                                              title:"Please select category of the product",
                                              subTitle:" ",
                                              buttons:buttons
                                             };
                                              attachments.push(obj);
                                      
                                         console.log('Display category');
                                         
                                        callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                        intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Please select category of the product` },
                                        buildResponseCardatt(attachments))); 
                                        
                                    }
                                    });
                            
                                    // continue scanning if we have more items
                                    if (typeof data.LastEvaluatedKey != "undefined") {
                                        console.log("Scanning for more...");
                                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                                        docClient.scan(params, onScanCat);
                                    }
                                }
                            }
                            console.log('After category scan complete');
                            return;
                   
             }
        }
       

        
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
         console.log('delegate');
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }   
    
    
                 console.log('Source:'+source);
    
    

  
                if(source !== 'DialogCodeHook'){
                    var link=image;
                    
                    
                
                                              var params = {
                                                TableName: "Products"
                                              };
                                            docClient.scan(params, onScanCount);
                                            
                                            function onScanCount(err, data) {
                                                if (err) {
                                                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                                } else {        
                                                    console.log("Scan succeeded.data.ScannedCount"+data.ScannedCount);
                                                   
                                                   productID=data.ScannedCount;  
                                                    // data.Items.forEach(function(itemdata) {
                                                    //   productID++;
                                                    // });
                                                    productID=productID+1;
                                                    console.log('productID'+productID);
                                                    
                                                    var dt=new Date();
                                                    
                                                      var paramsInsert={
                                                                TableName: "Products",
                                                                 Item:{
                                                                         Id:{N:productID.toString()},
                                                                         Name:{S:title.toString()},
                                                                         Description:{S:productDescription.toString()},
                                                                         Cost:{N:productCost.toString()},
                                                                         Quantity:{S:quantity.toString()},
                                                                         Category:{S:category.toString()},
                                                                         link:{S:link.toString()},
                                                                         CreatedDate:{S:dt.toString()},
                                                                         ReplaceDays:{N:replaceDays.toString()},
                                                                         BrandName:{S:brandName.toString()},
                                                                         Discount:{N:"0"},
                                                                         OfferValidFrom:{S:"2000-01-01"},
                                                                         OfferValidTill:{S:"2000-01-01"},
                                                                         IsOffer:{N:"0"}
                                                                     }
                                                                 };
                            
                                                      ddb.putItem(paramsInsert,callback); 
                                            
                                                    // continue scanning if we have more items
                                                    if (typeof data.LastEvaluatedKey != "undefined") {
                                                        console.log("Scanning for more...");
                                                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                                                        docClient.scan(params, onScanCount);
                                                    }
                                                }
                                            }
                                        //       const inputSessionAttributes = intentRequest.sessionAttributes || {};
                                        //      totalcnt = inputSessionAttributes.ProductID;
                                        
                                        //  console.log(' inputSessionAttributes.ProductID'+ inputSessionAttributes.ProductID);
                    // totalcnt=totalcnt+1;
                    // console.log('productid:'+productID);
                                        //     var paramsInsert={
                                        //                         TableName: "Products",
                                        //                          Item:{
                                        //                                  Id:{N:productID.toString()},
                                        //                                  Name:{S:title},
                                        //                                  Description:{S:productDescription},
                                        //                                  Cost:{N:productCost.toString()},
                                        //                                  Quantity:{S:quantity},
                                        //                                  link:{S:link}
                                        //                              }
                                        //                          };
                            
                                        //  ddb.putItem(paramsInsert,callback); 
                                         
                                         var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                           if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                                          
                                           callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Product added successfully` }, buildResponseCardatt(attachments)));
                                          
                }

 }
 
 
 
 
 function ShowCategories(validationResult,intentRequest, callback)
 {
     var sleep = require('system-sleep');
       var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();
   
                   var cnt=0;
                   var pid=0;
                     
                            var attachments=[];
                            var buttons = [];
                               var params = {
                                TableName: "ClothCategories"
                              };
                                
                                docClient.scan(params, onScanCat);
                            
                            function onScanCat(err, data) {
                                if (err) {
                                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                } else {        
                                    console.log("ClothCategories Scan succeeded.");
                                     
                                    data.Items.forEach(function(itemdata) {
                                        
                                         var category=itemdata.Category;
                                    cnt++;
                                  console.log('Categories:'+category);
                                      var obj={text: category, value:category};
                                    
                                    buttons.push(obj);
                                    
                                        
                                        console.log('totalcnt: '+totalcnt+'  cnt:'+cnt);
                                        sleep(500);
                                     if(data.ScannedCount===cnt)
                                     {
                                                 var obj=  {
                                              title:"Please select category of the product",
                                              subTitle:" ",
                                              buttons:buttons
                                             };
                                              attachments.push(obj);
                                      
                                         console.log('Display category');
                                         
                                        callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                        intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Please select category of the product` },
                                        buildResponseCardatt(attachments))); 
                                        
                                    }
                                    });
                            
                                    // continue scanning if we have more items
                                    if (typeof data.LastEvaluatedKey != "undefined") {
                                        console.log("Scanning for more...");
                                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                                        docClient.scan(params, onScanCat);
                                    }
                                }
                            }
                            console.log('After category scan complete');
 }
 
 
 
 function ValidationDeleteProduct(isId,productId,category,confirm,pid,intentRequest, callback)
 {
     console.log('ValidationDeleteProduct'+ValidationDeleteProduct);
     console.log('isId'+isId);
      console.log('productId'+productId);
       console.log('category'+category);
        console.log('confirm'+confirm);
      var AWS = require('aws-sdk');
      var docClient = new AWS.DynamoDB.DocumentClient();
     if(isId!==null)
     {
     if(isId==='yes')
     {
         if(productId===null)
         {
             return buildValidationResult(false, 'ProductID', 'Please eneter ID of the Product you want to delete ');
         }
         else if(confirm===null){
             return buildValidationResult(false, 'Confirm', 'Are you sure you want to delete this product?');
         }
     }
     else
     {
         if(category===null)
         {
          return buildValidationResult(false, 'CName', 'Please select category of the product you want to delete');
         }
         else if(category!==null&&pid===null)
         {
            return buildValidationResult(false, 'PID', 'Please select category of the product you want to delete');
         }
          else if(pid!==null&&confirm===null){
             return buildValidationResult(false, 'Confirm', 'Are you sure you want to delete this product?');
         }
     }
     }
     
     console.log('ValidationDeleteProduct completed');
      return buildValidationResult(true,null,null);
 }
 
 function DeleteProduct(intentRequest, callback)
 {
       console.log('In DeleteProduct');
     const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
      isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     
     if(isAdmin.toString().trim()=="0")
     {
          callback(close(inputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` You are not auhtorized for this operation` }));
         return;
         
     }
     
     
     
     
     
    const isId = intentRequest.currentIntent.slots.IsID;
    var productId=intentRequest.currentIntent.slots.ProductID;
    const category=intentRequest.currentIntent.slots.CName;
    const confirm=intentRequest.currentIntent.slots.Confirm;
   const source = intentRequest.invocationSource;
    const pid=intentRequest.currentIntent.slots.PID;
     var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();

  var totalcount=0;
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 5
  });
  
  
var sleep = require('system-sleep');
// console.log('Sleep start');
// sleep(5000);
// console.log('Sleep stop'); 

   console.log('mobilenumber '+mobilenumber);
   
   if(category!==null&&category!==undefined)
   {
                     var params = {
                                    TableName: "Products"
                                  };
                                
                               
                               docClient.scan(params, onScanCountProducts);
   sleep(500);
                 function onScanCountProducts(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                         
                                        data.Items.forEach(function(itemdata) {
                                          if(itemdata.Category.toString()==category)
                                          {
                                             totalcount++;
                                             console.log('totalcount inside'+totalcount);
                                          }
                                           
                                        });
                                
                                        // continue scanning if we have more items
                                        if (typeof data.LastEvaluatedKey != "undefined") {
                                            console.log("Scanning for more...");
                                            params.ExclusiveStartKey = data.LastEvaluatedKey;
                                            docClient.scan(params, onScanCountProducts);
                                        }
                                    }
                                }
   }
     console.log('totalcount outside'+totalcount);
  console.log('Source '+source);

    if (source === 'DialogCodeHook') {
       
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
      //  const validationResult = validateOrderFlowers(0, deliverydate, deliverytime,mobilenumber,password,password,null,null,null,productcode,accno,otp,intentRequest,callback);
        const validationResult=ValidationDeleteProduct(isId,productId,category,confirm,pid,intentRequest, callback);
        
       console.log('validationResult.violatedSlot'+validationResult.violatedSlot);
        if (!validationResult.isValid) {
             if(validationResult.violatedSlot!=='CName'&&validationResult.violatedSlot!=='PID')
             {
                    slots[`${validationResult.violatedSlot}`] = null;
                    callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                    return;
             }
             else if(validationResult.violatedSlot==='CName'){
                 ShowCategories(validationResult,intentRequest, callback);
                 return;
             }
             else if(validationResult.violatedSlot==='PID'){
                           var attachments = [];
                                  var params = {
                                    TableName: "Products"
                                  };
                                
                                //var totalcount=0;
                               // docClient.scan(params, onScanCount);
                                
                                docClient.scan(params, onScan);
                                var count = 0;
                                
                              
                                
                                  
                                  
                                function onScan(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                         
                                        data.Items.forEach(function(itemdata) {
                                           
                                          if(itemdata.Category.toString()==category)
                                          {
                                            count++;
                                           var ProductDesc=itemdata.Description;
                                           var ProductCost=itemdata.Cost;
                                           var link=itemdata.link;
                                           var pid=itemdata.Id;
                                       //  var obj={text: 'Buy', value:ProductDesc+'$'+ProductCost+'$'+link};
                                          var obj={text: 'Delete', value:pid.toString()};
                                        var buttons = [];
                                        buttons.push(obj);
                                        var obj=  {
                                          title:ProductDesc,
                                          subTitle:ProductCost,
                                          imageUrl:link,
                                          buttons:buttons
                                         };
                                          attachments.push(obj);
                                          
                                           console.log('Inside Description:'+ ProductDesc);
                                           console.log('Inside ProductCost:'+ ProductCost);
                                           console.log('Inside link:'+ link);
                                           console.log('totalcount:'+totalcount+'  count:'+count);
                                            sleep(500); 
                                            if(totalcount==count)
                                            {
                                                console.log('Display products for deletion')
                                                       callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                                        intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Which Product would you like to delete` },
                                                        buildResponseCardatt(attachments)));
                                                       
                                            }
                                }
                       
                    });
            
                    // continue scanning if we have more items
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        docClient.scan(params, onScan);
                    }
                }
            }
                     return; 
             }
        }

        
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
         console.log('delegate');
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }   
    
    
   console.log('Source:'+source);
    
    

  
                if(source !== 'DialogCodeHook' && confirm.toString().toLowerCase()==='yes'){
                  
                        var docClient = new AWS.DynamoDB.DocumentClient();
                       
                        
                      productId=  productId===null?pid:productId;
                      console.log('productId before delete  :'+productId);
                        
                        var paramsdelete = {
                            TableName:"Products",
                            Key:{
                                "Id": {N:productId.toString()}
                            }
                        };
                        console.log("Attempting a conditional delete with params...user");
                        // docClient.deleteItem(paramsdelete, function(err, data) {
                        //     if (err) {
                        //         console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                        //     } else {
                        //         console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                        //     }
                        // });
                                         
                                         
                                         
                        var tableName = "User";
                        ddb.deleteItem(paramsdelete, function (err, data) {
                            if (err) {
                                context.fail('FAIL:  Error deleting item from dynamodb - ' + err);
                            } else {
                                console.log("DEBUG:  deleteItem worked. ");
                               // context.succeed(data);
                            }
                        });
                                         
                                         
                                         
                                         
                                         
                                         var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                            if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                                          
                                           callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Product deleted successfully` }, buildResponseCardatt(attachments)));
                                          
                }
                else
                {
                       const outputSessionAttributes = intentRequest.sessionAttributes || {};
                      if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                     callback(close(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Product deletion cancelled!` }));
                }
                
 }
 
 
 function ClothCategory(intentRequest, callback)
 {
          var AWS = require('aws-sdk');
          var ddb = new AWS.DynamoDB({
            region: 'us-east-1',
            maxRetries: 1
          });
     var docClient = new AWS.DynamoDB.DocumentClient();
     var sleep = require('system-sleep');
     console.log('In ClothCategory');
     const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
    isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     
     if(isAdmin.toString().trim()=="0")
     {
          callback(close(inputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` You are not auhtorized for this operation` }));
         return;
         
     }
       const slots = intentRequest.currentIntent.slots;
    const category = intentRequest.currentIntent.slots.CategoryName;
    if(category===null)
    {
                   var validationResult=  buildValidationResult(false, 'CategoryName', 'Please enter category name');
                    slots[`${validationResult.violatedSlot}`] = null;
                    callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                    return;
    }
    if(category!==null)
    {
        
                      var params = {
                                    TableName: "ClothCategories"
                                  };
                                
                                //var totalcount=0;
                               // docClient.scan(params, onScanCount);
                                
                                docClient.scan(params, onScan);
                                var count = 0;
                                  
                                function onScan(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                         
                                        data.Items.forEach(function(itemdata) {
                                            
                                            count++;
                                            var catid=data.ScannedCount+1;
                                            if(count==data.ScannedCount)
                                            {
                                                     var paramsInsert={
                                                    TableName: "ClothCategories",
                                                     Item:{
                                                             ID:{S:catid.toString()},
                                                             Category:{S:category}
                                                         }
                                                     };
                    
                                                  ddb.putItem(paramsInsert,callback); 
                                            }
                       
                                        });
            
                    // continue scanning if we have more items
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        docClient.scan(params, onScan);
                    }
                }
            }
        
           var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                           if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                                          
                                           callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Category added successfully` }, buildResponseCardatt(attachments)));
       
       
        
                         }
 }
 
 
  function ValidationUpdateOrderStatus(orderId,confirm,intentRequest, callback)
 {
    //  console.log('ValidationDeleteProduct'+ValidationDeleteProduct);
     // console.log('isId'+isId);
      console.log('productId'+orderId);
     //  console.log('status'+status);
        console.log('confirm'+confirm);
      var AWS = require('aws-sdk');
      var docClient = new AWS.DynamoDB.DocumentClient();
    //  if(isId!==null)
    //  {
    //  if(isId==='yes')
    //  {
         if(orderId===null)
         {
             return buildValidationResult(false, 'OrderID', 'Please enter ID of the Order you want to update');
         }
        //  else if(orderId!==null&&status===null)
        //  {
        //      return buildValidationResult(false, 'StatusName', 'Please enter Status of the Order you want to update');
        //  }
         else if(orderId!==null&&confirm===null){
             return buildValidationResult(false, 'Confirm', 'Are you sure you want to update this order?');
         }
    // }
    //  else
    //  {
    //       if(orderId===null)
    //      {
    //          return buildValidationResult(false, 'OrderID', 'Please enter ID of the Order you want to update');
    //      }
    //      else if(orderId!==null&&status===null)
    //      {
    //          return buildValidationResult(false, 'StatusName', 'Please enter Status of the Order you want to update');
    //      }
    //       else if(orderId!==null&&status!==null&&confirm===null){
    //          return buildValidationResult(false, 'Confirm', 'Are you sure you want to update this order?');
    //      }
    //  }
      
     
    //  }
     
     console.log('ValidationDeleteProduct completed');
      return buildValidationResult(true,null,null);
 }
 
  function ShowOrderStatusForAdminUpdate(validationResult,intentRequest, callback)
  {
     var sleep = require('system-sleep');
       var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();
                   var tcnt=0;
                   var cnt=0;
                   var pid=0;
                     
                            var attachments=[];
                            var buttons = [];
                               var params = {
                                TableName: "OrderStatus"
                              };
                                
                              //  docClient.scan(params, onScanOrdersStatusCount);
                                //sleep(2000);
                                  docClient.scan(params, onScanOrderStatus);
                            
                            //   function onScanOrdersStatusCount(err, data) {
                            //     if (err) {
                            //         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                            //     } else {        
                            //         console.log("ClothCategories Scan succeeded.");
                                     
                            //         data.Items.forEach(function(itemdata) {
                                        
                            //             if(itemdata.ToReplace.toString().trim()=="1"||itemdata.ToCancel.toString().trim()=="1"){
                            //                 tcnt++;
                            //             }
                                        
                            //         });
                                    
                            //          if (typeof data.LastEvaluatedKey != "undefined") {
                            //                                         console.log("Scanning for more...");
                            //                                         params.ExclusiveStartKey = data.LastEvaluatedKey;
                            //                                         docClient.scan(params, onScanOrdersStatusCount);
                            //                   }
                            //     }
                            //   }
                            
                            
                            
                            
                            function onScanOrderStatus(err, data) {
                                if (err) {
                                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                } else {        
                                    console.log("ClothCategories Scan succeeded.");
                                       var buttons = [];
                                                 data.Items.forEach(function(itemdata) {
                                                                   
                                                                  cnt++;
                                                               //  var obj={text: 'Buy', value:ProductDesc+'$'+ProductCost+'$'+link};
                                                                  var obj={text: itemdata.DisplayStatus, value:itemdata.Status};
                                                              
                                                                buttons.push(obj);
                                                               sleep(500);
                                                        if(data.ScannedCount===cnt)
                                                        {
                                                             var obj=  {
                                                                  title:'Order Status',
                                                                  subTitle:' ',
                                                                  buttons:buttons
                                                                 };
                                                                  attachments.push(obj);
                                                                   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                                                    intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Update Orders` },
                                                                    buildResponseCardatt(attachments)));
                                                        }
                       
                                                 });
                            
                                    // continue scanning if we have more items
                                    if (typeof data.LastEvaluatedKey != "undefined") {
                                        console.log("Scanning for more...");
                                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                                        docClient.scan(params, onScanOrderStatus);
                                    }
                                }
                            }
                            console.log('After category scan complete');
 }
 
 
 function ShowOrdersForAdminUpdate(validationResult,intentRequest, callback)
 {
     var sleep = require('system-sleep');
       var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();
                   var tcnt=0;
                   var cnt=0;
                   var ncnt=0;
                   var pid=0;
                     
                            var attachments=[];
                            var buttons = [];
                               var params = {
                                TableName: "Orders"
                              };
                                
                                docClient.scan(params, onScanOrdersCount);
                                sleep(1000);
                                  docClient.scan(params, onScanOrders);
                            
                              function onScanOrdersCount(err, data) {
                                if (err) {
                                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                } else {        
                                    console.log("ClothCategories Scan succeeded.");
                                     
                                    data.Items.forEach(function(itemdata) {
                                        
                                                                var toReplace=itemdata.ToReplace;
                                                                var toCancel=itemdata.ToCancel;
                                           console.log('toReplace:'+toReplace+' toCancel:'+itemdata.ToCancel);
                                        if(itemdata.ToReplace.toString().trim()=="1"||itemdata.ToCancel.toString().trim()=="1"){
                                            tcnt++;
                                            console.log('tcnt'+tcnt);
                                        }
                                        
                                    });
                                    
                                     if (typeof data.LastEvaluatedKey != "undefined") {
                                                                    console.log("Scanning for more...");
                                                                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                                                                    docClient.scan(params, onScanOrders);
                                              }
                                }
                              }
                            
                            
                            
                            
                            function onScanOrders(err, data) {
                                if (err) {
                                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                } else {        
                                    console.log("ClothCategories Scan succeeded.");
                                     
                                                 data.Items.forEach(function(itemdata) {
                                                               if(itemdata.ToReplace.toString().trim()=="1"||itemdata.ToCancel.toString().trim()=="1"){
                                            ncnt++;
                                            console.log('tcnt'+tcnt);
                                        }
                                                                 
                                                                   var ProductDesc=itemdata.ProductDesc;
                                                                   var ProductCost=itemdata.Cost;
                                                                   var link=itemdata.Link;
                                                                var id=itemdata.ID;
                                                                var btnText='Update Status';
                                                                var status= itemdata.OrderStatus.S;
                                                                var toReplace=itemdata.ToReplace;
                                                                var toCancel=itemdata.ToCancel;
                                                                var obj='';
                                                                   var buttons = [];
                                                     console.log('toReplace:'+itemdata.ToReplace+' toCancel:'+itemdata.ToCancel+' Status:'+itemdata.OrderStatus.toString().trim());
                                                       
                                                                if(itemdata.ToReplace.toString().trim()==='1' && itemdata.OrderStatus.toString().trim()==='ReplaceRequested')
                                                                {
                                                                     cnt++;
                                                                     btnText='Confirm Replace';
                                                                     id=itemdata.ID;
                                                                      obj={text: btnText, value:id.toString()};
                                                                       buttons.push(obj);
                                                                       
                                                                         var obj=  {
                                                                  title:ProductDesc,
                                                                  subTitle:ProductCost,
                                                                  imageUrl:link,
                                                                  buttons:buttons
                                                                 };
                                                                  attachments.push(obj);
                                                                   console.log('R pushed');
                                                                   console.log('ProductDesc'+ProductDesc);
                                                                   console.log('ProductCost'+ProductCost);
                                                                     console.log('buttons'+buttons.length);
                                                               
                                                                }
                                                                 if(itemdata.ToCancel.toString().trim()==='1' && itemdata.OrderStatus.toString().trim()==='CancelRequested')
                                                                 {
                                                                      cnt++;
                                                                     btnText='Confirm Cancel';
                                                                     id=itemdata.ID;
                                                                    obj={text: btnText, value:id.toString()};
                                                                     buttons.push(obj);
                                                                       var obj=  {
                                                                  title:ProductDesc,
                                                                  subTitle:ProductCost,
                                                                  imageUrl:link,
                                                                  buttons:buttons
                                                                 };
                                                                  attachments.push(obj);
                                                                    console.log('C pushed');
                                                                   console.log('ProductDesc'+ProductDesc);
                                                                   console.log('ProductCost'+ProductCost);
                                                                     console.log('buttons'+buttons.length);
                                                                 }
                                                              
                                                                
                                                             
                                                               
                                                              
                                                              console.log('tcnt:'+tcnt+'cnt:'+cnt); 
                                                              sleep(500);
                                                        if(tcnt==cnt)
                                                        {
                                                                   callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                                                    intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Update Orders` },
                                                                    buildResponseCardatt(attachments)));
                                                        }
                                                        else if((tcnt!==cnt)&&(tcnt===ncnt))
                                                        {
                                                            callback(close(intentRequest.sessionAttributes, 'Fulfilled',
                                                                { contentType: 'PlainText', content: ` No items to update` }));
                                                        }
                       
                                                 });
                            
                                    // continue scanning if we have more items
                                    if (typeof data.LastEvaluatedKey != "undefined") {
                                        console.log("Scanning for more...");
                                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                                        docClient.scan(params, onScanOrders);
                                    }
                                }
                            }
                            console.log('After category scan complete');
 }
 
 
 function UpdateOrderStatus(intentRequest, callback)
 {
       console.log('In UpdateOrderStatus');
     const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     
     if(isAdmin.toString().trim()=="0")
     {
          callback(close(inputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` You are not auhtorized for this operation` }));
         return;
         
     }
     
     
    const isId = intentRequest.currentIntent.slots.IsID;
    var orderID=intentRequest.currentIntent.slots.OrderID;
    const confirm=intentRequest.currentIntent.slots.Confirm;
    const status=intentRequest.currentIntent.slots.StatusName;
   const source = intentRequest.invocationSource;

     var AWS = require('aws-sdk');
   var docClient = new AWS.DynamoDB.DocumentClient();

  var totalcount=0;
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 5
  });
  
  
var sleep = require('system-sleep');
// console.log('Sleep start');
// sleep(5000);
// console.log('Sleep stop'); 

   console.log('mobilenumber '+mobilenumber);
   
//   if(category!==null&&category!==undefined)
//   {
                     var params = {
                                    TableName: "Orders"
                                  };
                                
                               
                               docClient.scan(params, onScanCountProducts);
   
                         function onScanCountProducts(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                         
                                        data.Items.forEach(function(itemdata) {
                                           // sleep(100);
                                          if(itemdata.ToCancel.toString().trim()==="1"||itemdata.ToReplace.toString().trim()==="1")
                                          {
                                             totalcount++;
                                             console.log('totalcount inside'+totalcount);
                                          }
                                           
                                        });
                                
                                        // continue scanning if we have more items
                                        if (typeof data.LastEvaluatedKey != "undefined") {
                                            console.log("Scanning for more...");
                                            params.ExclusiveStartKey = data.LastEvaluatedKey;
                                            docClient.scan(params, onScanCountProducts);
                                        }
                                    }
                                }
   //}
     console.log('totalcount outside'+totalcount);
  console.log('Source '+source);

    if (source === 'DialogCodeHook') {
       
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
      //  const validationResult = validateOrderFlowers(0, deliverydate, deliverytime,mobilenumber,password,password,null,null,null,productcode,accno,otp,intentRequest,callback);
        const validationResult=ValidationUpdateOrderStatus(orderID,confirm,intentRequest, callback);
        
       console.log('validationResult.violatedSlot'+validationResult.violatedSlot);
        if (!validationResult.isValid) {
             if(validationResult.violatedSlot!=='OrderID')
             {
                    slots[`${validationResult.violatedSlot}`] = null;
                    callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                    return;
             }
             else if(validationResult.violatedSlot==='OrderID'){
                 ShowOrdersForAdminUpdate(validationResult,intentRequest, callback);
                 return;
             }
            //  else if(validationResult.violatedSlot==='StatusName'&&status===null){
            //       ShowOrderStatusForAdminUpdate(validationResult,intentRequest, callback);
            //       return;
            //  }
        }

        
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
        if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
         console.log('delegate');
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }   
    
    
   console.log('Source:'+source);
    
    

  
                if(source !== 'DialogCodeHook' && confirm.toString().toLowerCase()==='yes'){
                  
                        //var docClient = new AWS.DynamoDB.DocumentClient();
                       
                        
                         var params = {
                                       TableName: 'Orders',
                                       Key: {
                                                'ID' : {N: orderID.toString()},
                                            }
                               };
                               
                                ddb.getItem(params, function(err, data) {
                                      if (err) {
                                        console.log("Error", err);
                                      } else {   
                                          
                                          var paramsUpdate ='';
                                            
                                          
                                         var status= data.Item.OrderStatus.S;
                                         console.log('in fulfillme status:'+status);
                                         if(status.toString().trim()==='CancelRequested')
                                         {
                                                         status='Cancelled';
                                                         
                                                paramsUpdate = {
                                                    TableName:"Orders",
                                                    Key:{
                                                    "ID": {N:orderID.toString()}
                                                    },
                                                    UpdateExpression: "set ToCancel = :r, OrderStatus= :rs",
                                                    ExpressionAttributeValues:{
                                                    ":r": {N:"0"},
                                                    ":rs":{S:status}
                                                    },
                                                    ReturnValues:"UPDATED_NEW"
                                                    };
                                         }
                                         else if(status.toString().trim()==='ReplaceRequested')
                                         {
                                                         status='Replaced';
                                                         
                                                paramsUpdate = {
                                                    TableName:"Orders",
                                                    Key:{
                                                    "ID": {N:orderID.toString()}
                                                    },
                                                    UpdateExpression: "set ToReplace = :r, OrderStatus= :rs",
                                                    ExpressionAttributeValues:{
                                                   ":r": {N:"0"},
                                                    ":rs":{S:status}
                                                    },
                                                    ReturnValues:"UPDATED_NEW"
                                                    };
                                         }
                                         
                                          console.log('orderID before update  :'+orderID);
                        
                       
                        console.log("Attempting a conditional update with params..");
                                         
                       
                                    
                                        console.log("Updating the item...");
                                        
                                        ddb.updateItem(paramsUpdate, function(err, data) {
                                            if (err) {
                                                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                                            } else {
                                                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                                                
                                                  var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                           if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                                          
                                           callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Status Updated successfully!` }, buildResponseCardatt(attachments)));
                                            }
                                        });
                                         
                                      }
                                });
                                          
                }else if(source !== 'DialogCodeHook' && confirm.toString().toLowerCase()==='no'){
                   
                                                   var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                           if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                                          
                                           callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Update cancelled!` }, buildResponseCardatt(attachments)));
                                            }
                
 }
 
 
 function ValidationApplyOffers(isId,productId,category,brand,confirm,pid,offerStartDate,offerEndDate,discount,intentRequest, callback)
{
     console.log('ValidationDeleteProduct'+ValidationDeleteProduct);
     console.log('isId'+isId);
      console.log('productId'+productId);
       console.log('category'+category);
        console.log('confirm'+confirm);
      var AWS = require('aws-sdk');
      var docClient = new AWS.DynamoDB.DocumentClient();
      
    //   if(offerEndDate>offerStartDate)
    //   {
          
    //   }
     if(isId!==null)
     {
     if(isId==='Product')
     {
         if(productId===null)
         {
             return buildValidationResult(false, 'ProductID', 'Please enter ID of the Product you want to apply offer ');
         }
         else if(offerStartDate===null)
         {
              return buildValidationResult(false, 'StartDate', 'Please enter Start date for this offer ');
         }
          else if(offerEndDate===null)
         {
              return buildValidationResult(false, 'EndDate', 'Please enter End date for this offer ');
         }
          else if(discount===null)
         {
              return buildValidationResult(false, 'DiscountValue', 'Please enter discount for this product ');
         }
         else if(confirm===null){
             return buildValidationResult(false, 'Confirm', 'Are you sure you want to apply offer to this product?');
         }
     }
     else if(isId==='Category')
     {
         if(category===null)
         {
          return buildValidationResult(false, 'CName', 'Please select category of the product you want to apply offer');
         }
          else if(offerStartDate===null)
         {
              return buildValidationResult(false, 'StartDate', 'Please enter Start date for this offer ');
         }
          else if(offerEndDate===null)
         {
              return buildValidationResult(false, 'EndDate', 'Please enter End date for this offer ');
         }
          else if(discount===null)
         {
              return buildValidationResult(false, 'DiscountValue', 'Please enter discount for this product ');
         }
          else if(category!==null&&confirm===null){
             return buildValidationResult(false, 'Confirm', 'Are you sure you want to apply offer?');
         }
     }
     else if(isId==='Brand')
     {
         if(brand===null)
         {
          return buildValidationResult(false, 'Brand', 'Please enter brand of the product you want to apply offer');
         }
          else if(offerStartDate===null)
         {
              return buildValidationResult(false, 'StartDate', 'Please enter Start date for this offer ');
         }
          else if(offerEndDate===null)
         {
              return buildValidationResult(false, 'EndDate', 'Please enter End date for this offer ');
         }
          else if(discount===null)
         {
              return buildValidationResult(false, 'DiscountValue', 'Please enter discount for this product ');
         }
          else if(brand!==null&&confirm===null){
             return buildValidationResult(false, 'Confirm', 'Are you sure you want to apply offer?');
         }
     }
     
     
     }
     
   
     
     console.log('ValidationDeleteProduct completed');
      return buildValidationResult(true,null,null);
 }
 
 
 function ApplyOffers(intentRequest, callback)
 {
     
       const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     
     if(isAdmin.toString().trim()=="0")
     {
          callback(close(inputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` You are not auhtorized for this operation` }));
         return;
         
     }
    const isId=intentRequest.currentIntent.slots.Choice;
    const productID=intentRequest.currentIntent.slots.ProductID;
    const productCategory = intentRequest.currentIntent.slots.CName;
    const offerStartDate=intentRequest.currentIntent.slots.StartDate;
    const offerEndDate=intentRequest.currentIntent.slots.EndDate;
    const confirm=intentRequest.currentIntent.slots.Confirm;
     const pid=intentRequest.currentIntent.slots.PID;
    const brandName=intentRequest.currentIntent.slots.Brand;
     const discount=intentRequest.currentIntent.slots.DiscountValue;
    const source = intentRequest.invocationSource;
  
    console.log('In ApplyOffers');
    var AWS= require('aws-sdk');
   AWS.config.update({region:'us-east-1'});
   
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
     var docClient = new AWS.DynamoDB.DocumentClient();
var sleep = require('system-sleep');
var totalcount=0;
  console.log('Source '+source);
//   if(productcode!==undefined&&productcode!==null&&globalProductCost==='0')
//             GetProductDetails(productcode,callback);
            
   if(productCategory!==null&&productCategory!==undefined)
   {
                     var params = {
                                    TableName: "Products"
                                  };
                                
                               
                               docClient.scan(params, onScanCountProducts);
   
                              function onScanCountProducts(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                         
                                        data.Items.forEach(function(itemdata) {
                                            //sleep(100);
                                          if(itemdata.Category.toString().trim()==productCategory)
                                          {
                                             totalcount++;
                                             console.log('totalcount inside'+totalcount);
                                          }
                                           
                                        });
                                
                                        // continue scanning if we have more items
                                        if (typeof data.LastEvaluatedKey != "undefined") {
                                            console.log("Scanning for more...");
                                            params.ExclusiveStartKey = data.LastEvaluatedKey;
                                            docClient.scan(params, onScanCountProducts);
                                        }
                                    }
                                }
   }
     console.log('totalcount outside'+totalcount);
  console.log('Source '+source);

    if (source === 'DialogCodeHook') {
       
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
        const validationResult=ValidationApplyOffers(isId,productID,productCategory,brandName,confirm,pid,offerStartDate,offerEndDate,discount,intentRequest, callback);
        
       console.log('validationResult.violatedSlot'+validationResult.violatedSlot);
        if (!validationResult.isValid) {
             if(validationResult.violatedSlot!=='CName'&&validationResult.violatedSlot!=='PID')
             {
                 console.log('General elicit');
                    slots[`${validationResult.violatedSlot}`] = null;
                    callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                    return;
             }
             else if(validationResult.violatedSlot==='CName'){
                   slots[`${validationResult.violatedSlot}`] = null;
                 ShowCategories(validationResult,intentRequest, callback);
                 return;
             }
            //  else if(validationResult.violatedSlot==='PID'){
            //       slots[`${validationResult.violatedSlot}`] = null;
            //               var attachments = [];
            //                       var params = {
            //                         TableName: "Products"
            //                       };
                                
            //                     //var totalcount=0;
            //                   // docClient.scan(params, onScanCount);
                                
            //                     docClient.scan(params, onScan);
            //                     var count = 0;
                                  
            //                     function onScan(err, data) {
            //                         if (err) {
            //                             console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            //                         } else {        
            //                             console.log("Scan succeeded.");
                                         
            //                             data.Items.forEach(function(itemdata) {
            //                                 //sleep(2000);
            //                               if(itemdata.Category.toString()==productCategory)
            //                               {
            //                                 count++;
            //                               var ProductDesc=itemdata.Description;
            //                               var ProductCost=itemdata.Cost;
            //                               var link=itemdata.link;
            //                               var pid=itemdata.Id;
            //                           //  var obj={text: 'Buy', value:ProductDesc+'$'+ProductCost+'$'+link};
            //                               var obj={text: 'Delete', value:pid.toString()};
            //                             var buttons = [];
            //                             buttons.push(obj);
            //                             var obj=  {
            //                               title:ProductDesc,
            //                               subTitle:ProductCost,
            //                               imageUrl:link,
            //                               buttons:buttons
            //                              };
            //                               attachments.push(obj);
                                          
            //                               console.log('Inside Description:'+ ProductDesc);
            //                               console.log('Inside ProductCost:'+ ProductCost);
            //                               console.log('Inside link:'+ link);
            //                               console.log('totalcount:'+totalcount+'  count:'+count);
            //                                 if(totalcount==count)
            //                                 {
            //                                     console.log('Display products for deletion')
            //                                           callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
            //                                             intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Which Product would you like to apply offer` },
            //                                             buildResponseCardatt(attachments)));
                                                       
            //                                 }
            //                     }
                       
            //         });
            
            //         // continue scanning if we have more items
            //         if (typeof data.LastEvaluatedKey != "undefined") {
            //             console.log("Scanning for more...");
            //             params.ExclusiveStartKey = data.LastEvaluatedKey;
            //             docClient.scan(params, onScan);
            //         }
            //     }
            // }
            //          return; 
            //  }
        }

        
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
         console.log('delegate');
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }   
    
    
   console.log('Source:'+source);
    
    

  
                if(source !== 'DialogCodeHook' && confirm.toString().toLowerCase()==='yes'&& productCategory!==null){
                  
                     console.log('update  with productCategory  :'+productCategory);
                       
                        
                                var attachments = [];
                                  var paramsUpdateCategory = {
                                    TableName: "Products"
                                  };
                                
                                //var totalcount=0;
                               // docClient.scan(params, onScanCount);
                                
                                docClient.scan(paramsUpdateCategory, onScanProductCategory);
                                var count = 0;
                                
                              
                                
                                  
                                  
                                function onScanProductCategory(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                         
                                        data.Items.forEach(function(itemdata) {
                                            sleep(100);
                                          if(itemdata.Category.toString()==productCategory)
                                          {
                                            count++;
                                           var ProductDesc=itemdata.Description;
                                           var ProductCost=itemdata.Cost;
                                           var link=itemdata.link;
                                           var vpid=itemdata.Id;
                                           
                                           
                                     
                        console.log("Attempting a conditional update with params..");
                                         
                          var paramsUpdate = {
                                        TableName:"Products",
                                        Key:{
                                        "Id": {N:vpid.toString()}
                                        },
                                        UpdateExpression: "set IsOffer=:rss, OfferValidFrom = :r, OfferValidTill= :rs, Discount = :ds",
                                        ExpressionAttributeValues:{
                                        ":r": {S:offerStartDate},
                                        ":rs":{S:offerEndDate},
                                        ":ds":{N:discount},
                                        ":rss":{N:"1"}
                                        },
                                        ReturnValues:"UPDATED_NEW"
                                        };
                                
                                 ddb.updateItem(paramsUpdate, function (err, data) {
                            if (err) {
                              //  context.fail('FAIL:  Error updateItem from dynamodb - ' + err);
                                 console.log('FAIL:  Error updateItem from dynamodb - ' + err);
                            } else {
                                console.log("DEBUG:  updateItem worked. ");
                                                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                                            }
                                        });
                                       
                                       
                                       
                                            // if(totalcount==count)
                                            // {
                                            //     console.log('Display products for deletion')
                                            //           callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                            //             intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Which Product would you like to apply offer` },
                                            //             buildResponseCardatt(attachments)));
                                                       
                                            // }
                                }
                       
                    });
            
                    // continue scanning if we have more items
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        docClient.scan(params, onScanProductCategory);
                    }
                }
            }
                                         
                                         
                                         
                                         
                                           var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                          if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
                                          
                                           callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Offer applied to the product category successfully` }, buildResponseCardatt(attachments)));
                                          
                }
                else  if(source !== 'DialogCodeHook' && confirm.toString().toLowerCase()==='yes'&& brandName!==null){
                  
                     console.log('update  with productCategory  :'+productCategory);
                       
                        
                                var attachments = [];
                                  var paramsUpdateCategory = {
                                    TableName: "Products"
                                  };
                                
                                //var totalcount=0;
                               // docClient.scan(params, onScanCount);
                                
                                docClient.scan(paramsUpdateCategory, onScanProductCategory);
                                var count = 0;
                                
                              
                                
                                  
                                  
                                function onScanProductCategory(err, data) {
                                    if (err) {
                                        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                    } else {        
                                        console.log("Scan succeeded.");
                                         
                                        data.Items.forEach(function(itemdata) {
                                            sleep(100);
                                          if(itemdata.BrandName.toString()==brandName)
                                          {
                                            count++;
                                           var ProductDesc=itemdata.Description;
                                           var ProductCost=itemdata.Cost;
                                           var link=itemdata.link;
                                           var vpid=itemdata.Id;
                                           
                                           
                                     
                        console.log("Attempting a conditional update with params..");
                                         
                          var paramsUpdate = {
                                        TableName:"Products",
                                        Key:{
                                        "Id": {N:vpid.toString()}
                                        },
                                        UpdateExpression: "set IsOffer=:rss, OfferValidFrom = :r, OfferValidTill= :rs, Discount = :ds",
                                        ExpressionAttributeValues:{
                                        ":r": {S:offerStartDate},
                                        ":rs":{S:offerEndDate},
                                        ":ds":{N:discount},
                                        ":rss":{N:"1"}
                                        },
                                        ReturnValues:"UPDATED_NEW"
                                        };
                                
                                 ddb.updateItem(paramsUpdate, function (err, data) {
                            if (err) {
                              //  context.fail('FAIL:  Error updateItem from dynamodb - ' + err);
                                 console.log('FAIL:  Error updateItem from dynamodb - ' + err);
                            } else {
                                console.log("DEBUG:  updateItem worked. ");
                                                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                                            }
                                        });
                                       
                                       
                                       
                                            // if(totalcount==count)
                                            // {
                                            //     console.log('Display products for deletion')
                                            //           callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                            //             intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Which Product would you like to apply offer` },
                                            //             buildResponseCardatt(attachments)));
                                                       
                                            // }
                                }
                       
                    });
            
                    // continue scanning if we have more items
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        docClient.scan(params, onScanProductCategory);
                    }
                }
            }
                                         
                                         
                                         
                                         
                                           var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                           if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                                          
                                           callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: ` Offer applied to the product category successfully` }, buildResponseCardatt(attachments)));
                                          
                }
                else if(source !== 'DialogCodeHook' && confirm.toString().toLowerCase()==='yes'&& productCategory===null && (productID!==null || pid !==null))
                {
                    
                    console.log('update  with product id :'+productID+' pid:'+pid)
                    
                            // var AWS = require("aws-sdk");

                            //     AWS.config.update({
                            //     region: 'us-east-1',
                            //     maxRetries:1
                            //     });
                        
                           
                        var  pID='0';
                        
                       if(productID!==null)
                       pID=productID;
                       else
                       pID=pid;
                     
               
                      console.log('productID before update  :'+pID);
                        
                       
                        console.log("Attempting a conditional update with params..");
                      
                                
                                   var paramsUpdate = {
                                        TableName:"Products",
                                        Key:{
                                        "Id": {N:pID.toString()}
                                        },
                                        UpdateExpression: "set IsOffer=:rss, OfferValidFrom = :r, OfferValidTill= :rs, Discount = :ds",
                                        ExpressionAttributeValues:{
                                        ":r": {S:offerStartDate},
                                        ":rs":{S:offerEndDate},
                                        ":ds":{N:discount},
                                        ":rss":{N:"1"}
                                        },
                                        ReturnValues:"UPDATED_NEW"
                                        };
                                
                                 ddb.updateItem(paramsUpdate, function (err, data) {
                            if (err) {
                              //  context.fail('FAIL:  Error updateItem from dynamodb - ' + err);
                                 console.log('FAIL:  Error updateItem from dynamodb - ' + err);
                            } else {
                                console.log("DEBUG:  updateItem worked. ");
                               // context.succeed(data);
                               
                                  var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                          if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
       
                                          
                                          callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: `Offer applied to the product successfully` }, buildResponseCardatt(attachments)));
                               
                               
                               
                            }
                        });
                                
                               
                                    
                                        console.log("Updating the item...");
                                        
                                 
                }
                 else if(source !== 'DialogCodeHook' && confirm.toString().toLowerCase()==='no')
                {
                    
                    console.log('update  with product id :'+productID+' pid:'+pid)
                    
                            // var AWS = require("aws-sdk");

                            //     AWS.config.update({
                            //     region: 'us-east-1',
                            //     maxRetries:1
                            //     });
                        
                           
                        var  pID='0';
                        
                       if(productID!==null)
                       pID=productID;
                       else
                       pID=pid;
                     
               
                      console.log('productID before update  :'+pID);
                        
                       
                        console.log("Attempting a conditional update with params..");
                      
                                
                                     var buttons = [];
                                        var buttons2 = [];
                                      var attachments=[];
      
                                            var obj={text: 'Add Cloth Category', value:'ClothCategory'};
                                              buttons.push(obj);
                                              
                                         var obj={text: 'Add Products', value:'Product Addition'};
                                              buttons.push(obj);
      
                                         var obj={text: 'Delete Products', value:'Product Deletion'};
                                             buttons.push(obj);
    
                                         var obj={text: 'Apply Offers', value:'offer'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Update Order Status', value:'Update Order Status'};
                                            buttons.push(obj);
                                            
                                             var obj={text: 'Show Feedbacks', value:'Show Feedbacks'};
                                            buttons2.push(obj);
      
                                       
      
    
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
         
      attachments.push(obj);
      
        var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
         
      attachments.push(obj2);
                                          
                                             const outputSessionAttributes = intentRequest.sessionAttributes || {};
                                          if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
       
                                          
                                          callback(closeWithCard(outputSessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: `Apply offer process cancelled!` }, buildResponseCardatt(attachments)));
                                
                               
                                    }
                
 }
 
 function ShowOffersToday(intentRequest, callback)
 {
     
   const source = intentRequest.invocationSource; 
       var AWS= require('aws-sdk');
   AWS.config.update({region:'us-east-1'});
   var sleep = require('system-sleep');
 var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
     var docClient = new AWS.DynamoDB.DocumentClient();
       const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
     var totalcount=0;
      var attachments = [];
  var params = {
    TableName: "Products"
  };
 var validationResult= buildValidationResult(false, 'ProductCode', 'Todays offers');
docClient.scan(params, onScanCount);
   console.log("source:"+source);
   if(source==='DialogCodeHook'){
      console.log('Validated sucessfully');
        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
         console.log('delegate');
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
  
 //  var sleep = require('system-sleep');
 


//docClient.scan(params, onScanCount);


var count = 0;


console.log('validationResult.violatedslot : '+validationResult.violatedSlot);

function onScanCount(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded.");
         
        data.Items.forEach(function(itemdata) {
            sleep(100);
            console.log('itemdata.IsOffer'+itemdata.IsOffer);
            
          if(parseInt(itemdata.IsOffer)===1 )
          {
             
             console.log('itemdata.OfferValidFrom'+itemdata.OfferValidFrom);
              console.log('itemdata.OfferValidTill'+itemdata.OfferValidTill);
  
        //   var offerdatefrom=  new Date(itemdata.OfferValidFrom)
        //     var offerdateTill=  new Date(itemdata.OfferValidTill)
        //   var todaysdate= new Date();
           
              if (parseLocalDate(itemdata.OfferValidFrom) <= new Date()&&parseLocalDate(itemdata.OfferValidTill) >= new Date())
            {
                console.log('totalcount'+totalcount);
               totalcount++; 
            }
          }
           
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScanCount);
        }
    }
}

var count=0;
  console.log('totalcount outside'+totalcount);
 
  sleep(500);
 docClient.scan(params, onScanItems); 
function onScanItems(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log("Scan succeeded.");
         
        data.Items.forEach(function(itemdata) {
            
           
            if(parseInt(itemdata.IsOffer)===1 )
            {
             

                      var offerdatefrom=  parseLocalDate(itemdata.OfferValidFrom);
                        var offerdateTill= parseLocalDate(itemdata.OfferValidTill)
                      var todaysdate= new Date();
                       
                        console.log('offerdatefrom:'+offerdatefrom);
                        console.log('offerdateTill:'+offerdateTill);
                        console.log('todaysdate:'+todaysdate);
                        
                        if (parseLocalDate(itemdata.OfferValidFrom) <= new Date()&&parseLocalDate(itemdata.OfferValidTill) >= new Date())
                        {
                                        count++;
                                   var ProductDesc=itemdata.Description;
                                   var ProductCost=itemdata.Cost;
                                   var link=itemdata.link;
                              
                               //  var obj={text: 'Buy', value:ProductDesc+'$'+ProductCost+'$'+link};
                                  var obj={text: 'Buy', value:"Buy Product "+itemdata.Id};
                                var buttons = [];
                                buttons.push(obj);
                                var st=ProductCost-(ProductCost*itemdata.Discount/100);
                                var obj=  {
                                  title:ProductDesc,
                                  subTitle:st.toString()+ ' Discount of '+itemdata.Discount+ '% applied' ,
                                  imageUrl:link,
                                  buttons:buttons
                                 };
                                  attachments.push(obj);
                                  
                                   console.log('Inside Description:'+ ProductDesc);
                                   console.log('Inside ProductCost:'+ ProductCost);
                                   console.log('Inside link:'+ link);
                                   console.log('totalcount:'+totalcount+' Count:'+count);
                                    sleep(1000);
                                    if(totalcount==count)
                                    {
                                               callback(elicitResSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
                                                intentRequest.currentIntent.slots, validationResult.violatedSlot,  { contentType: 'PlainText', content: `Today's offers` },
                                                buildResponseCardatt(attachments)));
                                    }
                      }
          }
            
            
            //sleep(2000);
         
           
        });

        // continue scanning if we have more items
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScanItems);
        }
    }
}
     
 }
 
 
function TrackOrder(intentRequest,callback)
{
  
   var AWS = require('aws-sdk');
   AWS.config.update({
    region: 'us-east-1',
    maxRetries:1
    });
  var ddb = new AWS.DynamoDB({
            region: 'us-east-1',
            maxRetries: 1
          });
   var docClient = new AWS.DynamoDB.DocumentClient();
   
   //var sleep = require('system-sleep');
    const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
  
    const orderID=intentRequest.currentIntent.slots.ProductID;
  
    const source = intentRequest.invocationSource;
    // var orderId=0;
    // var processType='T';//T means Track order C means Cancel order and R means Replace order 
   if (source === 'DialogCodeHook') {

        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      // if (flowerType) {
      ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
      // }
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
    
     if (source !== 'DialogCodeHook') {
         // if(processType==='T')
        {
                  var params = {
                                       TableName: 'Orders',
                                       Key: {
                                                'ID' : {N: orderID.toString()},
                                            }
                               };
                               
                                ddb.getItem(params, function(err, data) {
                                      if (err) {
                                        console.log("Error", err);
                                      } else {   
                                          
                                         var status= data.Item.OrderStatus
                                         
                                         var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
                                         
                                         
                                         var outsessionAttributes=intentRequest.sessionAttributes;//||{};
                                          outsessionAttributes.MobileNumber=mobilenumber;
                                           outsessionAttributes.IsAdmin=isAdmin;
                                         
                                          callback(closeWithCard(outsessionAttributes, 'Fulfilled',
                                         { contentType: 'PlainText', content: 'You Order ID:'+orderID+' Status is: '+data.Item.OrderStatus.S +' and DeliveryDate: '+data.Item.DeliveryDate.S }, buildResponseCardatt(attachments)));
                                         
                                      }
                                });
                                  
        }
     }
    
    
    
}

function ValidationRC(orderID,reason,confirm,type,intentRequest,callback)
{
    if(orderID===null)
    {
          return buildValidationResult(false, 'ProductID', 'Please enter ID of the Product you want to apply offer ');
    }
    
    if(reason===null)
    {
         return buildValidationResult(false, 'ReasonDesc', 'Please enter reason for '+type);
    }
    
    if(confirm===null)
    {
         return buildValidationResult(false, 'Confirm', 'Do you want to continue for '+type);
    }
    
      return buildValidationResult(true, null,null);
}

function CancelOrder(intentRequest,callback)
{
      var AWS = require('aws-sdk');
   AWS.config.update({
    region: 'us-east-1',
    maxRetries:1
    });
  var ddb = new AWS.DynamoDB({
            region: 'us-east-1',
            maxRetries: 1
          });
   var docClient = new AWS.DynamoDB.DocumentClient();
   
   //var sleep = require('system-sleep');
      const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
  
    const orderID=intentRequest.currentIntent.slots.ProductID;
    const reason=intentRequest.currentIntent.slots.ReasonDesc;
    const confirm=intentRequest.currentIntent.slots.Confirm;
    const source = intentRequest.invocationSource;
    // var orderId=0;
    // var processType='T';//T means Track order C means Cancel order and R means Replace order 
   if (source === 'DialogCodeHook') {
       
       
       
          const slots = intentRequest.currentIntent.slots;
         console.log('productcode:'+orderID);
        const validationResult = ValidationRC(orderID,reason,confirm,'Cancelling',intentRequest,callback);
        if (!validationResult.isValid) {
            console.log('violated slot'+validationResult.violatedSlot);
            // slots[`${validationResult.violatedSlot}`] = null;
            // callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            // return;
            // if(validationResult.violatedSlot!=='PCode')
            // {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
            //}
       
        }

        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      // if (flowerType) {
      ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
      // }
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
    
     if (source !== 'DialogCodeHook' &&confirm.toString().trim()==='yes') {
        // if(processType==='C')
        {
                var params = {
                TableName:"Orders",
                Key:{
                "ID": {N:orderID.toString()}
                },
                UpdateExpression: "set ToCancel = :r, Reason= :rs, OrderStatus=:st",
                ExpressionAttributeValues:{
                ":r": {N:"1"},
                ":rs":{S:reason},
                ":st":{S:"CancelRequested"}
                },
                ReturnValues:"UPDATED_NEW"
                };
            
                console.log("Updating the item...");
                
                ddb.updateItem(params, function(err, data) {
                    if (err) {
                        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                        
                        var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
                         
                         
                         var outsessionAttributes=intentRequest.sessionAttributes;//||{};
                          outsessionAttributes.MobileNumber=mobilenumber;
                          outsessionAttributes.IsAdmin=isAdmin;
                         
                          callback(closeWithCard(outsessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: 'You Cancel Request for Order ID:'+orderID+' updated successfully!' }, buildResponseCardatt(attachments)));
                        
                        
                        
                        
                    }
                });

        }
     }
    
    
}

function ReplaceOrder(intentRequest,callback)
{
      var AWS = require('aws-sdk');
   AWS.config.update({
    region: 'us-east-1',
    maxRetries:1
    });
  var ddb = new AWS.DynamoDB({
            region: 'us-east-1',
            maxRetries: 1
          });
   var docClient = new AWS.DynamoDB.DocumentClient();
   
   //var sleep = require('system-sleep');
   const inputSessionAttributes = intentRequest.sessionAttributes || {};
     mobilenumber = inputSessionAttributes.MobileNumber;
     isAdmin= inputSessionAttributes.IsAdmin;
      if(mobilenumber===null||mobilenumber===undefined)
     {
         ShowDashBoard(intentRequest, callback);
         return;
     }
  
    const orderID=intentRequest.currentIntent.slots.ProductID;
    const reason=intentRequest.currentIntent.slots.ReasonDesc;
    const confirm=intentRequest.currentIntent.slots.Confirm;
    const source = intentRequest.invocationSource;
    // var orderId=0;
    // var processType='T';//T means Track order C means Cancel order and R means Replace order 
   if (source === 'DialogCodeHook') {
       
       
       
          const slots = intentRequest.currentIntent.slots;
         console.log('productcode:'+orderID);
        const validationResult = ValidationRC(orderID,reason,confirm,'Replacement',intentRequest,callback);
        if (!validationResult.isValid) {
            console.log('violated slot'+validationResult.violatedSlot);
            // slots[`${validationResult.violatedSlot}`] = null;
            // callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            // return;
            // if(validationResult.violatedSlot!=='PCode')
            // {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
            //}
       
        }

        // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
      const outputSessionAttributes = intentRequest.sessionAttributes || {};
      // if (flowerType) {
      ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
      // }
       if (mobilenumber) {
          outputSessionAttributes.MobileNumber = mobilenumber; 
          outputSessionAttributes.IsAdmin = isAdmin; 
       }
        callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
        return;
    }
    
    
     if (source !== 'DialogCodeHook'&&confirm.toString().trim()==='yes') {
         {
             var params = {
                TableName:"Orders",
                Key:{
                "ID": {N:orderID.toString()}
                },
                UpdateExpression: "set ToReplace = :r, Reason= :rs, OrderStatus= :st",
                ExpressionAttributeValues:{
                ":r": {N:"1"},
                ":rs":{S:reason},
                ":st":{S:"ReplaceRequested"}
                },
                ReturnValues:"UPDATED_NEW"
                };
            
                console.log("Updating the item...");
                
                ddb.updateItem(params, function(err, data) {
                    if (err) {
                        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                        
                          var buttons = [];
       var buttons2 = [];
      var attachments=[];
      
      var obj={text: 'Show Offers', value:'Show offers today'};
      buttons.push(obj);
      
      var obj={text: 'Buy Product', value:'Product'};
      buttons.push(obj);
      
      var obj={text: 'Show Fresh Arrivals', value:'Arrivals'};
      buttons.push(obj);
    
      var obj={text: 'View Wishlist', value:'Wishlist'};
      buttons.push(obj);
      
      var obj={text: 'View Purchase History', value:'History'};
      buttons.push(obj);
      
      var obj={text: 'Manage Profile', value:'Profile'};
      buttons2.push(obj);
       
        var obj=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons
         };
          attachments.push(obj);
          var obj2=  {
          title:'What would you like to do?',
          subTitle:' ',
          buttons:buttons2
         };
      attachments.push(obj2);
                         
                         
                         var outsessionAttributes=intentRequest.sessionAttributes;//||{};
                          outsessionAttributes.MobileNumber=mobilenumber;
                           outsessionAttributes.IsAdmin=isAdmin;
                         
                          callback(closeWithCard(outsessionAttributes, 'Fulfilled',
                         { contentType: 'PlainText', content: 'You Replace Request for Order ID:'+orderID+' updated successfully!' }, buildResponseCardatt(attachments)));
                                }
                });
        }
     }
    
    
}



////////Siva code starts here

function ShowWishList(intentRequest,callback)
{
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
        var AWS= require('aws-sdk');
        //AWS.config.update({region:'us-west-2'});
        var ddb = new AWS.DynamoDB({
        region: 'us-east-1',
        maxRetries: 1
        });
        
         var paramsInsert={
                  TableName: "WishList"
                };
                ddb.scan(paramsInsert, function(err,datas){
                    if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        var attachments=[];
                        datas.Items.forEach(function(Item){
                            var addeduser = JSON.parse(JSON.stringify({"Pinc" : Item.AddedBy}))["Pinc"].S;
                            console.log(addeduser == intentRequest.sessionAttributes.MobileNumber);
                            if(addeduser == intentRequest.sessionAttributes.MobileNumber)
                            {
                                var title = JSON.parse(JSON.stringify({"Pinc" : Item.Description}))["Pinc"].S;
                                var sub = JSON.parse(JSON.stringify({"Pinc" : Item.Cost}))["Pinc"].S;
                                var image = JSON.parse(JSON.stringify({"Pinc" : Item.link}))["Pinc"].S;
                                var buttons =[];
                                var obj = {text: 'Buy', value:'Buy Product '+JSON.parse(JSON.stringify({"Pinc" : Item.PrCode}))["Pinc"].N};
                                buttons.push(obj);
                                var obj1 = {text: 'Remove From Wishlist', value:'Remove Wished '+JSON.parse(JSON.stringify({"Pinc" : Item.PrCode}))["Pinc"].N};
                                buttons.push(obj1);
                                
                                
                                obj=  {
                                  title:title,
                                  subTitle:sub,
                                  buttons:buttons,
                                  imageUrl:image
                                 };
                                 attachments.push(obj);
                            }
                        });
                        
                        if(attachments.length>0)
                            {
                                callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: `Items in WishList are` }, buildResponseCardatt(attachments)));
                            }
                            else
                            {
                                callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'No Items in your wishList'}));
                            }
                            
                    }
                });
        
    }
    else
    {
        //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Please Login First'}));
        ShowDashBoard(intentRequest,callback,'Please Login First');
    }
}


function FindStore(intentRequest, callback)
{
    var AWS= require('aws-sdk');
 var sleep = require('system-sleep');
     var docClient = new AWS.DynamoDB({
        region: 'us-east-1',
        maxRetries: 1
      });
      
      var params = {
        TableName: "Stores"
      };
      
     docClient.scan(params, function(err,data){
        if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log(data.Items);
             var pin="";
              var attachments=[];
             data.Items.forEach(function(itemdata) {
             //  sleep(100);
            if((JSON.parse(JSON.stringify({"Pinc" : itemdata.Pincode}))["Pinc"].N).toString() == intentRequest.currentIntent.slots.StorePin)
            {
              var   storename =JSON.parse(JSON.stringify({"Pinc" : itemdata.StoreName}))["Pinc"].S;
              var   storeaddr =JSON.parse(JSON.stringify({"Pinc" : itemdata.StoreAddr}))["Pinc"].S;
                var   storephn =JSON.parse(JSON.stringify({"Pinc" : itemdata.StorePhone}))["Pinc"].N;
                
                                      //var buttons = [];
       
                                            var obj=  {
                                              title:storename,
                                              subTitle:storeaddr+' Phone Number: '+storephn
                                             };
                                             
                                          attachments.push(obj);
                                          
            }
            });
            
            callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: `Available Stores are` }, buildResponseCardatt(attachments)));
    
           //  callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: `${pin}`}));
        }
     }
    );
 

//   function onScanRowCount(err, data) {
//     if (err) {
//         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {        
//         console.log("Count Scan succeeded.");
//           console.log('totalcnt: title'+title);
//          console.log('totalcnt: productDescription'+productDescription);
//          console.log('totalcnt: productCost'+productCost);
//          console.log('totalcnt: quantity'+quantity);
//         data.Items.forEach(function(itemdata) {
//              var category=itemdata.Category;
             
       
//          console.log('totalcnt:'+totalcnt++);
//          inputSessionAttributes.ProductID=totalcnt;
//         });

//         // continue scanning if we have more items
//         if (typeof data.LastEvaluatedKey != "undefined") {
//             console.log("Scanning for more...");
//             params.ExclusiveStartKey = data.LastEvaluatedKey;
//             docClient.scan(params, onScanRowCount);
//         }
//     }
// }
}


function AddStore(intentRequest,callback){
   // var sleep = require('system-sleep');
    var Pincode = intentRequest.currentIntent.slots.Pincode;
    var StoreName = intentRequest.currentIntent.slots.StoreName;
    var StoreAddr = intentRequest.currentIntent.slots.StoreAddr;
    var StorePhone= intentRequest.currentIntent.slots.StorePhone;
   // var countpl=0;
    var AWS= require('aws-sdk');
    var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
    });
    var paramsInsert={
      TableName: "Stores"
    }
    
    ddb.scan(paramsInsert, function(err,data){
        if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          
        // sleep(500);
         // countpl=parseInt(countpl)+1;
            var paramsInsert={
                  TableName: "Stores",
                  Item:{
                      id:{S:(data.ScannedCount+1).toString()},
                      Pincode:{N:Pincode.toString()},
                      StoreName:{S:StoreName},
                      StoreAddr:{S:StoreAddr.toString()},
                      StorePhone:{N:StorePhone.toString()}
                  }
                };
                ddb.putItem(paramsInsert,callback);
        }
    });
    console.log(paramsInsert);
 
    callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: `Store Added Successfully`}));
}
    
    
    
    


function ValidateSubscribe(isAuthenticated,mobilenumber,password,wannasubscribe,intentRequest,callback)
{
    if(isAuthenticated==0){
        if(mobilenumber===null)
        {
            return buildValidationResult(false, 'MobileNumber', 'You are not Signed In .Please enter your registered mobilenumber');
        }
        
        if(password===null)
        {
            return buildValidationResult(false, 'Password', 'Please enter your password');
        }
        
    }
    else{
        if(wannasubscribe===null)
        {
            return buildValidationResult(false, 'WannaSubscribe', 'Are you sure to subscribe for fresh arrival alerts');
        }
    }
     
     return buildValidationResult(true,null,null);
}

function Subscribe(intentRequest,callback){
    
    var password = intentRequest.currentIntent.slots.Password;
    var wannasubscribe = intentRequest.currentIntent.slots.WannaSubscribe;
    var mobilenumber=intentRequest.currentIntent.slots.MobileNumber;
    var isAuthenticated=0;
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
    //     // Pass the price of the flowers back through session attributes to be used in various prompts defined on the bot model.
    //   const outputSessionAttributes = intentRequest.sessionAttributes || {};
    //   // if (flowerType) {
    //   ///     outputSessionAttributes.Price = flowerType.length * 5; // Elegant pricing model
    //   // }
    //     callback(delegate(outputSessionAttributes, intentRequest.currentIntent.slots));
    //     return;
   // }
         isAuthenticated=1;
       const slots = intentRequest.currentIntent.slots;
       const validationResult = ValidateSubscribe(isAuthenticated,"","",wannasubscribe);
       console.log(intentRequest.sessionAttributes);
        // const validationResult = ValidateMobileNumber(mobilenumber,password,wannasubscribe,intentRequest,callback);
        if (!validationResult.isValid) {
            slots[`${validationResult.violatedSlot}`] = null;
            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
            return;
        }
        
        console.log(intentRequest.currentIntent.slots);
        
        if(wannasubscribe=='Yes')
        {
            var AWS = require("aws-sdk");
    
            AWS.config.update({
            region: 'us-east-1',
            maxRetries:1
            });
    
            var docClient = new AWS.DynamoDB.DocumentClient();
                
            var params = {
            TableName:"User",
            Key:{
            "MobileNumber": intentRequest.sessionAttributes.MobileNumber
            },
            UpdateExpression: "set IsSubscribed = :r",
            ExpressionAttributeValues:{
            ":r": "1"
            },
            ReturnValues:"UPDATED_NEW"
            };
        
            console.log("Updating the item...");
            
            docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                }
            });
            
            callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'You are Subscribed for Fresh Arrivals.'}));
            // callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Had Session'}));
        }
        else
        {
            callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Thanks for using our app!'}));
        }
        
    }
    else
    {
        isAuthenticated=0;
        //   if (source === 'DialogCodeHook') {
        // Perform basic validation on the supplied input slots.  Use the elicitSlot dialog action to re-prompt for the first violation detected.
        const slots = intentRequest.currentIntent.slots;
        if(mobilenumber!=null)
        {
            
            var AWS = require('aws-sdk');
            var ddb = new AWS.DynamoDB();
        
            var params = {
              TableName: 'User',
              Key: {
                'MobileNumber' : {S: mobilenumber.toString()},
              }
            };
            ddb.getItem(params, function(err, data)
            {
              if (err) {
                callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Wrong Mobile Number. Please try again!!'}));
                } else {
                  if((data.Item)==null)
                    {
                    callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Wrong Mobile Number. Please try again!!'}));
                    }
                     else
                     {
                        const validationResult = ValidateSubscribe(isAuthenticated,mobilenumber,password,wannasubscribe,intentRequest,callback);
                        if (!validationResult.isValid) {
                            slots[`${validationResult.violatedSlot}`] = null;
                            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                            return;
                        }
                        else
                        {
                            var AWS = require('aws-sdk');
                            var ddb = new AWS.DynamoDB();
                        
                            var params = {
                              TableName: 'User',
                              Key: {
                                'MobileNumber' : {S: mobilenumber.toString()},
                              }
                            };
                            ddb.getItem(params, function(err, data) {
                              if (err) {
                                callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Wrong Mobile Number. Please try again!!'}));
                              } else {
                                  if((data.Item)==null)
                                    {
                                    callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Wrong Mobile Number. Please try again!!'}));
                                    }
                                    else
                                    {
                                        console.log(data.Item);
                                        if(JSON.parse(JSON.stringify({"Pinc" : data.Item.Password}))["Pinc"].S == password)
                                        {
                                            intentRequest.sessionAttributes.MobileNumber=mobilenumber;
                                            console.log(intentRequest.sessionAttributes);
                                            Subscribe(intentRequest,callback);
                                        }
                                        else{
                                            console.log(intentRequest.currentIntent.slots);
                                            //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Problem with your entered Credentials. Please Start Over!!'}));
                                            ShowDashBoard(intentRequest,callback,'Problem with your entered Credentials. Please Start Over!!');
                                        }
                                    }
                                }
                            });
                        }
                     }
                }
              });
        }
        else
        {
            const validationResult = ValidateSubscribe(isAuthenticated,mobilenumber,password,wannasubscribe,intentRequest,callback);
                       
                            slots[`${validationResult.violatedSlot}`] = null;
                            callback(elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
                            return;
                        
        }
    }
}



function ShowFreshArrivals(intentRequest,callback)
{
    //var sleep = require('system-sleep');
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
        
        var AWS = require('aws-sdk');
        var ddb = new AWS.DynamoDB();
        
        
        var params = {
          TableName: 'User',
          Key: {
            'MobileNumber' : {S: intentRequest.sessionAttributes.MobileNumber.toString()}
          }
        };
        
        ddb.getItem(params, function(err, itemdata) {
          if (err) {
            console.log("Error", err);
          } else {
                var SubscribStat = (JSON.parse(JSON.stringify({"Pinc" : itemdata.Item.IsSubscribed}))["Pinc"].S).toString();
                if(SubscribStat=='1')
                {
                    var attachments = [];
                    var params = {
                      TableName: 'Products'
                      };
                    ddb.scan(params,function(err,data){
                        if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                        } else {        
                            console.log("Scan succeeded.");
                             
                            data.Items.forEach(function(itemdata) {
                                //sleep(100);
                                var Createdate = (JSON.parse(JSON.stringify({"Pinc" : itemdata.CreatedDate}))["Pinc"].S).toString();
                                var sec = Date.parse(Createdate);
                                var last = new Date();
                                last.setTime(sec);
                                var today = new Date();
                              
                                if(Math.floor((today-last)/86400000) < 7)
                                {
                                    var ProductDesc =JSON.parse(JSON.stringify({"Pinc" : itemdata.Description}))["Pinc"].S;
                                    var ProductCost =JSON.parse(JSON.stringify({"Pinc" : itemdata.Cost}))["Pinc"].N;
                                    var link=JSON.parse(JSON.stringify({"Pinc" : itemdata.link}))["Pinc"].S;
                                    var Pcode=JSON.parse(JSON.stringify({"Pinc" : itemdata.Id}))["Pinc"].N;
                                     
                                      var obj={text: 'Buy', value:'Buy Product '+ Pcode};
                                    var buttons = [];
                                    buttons.push(obj);
                                    var obj2={text: 'Add to WishList', value:'Add to Wish '+Pcode};
                                    buttons.push(obj2);
                                    var obj3=  {
                                      title:ProductDesc,
                                      subTitle:ProductCost,
                                      imageUrl:link,
                                      buttons:buttons
                                     };
                                      attachments.push(obj3);
                                }
                            });
                            if(attachments.length>0)
                            {
                               // console.log(attachments);
                               callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: `Fresh arrivals` }, buildResponseCardatt(attachments)));
                            }
                            else
                            {
                                callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'No Freshly Added Products'}));
                            }
                        }
                    });
                }
                else
                {
                    callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'You are not Subscribed for Fresh Arrivals'}));
                }
          }
        });
        
    }
    else
    {
        //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Please Login First'}));
        ShowDashBoard(intentRequest,callback,'Please Login First');
    }
}


function Download(intentRequest,callback)
{
    // var attachments=[];
    // var obj=  {
    //   attachmentLinkUrl:'https://s3.amazonaws.com/fabricstoreimages/Blue_Tshirt.jpg',
    //   title:'Click to Download',
    //   buttons:
    //   [{
    //       'text':'Click',
    //       'value':'https://s3.amazonaws.com/fabricstoreimages/Blue_Tshirt.jpg'
    //   }]
    //  };
    //  attachments.push(obj);
    // callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Download Here' }, buildResponseCardatt(attachments)));  
    
    callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'https://s3.amazonaws.com/fabricstoreimages/sample.pdf'}));

}



function ShowProd(intentRequest,callback)
{
    //var sleep = require('system-sleep');
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
        var Brand= intentRequest.currentIntent.slots.Brand;
        var Gender = intentRequest.currentIntent.slots.Gender;
        
        var AWS = require('aws-sdk');
        var ddb = new AWS.DynamoDB();
        var attachments = [];
                    var params = {
                      TableName: 'Products'
                      };
                    ddb.scan(params,function(err,data){
                        if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                        } else {        
                            console.log("Scan succeeded.");
                             
                            data.Items.forEach(function(itemdata) {
                                //sleep(100);
                                console.log(itemdata);
                                var brand = (JSON.parse(JSON.stringify({"Pinc" : itemdata.BrandName}))["Pinc"].S).toString();
                                var category = (JSON.parse(JSON.stringify({"Pinc" : itemdata.Category}))["Pinc"].S).toString();
                                
                                if(Brand.toLowerCase()==brand.toLowerCase() && category.toLowerCase()==Gender.toLowerCase())
                                {
                                    var ProductDesc =JSON.parse(JSON.stringify({"Pinc" : itemdata.Description}))["Pinc"].S;
                                    var ProductCost =JSON.parse(JSON.stringify({"Pinc" : itemdata.Cost}))["Pinc"].N;
                                    var link=JSON.parse(JSON.stringify({"Pinc" : itemdata.link}))["Pinc"].S;
                                      var Pcode=JSON.parse(JSON.stringify({"Pinc" : itemdata.Id}))["Pinc"].N;
                                      var obj={text: 'Buy', value:'Buy Product '+Pcode};
                                    var buttons = [];
                                    buttons.push(obj);
                                    var obj=  {
                                      title:brand+'-'+ProductDesc,
                                      subTitle:ProductCost,
                                      imageUrl:link,
                                      buttons:buttons
                                     };
                                      attachments.push(obj);
                                }
                            });
                            if(attachments.length>0)
                            {
                               // console.log(attachments);
                               callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',
     { contentType: 'PlainText', content: `Categorized Items` }, buildResponseCardatt(attachments)));
                            }
                            else
                            {
                                callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'No Products from Selected Category'}));
                            }
                        }
                    });
    }
    else
    {
        //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Please Login First'}));
        ShowDashBoard(intentRequest,callback,'Please Login First');
    }
    
}



function AddtoWish(intentRequest,callback)
{
    //var sleep = require('system-sleep');
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
        var PrCode = intentRequest.currentIntent.slots.PrCode;
        var AWS= require('aws-sdk');
    //AWS.config.update({region:'us-west-2'});
    var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
  });
  
  var params = {
          TableName: 'Products',
          Key: {
            'Id' : {N: PrCode.toString()},
          }
        };
        ddb.getItem(params, function(err, data)
        {
            if(err)
            {
                callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'There is a problem in adding to Database'}));
            }
            else
            {
              var paramsInsert={
                  TableName: "WishList"
                };
                ddb.scan(paramsInsert, function(err,datas){
                    if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        
                        var check = [];
                        datas.Items.forEach(function(Item){
                            //sleep(100);
                            var addeduser = JSON.parse(JSON.stringify({"Pinc" : Item.AddedBy}))["Pinc"].S;
                            var itemcode = JSON.parse(JSON.stringify({"Pinc" : Item.PrCode}))["Pinc"].N;
                            console.log(addeduser == intentRequest.sessionAttributes.MobileNumber && itemcode == PrCode);
                            if(addeduser == intentRequest.sessionAttributes.MobileNumber && itemcode== PrCode)
                                check.push(Item);
                        });
                        console.log(check);
                        if(check.length>0)
                            {
                                callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Item already in WishList'}));
                            }
                            else
                            {
                                var paramsInserts={
                              TableName: "WishList",
                              Item:{
                                  AddedBy:{S:intentRequest.sessionAttributes.MobileNumber},
                                  PrCode:{N:PrCode.toString()},
                                  Id:{N:(intentRequest.sessionAttributes.MobileNumber+PrCode).toString()},
                                  Brand:{S:JSON.parse(JSON.stringify({"Pinc" : data.Item.BrandName}))["Pinc"].S},
                                  Category:{S:JSON.parse(JSON.stringify({"Pinc" : data.Item.Category}))["Pinc"].S},
                                  Cost:{N:JSON.parse(JSON.stringify({"Pinc" : data.Item.Cost}))["Pinc"].N},
                                  CreatedDate:{S:JSON.parse(JSON.stringify({"Pinc" : data.Item.CreatedDate}))["Pinc"].S},
                                  Description:{S:JSON.parse(JSON.stringify({"Pinc" : data.Item.Description}))["Pinc"].S},
                                  link:{S:JSON.parse(JSON.stringify({"Pinc" : data.Item.link}))["Pinc"].S},
                                  Name:{S:JSON.parse(JSON.stringify({"Pinc" : data.Item.Name}))["Pinc"].S},
                                  Quantity:{S:JSON.parse(JSON.stringify({"Pinc" : data.Item.Quantity}))["Pinc"].S},
                                  ReplaceDays:{N:JSON.parse(JSON.stringify({"Pinc" : data.Item.ReplaceDays}))["Pinc"].N}
                                  
                              }
                            };
                            
                            console.log('paramsInserts'+JSON.stringify(paramsInserts.Item));
                        ddb.putItem(paramsInserts,callback);  
                        callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Added to WishList'}));
                            }
                    }
                });
                    }
                });
            }
    else
    {
        //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Please Login First'}));
        ShowDashBoard(intentRequest,callback,'Please Login First');
    }
    
}

function RemoveWished(intentRequest,callback)
{
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
        var PrCode = intentRequest.currentIntent.slots.PrCode;
        var AWS= require('aws-sdk');
        //AWS.config.update({region:'us-west-2'});
        AWS.config.update({
          region: "us-east-1"
        });
        
        var ddb=new AWS.DynamoDB.DocumentClient();
        
        var paramsDelete={
                 TableName: "WishList",
                 Key:
                 {
                     "Id":parseInt(intentRequest.sessionAttributes.MobileNumber+PrCode)
                 }
               };
              
               ddb.delete(paramsDelete, function(err, data) {
                   if (err) {
                   console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                   } else {
                       
                                var AWS= require('aws-sdk');
                                //AWS.config.update({region:'us-west-2'});
                                var ddb = new AWS.DynamoDB({
                                region: 'us-east-1',
                                maxRetries: 1
                                });
                                
                                 var paramsInsert={
                                          TableName: "WishList"
                                        };
                                        ddb.scan(paramsInsert, function(err,datas){
                                            if (err) {
                                            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                                            } else {
                                                var attachments=[];
                                                datas.Items.forEach(function(Item){
                                                    var addeduser = JSON.parse(JSON.stringify({"Pinc" : Item.AddedBy}))["Pinc"].S;
                                                    console.log(addeduser == intentRequest.sessionAttributes.MobileNumber);
                                                    if(addeduser == intentRequest.sessionAttributes.MobileNumber)
                                                    {
                                                        var title = JSON.parse(JSON.stringify({"Pinc" : Item.Description}))["Pinc"].S;
                                                        var sub = JSON.parse(JSON.stringify({"Pinc" : Item.Cost}))["Pinc"].S;
                                                        var image = JSON.parse(JSON.stringify({"Pinc" : Item.link}))["Pinc"].S;
                                                        var buttons =[];
                                                        var obj = {text: 'Buy', value:'Buy Product '+JSON.parse(JSON.stringify({"Pinc" : Item.PrCode}))["Pinc"].N};
                                                        buttons.push(obj);
                                                        var obj1 = {text: 'Remove From Wishlist', value:'Remove Wished '+JSON.parse(JSON.stringify({"Pinc" : Item.PrCode}))["Pinc"].N};
                                                        buttons.push(obj1);
                                                        
                                                        obj=  {
                                                          title:title,
                                                          subTitle:sub,
                                                          buttons:buttons,
                                                          imageUrl:image
                                                         };
                                                         attachments.push(obj);
                                                    }
                                                });
                                                
                                                if(attachments.length>0)
                                                    {
                                                        callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: `Item removed and Remaining items in WishList are` }, buildResponseCardatt(attachments)));
                                                    }
                                                    else
                                                    {
                                                        callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Items removed and no more items in your wishList'}));
                                                    }
                                                    
                                            }
                                        });
                   }
               });
    }
    else
    {
        //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Please Login First'}));
        ShowDashBoard(intentRequest,callback,'Please Login First');
    }
}

function ShowFeeds(intentRequest,callback)
{
    var FeedSlotVal = intentRequest.currentIntent.slots.FeedType;
    var AWS= require('aws-sdk');
    //AWS.config.update({region:'us-west-2'});
    var ddb = new AWS.DynamoDB({
    region: 'us-east-1',
    maxRetries: 1
    });
    
     var paramsInsert={
              TableName: "Feedback"
            };
            ddb.scan(paramsInsert, function(err,datas){
                if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    var attachments=[];
                    datas.Items.forEach(function(Item){
                        var feedfrmdb = JSON.parse(JSON.stringify({"Pinc" : Item.Feedback}))["Pinc"].S;
                        var CommentDB = JSON.parse(JSON.stringify({"Pinc" : Item.Comment}))["Pinc"].S;
                        if(FeedSlotVal.toLowerCase()!='all')
                        {
                            if(feedfrmdb.toLowerCase() == FeedSlotVal.toLowerCase())
                            {
                                var title = JSON.parse(JSON.stringify({"Pinc" : Item.Name}))["Pinc"].S;
                                
                                var obj=  {
                                  title:title,
                                  subTitle:feedfrmdb +" : "+ CommentDB
                                 };
                                 attachments.push(obj);
                            }
                        }
                        else
                        {
                            var title = JSON.parse(JSON.stringify({"Pinc" : Item.Name}))["Pinc"].S;
                            
                            var obj=  {
                              title:title,
                              subTitle:feedfrmdb+" : "+ CommentDB
                             };
                             attachments.push(obj);
                        }
                        
                    });
                    
                    if(attachments.length>0)
                        {
                            callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: `Feedbacks are:` }, buildResponseCardatt(attachments)));
                        }
                        else
                        {
                            callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'No Feedbacks Left!!'}));
                        }
                        
                }
    });
}


function FeedForProd(intentRequest,callback)
{
    
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
        var ProdId = intentRequest.currentIntent.slots.ProdId;
        var CommentSlotVal = intentRequest.currentIntent.slots.Commentee;
        var RateSlotVal = intentRequest.currentIntent.slots.Rating;
        
        var AWS= require('aws-sdk');
        var ddb = new AWS.DynamoDB({
        region: 'us-east-1',
        maxRetries: 1
        });
        var paramsInsert={
          TableName: "ProdFeeds"
        };
        
        ddb.scan(paramsInsert, function(err,data){
            if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
              
             
             // countpl=parseInt(countpl)+1;
                var paramsInsert={
                      TableName: "ProdFeeds",
                      Item:{
                          Id:{N:(data.ScannedCount+1).toString()},
                          FeedbackBy:{S:intentRequest.sessionAttributes.MobileNumber},
                          Rating:{S:RateSlotVal},
                          ProdId:{N:ProdId.toString()},
                          Comment:{S:CommentSlotVal},
                          FeedDate:{S:new Date().toLocaleDateString()},
                          FeedbackUser:{S:globbalname}
                      }
                    };
                    
                    ddb.putItem(paramsInsert,function(){
                        callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: `Commented Successfully`}));
                    });
            }
        });
        console.log(paramsInsert);
    }
    else
    {
        //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Please Login First'}));
        ShowDashBoard(intentRequest,callback,'Please Login First');
    }
}

function ShowProdFeed(intentRequest,callback)
{
    if(intentRequest.sessionAttributes.MobileNumber!=null)
    {
        var ProdsId = intentRequest.currentIntent.slots.PrCode;
        var AWS= require('aws-sdk');
        var ddb = new AWS.DynamoDB({
        region: 'us-east-1',
        maxRetries: 1
        });
        var paramsInsert={
          TableName: "ProdFeeds"
        };
        
        ddb.scan(paramsInsert, function(err,data){
            if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                var attachments = [];
                data.Items.forEach(function(itemdata) {
                    
                    if(itemdata.ProdId.N.toString() == ProdsId.toString())
                    {
                        console.log(itemdata);
                        var title = itemdata.FeedbackUser.S+" On "+itemdata.FeedDate.S;
                        var subtitle = itemdata.Rating.S+" :: "+itemdata.Comment.S; 
                        var obj=  {
                              title:title,
                              subTitle:subtitle
                             };
                             attachments.push(obj);
                    }
                });
                if(attachments.length>0)
                {
                    callback(closeWithCard(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: `Feedbacks are:` }, buildResponseCardatt(attachments)));
                }
                else
                {
                    callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'No Feedbacks!!'}));
                }
            }
        });
    }
    else
    {
        //callback(close(intentRequest.sessionAttributes, 'Fulfilled',{ contentType: 'PlainText', content: 'Please Login First'}));
        ShowDashBoard(intentRequest,callback,'Please Login First');
    }
    
}

//////Siva code ends here
 
function dispatch(intentRequest, callback) {
    console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);

    const intentName = intentRequest.currentIntent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'Register') {
       // return NewUser(intentRequest, callback);
       return RegisterUser(intentRequest, callback);
    }
    else if (intentName === 'AddProduct') {
        return AddProduct(intentRequest, callback);
    }
    else if (intentName === 'ApplyOffers') {
        return ApplyOffers(intentRequest, callback);
    }
    else if (intentName === 'OffersToday') {
        return ShowOffersToday(intentRequest, callback);
    }
    else if (intentName === 'DeleteProduct') {
        return DeleteProduct(intentRequest, callback);
    }
    else if (intentName === 'UpdateOrderStatus') {
        return UpdateOrderStatus(intentRequest, callback);
    }
     else if (intentName === 'SignInAdmin') {
        return SignInAdmin(intentRequest, callback);
    }
     else if (intentName === 'ManageProfile') {
        return ManageProfile(intentRequest, callback);
    }
     else if (intentName === 'Start') {
        return ShowDashBoard(intentRequest, callback);
    }
    else if (intentName === 'ExistingUser') {
      //  return ExistingUser(intentRequest, callback);
       return LoginUser(intentRequest, callback);
    }
     else if (intentName === 'Feedback') {
        return Feedback(intentRequest, callback);
    }
     else if (intentName === 'RegisterAdmin') {
        return RegisterAdmin(intentRequest, callback);
    }
     else if (intentName === 'BuyProduct') {
        return BuyProduct(intentRequest, callback);
    }
     else if (intentName === 'ShowOrderHistory') {
       // return ShowOrders(intentRequest, callback);
       return ShowOrderAttachmentsCard(intentRequest,callback);
     //return ShowProductList(intentRequest,callback);
    }
    else if (intentName === 'TrackOrder') {
        return TrackOrder(intentRequest, callback);
    }
    else if (intentName === 'CancelOrder') {
        return CancelOrder(intentRequest, callback);
    }
    else if (intentName === 'ReplaceOrder') {
        return ReplaceOrder(intentRequest, callback);
    }
    else  if (intentName === 'ClothCategory') {
       // return NewUser(intentRequest, callback);
       return ClothCategory(intentRequest, callback);
    }
    else if(intentName==='FindStore')
    {
        return FindStore(intentRequest, callback);
    }
    else if(intentName==='AddStore'){
        return AddStore(intentRequest,callback);
    }
    else if ( intentName==='Subscribe')
    {
        return Subscribe(intentRequest,callback);
    }
    else if(intentName==='ShowFreshArrivals')
    {
        return ShowFreshArrivals(intentRequest,callback);
    }
    else if(intentName==='DownloadFAQ')
    {
        return Download(intentRequest,callback);
    }
    else if(intentName==='ShowProd')
    {
        return ShowProd(intentRequest,callback);
    }
    else if(intentName==='AddtoWish')
    {
        return AddtoWish(intentRequest,callback);
    }
    else if(intentName==='ShowWishList')
    {
        return ShowWishList(intentRequest,callback);
    }
    else if(intentName==='RemoveWished')
    {
        return RemoveWished(intentRequest,callback);
    }
    else if(intentName==='ShowFeeds')
    {
        return ShowFeeds(intentRequest,callback);
    }
    else if(intentName==='FeedForProd')
    {
        return FeedForProd(intentRequest,callback);
    }
    else if(intentName==='ShowProdFeed')
    {
        return ShowProdFeed(intentRequest,callback);
    }
    throw new Error(`Intent with name ${intentName} not supported`);
}



// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        // By default, treat the user request as coming from the America/New_York time zone.
       // process.env.TZ = 'America/New_York';
        console.log(`event.bot.name=${event.bot.name}`);

        /**
         * Uncomment this if statement and populate with your Lex bot name and / or version as
         * a sanity check to prevent invoking this Lambda function from an undesired Lex bot or
         * bot version.
         */
        /*
        if (event.bot.name !== 'FabricStore') {
             callback('Invalid Bot Name');
        }
        */
        event.sessionAttributes.MobileNumber=mobilenumber;
        event.sessionAttributes.IsAdmin=isAdmin;
        dispatch(event, (response) => callback(null, response));
    } catch (err) {
        callback(err);
    }
};
