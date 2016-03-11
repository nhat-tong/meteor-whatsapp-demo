/**
 * Created by htong on 01/03/2016.
 */

whatsapp = {};
whatsapp.collections = (function () {
 return {
  chats : new Mongo.Collection('chats'),
  messages: new Mongo.Collection('messages')
 };
 })();
