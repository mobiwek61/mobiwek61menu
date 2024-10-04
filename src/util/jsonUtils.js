// import Ajv from "ajv/dist/jtd" // JSON Type Definition
import Ajv from "ajv"

/**
 * trying out json validation using json schema and also json typeDef.
 * looks like typeDef can't handle JSX as an object whilst scheme can do it.
 */

function validateJSONtest() {
   // validateJSON_typeDef(jsonTypeDefinitionB, jsonObjB)
    validateJSON_schema(jsonSchemaA, jsonObjA)
}

function validateJSON_schema(schema, jsonObj) {
    const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
    const validate = ajv.compile(schema)
    const isValid = validate(jsonObj)
    if (isValid)
        console.log('validate ok')
    else {
      console.log(console.log(...validate.errors))
        console.log(validate.errors[0].schemaPath + ' ' + validate.errors[0].message)
    }
}

const jsonObjA = 
  [
    { foo: 1, bar: "abc"},
    { foo: 2, bar: <>ccc</>, lkj:'ccc' }
  ]

const jsonSchemaA = {
  //"$schema": "http://json-schema.org/draft-04/schema#",
  "type": "array",
  "items": [
    {
      "type": "object",
      "properties": {"foo": {"type": "integer"}, "bar": {"type": "string"}
      },
      "required": ["foo"], "additionalProperties": false
    },
    {
      "type": "object",
      "properties": {"foo": {"type": "integer"}, "bar": { "type": "object"}},
      "required": ["foo"], "additionalProperties": false
    }
  ]
}





 
/*
--------------------------------
test ok with 
https://www.liquid-technologies.com/online-json-schema-validator


[
  { foo: 1,  bar: "abc"},
   { foo: 2 }
]
................

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "array",
  "items": [
    {
      "type": "object",
      "properties": {
        "foo": {
          "type": "integer"
        },
        "bar": {
          "type": "string"
        }
      },
    },
  ],
  "minItems": 2
}
-----------------------


// const jsonTypeDefinitionA = {
//   properties: {
//     foo: {type: "int32"}
//   },
//   optionalProperties: {
//     bar: {type: "string"}
//   }
// }
/**
 * uses npm package "Ajv JSON schema validator"
 *function validateJSON_typeDef(jsonTypeDef, jsonObj) {
  const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
  //save .. const serialize = ajv.compileSerializer(jsonTypeDef); console.log(serialize(jsonObj))
  const myParser = ajv.compileParser(jsonTypeDef)
  const parsed = myParser(JSON.stringify(jsonObj)) // parse it as a STRING!
  if (parsed === undefined) { 
    console.log('parser failed: ' + myParser.message + 
           ' at position ' + myParser.position) // error position in string
    return; 
  }
  console.log('parsed: ' + JSON.stringify(parsed))
}


[{
  "foo": 1,
  "bar": "abc"
},
{
  "foo": 2
}]

{ "type": ["number", "string"] } OR

 [
  { foo: 1,  bar: "abc"},
   { foo: 2,  bar: '<>lakjf</>'}
]

{ vehicles:[
     {2wheel:1, wheels: 2, types:[
         {name:'motorcycle'}, {name: 'bike'}
     ]},
     {4wheel:1, wheels: 4, types:[
         {name:'car'}, {name: 'skateboard'}
     ]},
     {18wheel:1, wheels: 18, types:[
          {name:'semitruck', types:[
       			{name:'reefer'}, {name:'box'}, {name:'roro'}
          ]},
          {name: 'toy'}
     ]}
   ]}
*/
/*
{ vehicles:[
  {2wheel:1, wheels: 2, types:[
      {name:'motorcycle'}, {name: 'bike'}
  ]},
  {4wheel:1, wheels: 4, types:[
      {name:'car'}, {name: 'skateboard'}
  ]},
  {18wheel:1, wheels: 18, types:[
       {name:'semitruck', types:[
          {name:'reefer'}, {name:'box'}, {name:'roro', types:[
       {name:'DFSADF', types:[
          {name:'SDFWE'}, {namZe:'WWEFWEF'}, {name:'GRWRG'}
       ]}
       ]},
       {name: 'toy'}
  ]}
]}
*/

export { validateJSONtest
 }